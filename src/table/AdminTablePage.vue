<template> 
  <el-config-provider :locale="configLocale">
  <slot name="search">
    <atp-search
      v-if="filterFields.length || hiddenFilterFields.length"
      :showFields="filterFields"
      :hiddenFields="hiddenFilterFields"
    />
  </slot>
  <el-card> 
    <slot name="tools">
      <atp-tool
        :buttons="toolButtons"
        :refresh="refresh"
        @auto-refresh="handleAutoRefresh"
        @manual-refresh="getTableData"
        @pause-auto-refresh="handlePauseAutoRefresh"
      />
    </slot>
    <slot name="tips">
      <el-alert 
        v-if="tips" 
        :title="tips" 
        type="success" 
        :closable="false"
        style="margin-bottom: 8px"
      />
    </slot>
    <el-table
      ref="tableRef"
      v-loading="loading"
      :highlight-current-row="selectable === 'single'"
      :row-key="rowKey"
      table-layout="auto"
      @current-change="handleSelectionChange"
      @selection-change="handleSelectionChange"
      :header-cell-style="{
        backgroundColor: '#fafafa'
      }"
      border
      :data=tableData
      v-bind="$attrs"
    > 
      <el-table-column type="index" width="50" v-if="showIndex"/>
      <el-table-column type="selection" width="50" reserve-selection v-if="selectable === 'multiple'"/>
      <template 
        v-for="{ hidden, ...elCol} in tableColumns"
        :key="elCol.prop"
      >
        <el-table-column
          v-if="!hidden"
          align="center"
          v-bind="elCol"
        > 
          <template #header> 
            <slot :name="`${elCol.prop}_header`">{{ elCol.label }}</slot>
          </template>
          <template #default="{ row, column }"> 
            <slot :name="elCol.prop" :row="row" >{{ row[column.property ] }}</slot>
          </template>
        </el-table-column>
      </template>
      <slot name="extra_columns"/>
      <el-table-column 
        v-if="$slots.actions || actionColumn.length"
        prop="actions"
        align="center"
        v-bind="actionColumnProps"
      > 
        <template #header>
          <slot name="actions_header">{{actionColumnLabel ?? translate("label.actionColumn") }}</slot>
        </template>
        <template #default="{ row }">
          <slot name="actions" :row="row">
            <template 
              v-for="({text, show=true, onClick}, index) in actionColumn"
              :key="text"
            > 
              <template v-if="show">
                <el-divider direction="vertical" v-if="index" class="hidden-xs-only"/>
                <el-button 
                  type="primary" 
                  link 
                  size="small"
                  @click="() => onClick(row)"
                >{{text}}</el-button>
              </template>
            </template>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-pagination">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="getTableData"
        @current-change="getTableData"
        :total="total"
        v-bind="elPaginationProps"
      />
    </div>
  </el-card>
  </el-config-provider>
</template>

<script> 
//import { ElTable, ElPagination, ElCard, ElTableColumn, ElButton, ElDivider } from "element-plus";
import AtpTool from "../table-tool/ATPTool.vue";
import AtpSearch from "../table-search/ATPSearch.vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import tableProps from "./props";
import { EL_TABLE_METHOD } from "./elTableMethod";
import useMediaQuery from "../utils/useMediaQuery";
import { filter, isNull, isString, omitBy, slice, isArray } from "lodash/fp";
import { useLocale } from "../locals/useLocale";
import { debounce } from "lodash";
import { createI18n } from "vue-i18n";



export default {
  props: tableProps,
  emits: ["selectChange"],
  components: {
    AtpTool,
    AtpSearch
  },
  data() {
    return {
      tableRef: null,
      tableData: [],
      filteredData: this.localData,
      timer: null,
      loading: false,
      selectedRows: [],
      page: 1,
      limit: 10,
      total: this.localData.length ?? 0,
      query: {},
      queryChange: false,
      filterFields: [],
      hiddenFilterFields: [],
      tableColumns: [],
    }
  },
  setup() {
    const { breakpoint } = useMediaQuery();
    const { translate, setLocale } = useLocale();
    return { breakpoint, translate, setLocale };
  },
  computed: {
    configLocale() {
      return this.locale === "zhCn" ? zhCn : en;
    },
    offset() {
      return (this.page - 1) * this.limit;
    },
  },
  created() {
    this.columns.forEach(({ prop, label,  filterable, filterOptions={}}) => {
      if(!(filterable || JSON.stringify(filterOptions) !== "{}")) 
        return;
      const { defaultHidden=false, defaultValue=null } = filterOptions;
      this.query[prop] = filterOptions?.defaultValue ?? null;
      const field = {
        name: prop,
        label,
        ...filterOptions
      }

      defaultHidden ? this.hiddenFilterFields.push(field) : this.filterFields.push(field);
    })
    this.tableColumns = this.columns.map(c => {
      if(typeof c === "string") {
        return {
          prop: c,
          label: c[0].toUpperCase() + c.slice(1),
          hidden: false
        }
      }
      return c;
    })
  },
  provide() {
    return {
      breakpoint: computed(() => this.breakpoint),
      query: this.query,
      translate: this.translate
    }
  },
  expose: ["reload", "getSelections"],
  methods: {
    async fetchRemoteData(params) {
      const finalQuery = {
        ...this.query,
        ...this.extraQuery,
        ...params,
        page: this.page,
        offset: this.offset,
        limit: this.limit
      }
      console.log(this.fetchMethod)
      const res = await this.fetchMethod(finalQuery);
      console.log('res', res)
      this.total = res[this.totalKey] ?? 0;
      this.tableData = res[this.listKey] ?? [];
    },

    filterLocalData(params) {
      if(this.queryChange || params ) {
        const filterParams = omitBy((value) => {
          return isNull(value) || value === "" || !value.length 
        })({
          ...this.query,
          ...this.extraQuery,
          ...params
        });
        this.filteredData = filter((o) => {
          let filter = true;
          for(let [key, value] of Object.entries(filterParams)) {
            if(isString(value)) {
              const testStr = new RegExp(value+'');
              filter = testStr.test(o[key]);
            } else if(isArray(value)){
              filter = value.includes(o[key]);
            } else {
              filter = value === o[key];
            }
            if(!filter) break;
          }
          return filter
        })(this.localData);
      }
      this.tableData = slice(
        this.offset,
        this.offset + this.limit
      )(this.filteredData);
    },

    getTableData(params) {
      this.loading = true;
      if(this.localData && !this.fetchMethod) {
        this.filterLocalData(params);
      } else {
        this.fetchRemoteData(params);
      }
      this.loading = false;
    },
    handleQueryChange() {
      const func = debounce(this.getTableData, 500);
      func();
    },
    handleAutoRefresh() {
      this.timer = setInterval(this.getTableData, this.refresh);
    },
    handlePauseAutoRefresh() {
      clearInterval(this.timer);
    },
    handleSelectionChange(selectRows) {
      if(this.selectable !== "multiple" || Array.isArray(selectRows)){
        this.selectedRows = selectRows ?? [];
        this.$emit("selectChange", this.selectedRows);
      }
    },
    handleClearSelection() {
      this.tableRef.clearSelection();
    },
    getSelections() { return this.selectedRows },
    reload(params) {
      this.getTableData(params);
    }
  },
  mounted() {
    this.getTableData();
    if(typeof(this.refresh) === 'number') {
      this.handleAutoRefresh();
    }
    const tableRefObj = this.$refs['tableRef'];
    for(let k of Object.keys(tableRefObj)) {
      if(typeof tableRefObj[k] === "function") {
        this[k] = tableRefObj[k];
      }
    }

  }, 
  unmounted() {
    this.handlePauseAutoRefresh();
  },
  watch: {
    query: {
      async handler() {
        this.queryChange = true;
        this.handleQueryChange();
      },
      deep: true
    },
    locale(lang) {
      this.setLocale(lang);
    }
  }
}

</script>

<style lang="scss">
@use "../../style/atp-table.scss";
</style>

<template> 
  <el-config-provider :locale="configLocale">
  <slot name="search">
    <atp-search
      v-if="searchFields.length || hiddenSearchFields.length"
      :showFields="searchFields"
      :hiddenFields="hiddenSearchFields"
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
      v-bind="elTableProps"
    > 
      <el-table-column type="index" width="50" v-if="showIndex"/>
      <el-table-column type="selection" width="50" reserve-selection v-if="selectable === 'multiple'"/>
      <template 
        v-for="{ hidden, ...elCol} in columns"
        :key="elCol.prop"
      >
        <el-table-column
          v-if="!hidden"
          align="center"
          v-bind="elCol"
        > 
          <template #default="{ row, column }"> 
            <slot :name="elCol.prop" :row="row" >{{ row[column.property ] }}</slot>
          </template>
        </el-table-column>
      </template>
      <el-table-column 
        v-if="$slots.actions || actionColumn.length"
        prop="actions"
        align="center"
        :label="actionColumnLabel ?? t('label.actionColumn')"
      > 
        <template #default="{ row }">
          <slot name="actions" :row="row">
            <template 
              v-for="(action, index) in actionColumn"
              :key="action.text"
            > 
              <el-divider direction="vertical" v-if="index" class="hidden-xs-only"/>
              <el-button 
                type="primary" 
                link 
                size="small"
                @click="() => action.onClick(row)"
              >{{action.text}}</el-button>
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

<script setup> 
//import { ElTable, ElPagination, ElCard, ElTableColumn, ElButton, ElDivider } from "element-plus";
import AtpTool from "../table-tool/ATPTool.vue";
import AtpSearch from "../table-search/ATPSearch.vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import tableProps from "./props";
import useMediaQuery from "../utils/useMediaQuery";
import { filter, isNull, isString, omitBy, slice, isArray } from "lodash/fp";
import { useLocale } from "../locals/useLocale";
import { debounce } from "lodash";

const props = defineProps(tableProps);
const emits = defineEmits(["selectChange"]);

const configLocale = computed(() => {
  return props.locale === "zhCn" ? zhCn : en;
}) 

const tableRef = ref();
const tableData = ref([]);
const filteredData = ref(props.data);
const { breakpoint } = useMediaQuery();

const { t } = useLocale(computed(()=>props.locale))
let timer = null;
const loading = ref(false);
const selectedRows = ref([]);



const page = ref(1);
const limit = ref(10);
const total = ref(props?.data.length ?? 0);
const offset = computed(() => {
  return (page.value - 1) * limit.value;
})

const query = ref({});
const queryChange = ref(false);

[...props.searchFields,  ...props.hiddenSearchFields].forEach(({ name, defaultValue })=> {
    query.value[name] = defaultValue ?? null
})


provide("breakpoint", breakpoint);
provide("query",  query);
provide("translate", t);

const fetchRemoteData = async (params) => {
  const finalQuery = {
    ...query.value,
    ...props.extraQuery,
    ...params,
    page: page.value,
    offset: offset.value,
    limit: limit.value
  }
  const res = await props.fetchMethod(finalQuery);
  total.value = res[props.totalKey] ?? 0;
  tableData.value = res[props.listKey] ?? [];
}

const filterLocalData = (params) => {
  if(queryChange.value || params ) {
    console.log('query', query.value)
    const filterParams = omitBy((value) => {
      return isNull(value) || value === "" || !value.length 
    })({
      ...query.value,
      ...props.extraQuery,
      ...params
    });
    filteredData.value = filter((o) => {
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
    })(props.data);
  }
  tableData.value = slice(
    offset.value,
    offset.value + limit.value
  )(filteredData.value);
}


const getTableData = (params) => {
  loading.value = true;
  if(props.data && !props.fetchMethod) {
    filterLocalData(params);
  } else {
    fetchRemoteData(params);
  }
  loading.value = false;
}



watch(query, async () => {
  queryChange.value = true;
  handleQueryChange();
}, {
  deep: true
})

const handleQueryChange = debounce(getTableData, 500);


const handleAutoRefresh = () => {
  timer = setInterval(getTableData, props.refresh);
}

const handlePauseAutoRefresh = () => {
  clearInterval(timer);
}

const handleSelectionChange = (selectRows) => {
  selectedRows.value = selectRows ?? [];
  emits("selectChange", selectedRows.value)
}

const handleClearSelection = () => {
  tableRef.value.clearSelection()
}

onMounted(() => {
  getTableData();
  if(typeof(props.refresh) === 'number') {
    handleAutoRefresh();
  }
})

onUnmounted(() => {
  handlePauseAutoRefresh();
})

defineExpose({
  reload: getTableData,
  getSelections: () => { return selectedRows.value },
  clearSelection: handleClearSelection
})

</script>

<style lang="scss">
@use "../../style/atp-table.scss";
</style>

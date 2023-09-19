<template> 
  <el-card style="margin-bottom: 8px;"> 
    <el-form 
      ref="formRef"
      label-suffix=":"
      :model="query"
      :label-position="breakpoint === 'xs' ? 'top': 'right'"
    >
      <el-row :gutter="24">
        <atp-search-render
          :search-fields="showFields"
          :col-breakpoint="colBp"
        />
        <template v-if="showHidden && hiddenFields.length"> 
          <atp-search-render
            :search-fields="hiddenFields"
            :col-breakpoint="colBp"
          />
        </template>
        <el-col :span="buttonColSpan" style="overflow: hidden">
          <div style="float: right">
          <el-button  @click="handleResetSearch(formRef)">
            {{ t("button.reset") }}
          </el-button>
          <template v-if="hiddenFields.length">
            <el-button link type="primary" v-if="showHidden" @click="showHidden=false">
              {{ t("button.collapse")}} 
            <el-icon><arrow-up/></el-icon>
            </el-button>
            <el-button link type="primary" v-else @click="showHidden=true">
              {{ t("button.expand") }}
              <el-icon><arrow-down/></el-icon>
            </el-button>
          </template>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script setup> 

import AtpSearchRender from "./ATPSearchRender.vue";
import { ArrowUp, ArrowDown } from "@element-plus/icons-vue";

import { computed, inject, ref } from "vue";

const props = defineProps({
  showFields: {
    type: Array,
    default: []
  },
  hiddenFields: {
    type: Array,
    default: []
  }
});

const colBp = {
  "xs": 24,
  "sm": 12,
  "md": 8,
  "lg": 6,
  "xl": 6
}

const t = inject("translate");

const formRef = ref();

const breakpoint = inject("breakpoint");
const query = inject("query");
const showHidden = ref(false);

const buttonColSpan = computed(() => {
  const colWidth = colBp[breakpoint.value];
  const perRow = parseInt(24 / colWidth);
  let fieldCnt = props.showFields.length;
  if(showHidden.value) {
    fieldCnt += props.hiddenFields.length;
  }
  return 24 - (fieldCnt % perRow) * colWidth;
})

const handleResetSearch = (formRef) => {
  if(!formRef) return;
  formRef.resetFields();
}

</script>

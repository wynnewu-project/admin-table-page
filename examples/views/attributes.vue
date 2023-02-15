<template>
  <examples-content
    title="El-table组件属性、事件透传及方法调用"
    :links="['El-table组件属性', 'El-table组件事件监听', 'El-table组件方法调用']"
  >
    <p>可以透传原el-table的其他属性、事件, 也可以调用原el-method方法</p>
    <h1 class="item-title" id="El-table组件属性">El-table组件属性</h1>
    <p>如可以设置table的斑马纹以及高度</p>
    <admin-table-page
      stripe
      :height="250"
      :columns="columns"
      :data="data"
    />
    <h1 class="item-title" id="El-table组件事件监听">El-table组件事件监听</h1>
    <p class="m-b-16"> 鼠标进入单元格： {{ msg }} </p>
    <admin-table-page
      :columns="columns"
      :data="data"
      @cell-mouse-enter="handleMouseEnter"
    />
    <h1 class="item-title" id="El-table组件方法调用">El-table组件方法调用</h1>
    <p>
      <el-button @click="handleClearSelection">取消多选</el-button>
      <el-button @click="handleSort">按年龄降序排序</el-button>
      <el-button @click="setRowOneSelected">选中第二行</el-button>
    </p>
    <admin-table-page
      ref="atpTableRef"
      highlight-current-row
      :columns="columns"
      :data="data"
      selectable="multiple"
      row-key="username"
    />
  </examples-content>
</template>
<script setup>
import { ref } from "vue";
import { columns, data } from './variables';
import ExamplesContent from "../components/ExamplesContent.vue";

const atpTableRef = ref();
const msg = ref("");


const handleMouseEnter = (row, column ) => {
  msg.value = `${column.property}: ${row[column.property]}`
}

const handleClearSelection = () => {
  atpTableRef.value.clearSelection();
}
const handleSort = () => {
  atpTableRef.value.sort('age','descending');
}

const setRowOneSelected = () => {
  console.log('data2', data[1])
  atpTableRef.value.setCurrentRow(data[1])
}
</script>
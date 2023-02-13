<template>
  <h1 class="m-b-16">El-table组件属性、事件透传及方法调用</h1>
  <p>可以透传原el-table的其他属性、事件, 也可以调用原el-method方法</p>
  <h1 class="m-b-16">示例</h1>
  <p class="m-b-16">
    鼠标进入单元格： {{ msg }}
  </p>
  <p>
    <el-button @click="handleClearSelection">取消筛选</el-button>
    <el-button @click="handleSort">按年龄降序排序</el-button>
    <el-button @click="setRowOneSelected">选中第二行</el-button>
  </p>
  <admin-table-page
    ref="atpTableRef"
    stripe
    highlight-current-row
    :height="400"
    :columns="columns"
    :data="data"
    selectable="multiple"
    row-key="username"
    @cell-mouse-enter="handleMouseEnter"
  />
</template>
<script setup>
import { ref } from "vue";
import { columns, data } from './variables';

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
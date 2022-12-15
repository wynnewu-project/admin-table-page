<template>
  <h1 class="m-b-16">slot自定义</h1>
  <ul>
    <li>支持搜索框、工具栏、操作列以及每一列的slot自定义</li>
    <li>如果自定义搜索框区域，可通过组件的reload方法，将搜索参数传入并触发数据筛选</li>
  </ul>
  <h1 class="m-b-16">示例</h1>
  <admin-table-page 
    ref="tableRef"
    :columns="columns" 
    :data="data" 
  >
    <template #search>
      <div class="m-b-16">
        <el-input v-model="username" placeholder="搜索姓名" style="width: 250px;margin-right: 16px"/>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </div>
    </template>
    <template #tools>
      <el-input 
        style="width: 250px;margin-bottom: 16px"
        placeholder="搜索"
      ></el-input>
    </template>
    <template #username="{ row }">
      <el-tag>{{row.username}}</el-tag>
    </template>
    <template #actions="{ row }">
      <el-button type="primary" @click="handleEditRow(row.username)">编辑</el-button>
    </template>
  </admin-table-page>
</template>

<script setup>
import { columns, data } from "./variables";  
import { ref } from "vue";

const username=ref();
const tableRef = ref();

const handleSearch = () => {
  tableRef.value.reload({ username: username.value });
}

const handleEditRow = (name) => {
  alert(name);
}
</script>
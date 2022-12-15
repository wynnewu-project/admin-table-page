<template>
  <h1 class="m-b-16">单选表格数据</h1>
  <ul> 
    <li>selectable="single"</li>
    <li>必须设置row-key</li>
  </ul>
  <p class="m-b-16">
    已选用户： {{ selectRow }}
  </p>
  <admin-table-page
    :columns="columns"
    :data="data"
    selectable="single"
    row-key="username"
    @select-change="handleSelectChange"
  />
</template>
<script setup>
import { ref } from "vue";
import { columns, data } from './variables';

const selectRow = ref();

const handleSelectChange = (row) => {
  selectRow.value = row.username;
}
</script>
<template>
  <examples-content
    title="单选表格数据"
  >
    <ul> 
      <li>selectable="single"</li>
      <li>必须设置row-key</li>
    </ul>
    <h1 class="item-title">示例: 点击表格的某一行进行选择</h1>
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
  </examples-content>
</template>
<script setup>
import { ref } from "vue";
import { columns, data } from './variables';
import ExamplesContent from "../components/ExamplesContent.vue";

const selectRow = ref();

const handleSelectChange = (row) => {
  selectRow.value = row.username;
}
</script>
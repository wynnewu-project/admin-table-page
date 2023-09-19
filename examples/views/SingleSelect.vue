<template>
  <examples-content
    title="单选表格数据"
  >
    <ul> 
      <li class="info-list">设置属性 <strong class="red">selectable</strong> 为"single"，可通过单击来选择表格的其中一行</li>
      <li class="info-list">此时，必须同时设置组件属性 <strong class="red">row-key</strong> </li>
    </ul>
    <h1 class="item-title">示例: 点击表格的某一行进行选择</h1>
    <p class="m-b-16">
      已选用户： {{ selectRow }}
    </p>
    <admin-table-page
      :columns="columns"
      :local-data="data"
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
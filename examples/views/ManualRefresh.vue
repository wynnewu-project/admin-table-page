<template>
  <h1 class="m-b-16">手动刷新表格数据</h1>
  <ul>
    <li>点击表格右上角的刷新按钮来手动刷新</li>
  </ul>
  <h1 class="m-b-16">示例</h1>
  <admin-table-page
    :columns="columns"
    :fetch-method="fetchMethod"
    refresh="manual"
  />

</template>

<script setup>
import { columns, fetchMethod } from './variables';

</script>

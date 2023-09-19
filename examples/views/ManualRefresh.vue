<template>
  <examples-content
    title="手动刷新表格数据"
  >
    <p>当表格数据源为服务端API获取时，点击表格右上角的刷新按钮会从服务端重新获取表格数据并刷新表格</p>
    <admin-table-page
      :columns="columns"
      :fetch-method="fetchMethod"
      refresh="manual"
    />
  </examples-content>

</template>

<script setup>
import { columns, fetchMethod } from './variables';
import ExamplesContent from '../components/ExamplesContent.vue';

</script>

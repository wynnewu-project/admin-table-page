<template>
  <examples-content
    title="自动刷新表格"
  >
  <ul>
    <li>:refresh="Number" 设置自动刷新频率, Number 单位为毫秒</li>
    <li>可通过表格右上角按钮暂停、恢复自动刷新</li>
  </ul>
  <h1 class="item-title">示例: 2s刷新一次 </h1>
  <admin-table-page
    :columns="columns"
    :fetch-method="fetchMethod"
    :refresh="2000"
  />
  </examples-content>
</template>
<script setup>
import { columns, fetchMethod } from './variables';
import ExamplesContent from '../components/ExamplesContent.vue';

</script>
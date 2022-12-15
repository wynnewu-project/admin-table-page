<template>
  <h1 class="m-b-16">工具栏按钮</h1>
  <ul>
    <li>可通过slot自定义</li>
    <li>可配置其他el-button属性</li>
  </ul>
  <h1>示例</h1>
  <admin-table-page
    :columns="columns"
    :toolButtons="toolButtons"
  />
</template>
<script setup>
import { columns, toolButtons } from "./variables";


</script>
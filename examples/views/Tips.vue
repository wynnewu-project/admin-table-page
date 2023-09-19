<template>
  <examples-content
    title="Tips"
  >
    <p><strong class="red">tips</strong> 属性类型为string，定义显示在表格上方的提示信息</p>
    <p>默认以&lt;el-alert type='success'/&gt;来渲染，如果需要其他样式，可通过name为tips的slot来自定义</p>
    <admin-table-page
      :columns="columns"
      :local-data="data"
      tips="There is a little tips!"
    />
  </examples-content>
</template>
<script setup>
import { columns, toolButtons, data } from "./variables";
import ExamplesContent from "../components/ExamplesContent.vue";


</script>
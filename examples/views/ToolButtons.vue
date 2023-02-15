<template>
  <examples-content
    title="工具栏按钮"
    :links="['基础用法', 'El-button属性']"
  >
    <h1 class="item-title" id="基础用法">基础用法</h1>
    <p>tool-buttons属性期待一个数组来定义工具栏按钮</p>
    <p>数组每个元素是一个描述按钮的Object, 其中text和onClick为必须属性</p>
    <p>可通过name为tools的sloti自定义工具栏，参考<el-link type="primary" href="/slot#工具栏">自定义工具栏</el-link></p>
    <admin-table-page
      :columns="columns"
      :toolButtons="toolButtons"
    />
    <h1 class="item-title" id="El-button属性">El-button属性</h1>
    <p>可在描述按钮的Object中定义其他原el-button的属性，如icon、type等</p>
    <admin-table-page
      :columns="columns"
      :tool-buttons="toolButtonsEl"
    />
  </examples-content>
</template>
<script setup>
import { columns, toolButtons, toolButtonsEl } from "./variables";
import ExamplesContent from "../components/ExamplesContent.vue";


</script>
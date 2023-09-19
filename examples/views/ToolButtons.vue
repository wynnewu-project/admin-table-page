<template>
  <examples-content
    title="工具栏按钮"
    :links="['基础用法', 'El-button属性']"
  >
    <h1 class="item-title" id="基础用法">基础用法</h1>
    <p><strong class="red">tool-buttons</strong> 属性通过一个数组来定义工具栏按钮</p>
    <p>数组中的每个元素是一个描述按钮的object, 其中 <strong class="red">text</strong> 和 <strong class="red">onClick</strong> 为必须属性</p>
    <p>可通过name为 <strong class="red">tools</strong> 的slot自定义工具栏，参考<el-link type="primary" href="/slot#工具栏">自定义工具栏</el-link></p>
    <admin-table-page
      :columns="columns"
      :toolButtons="toolButtons"
    />
    <h1 class="item-title" id="El-button属性">El-button属性</h1>
    <p>可在描述按钮的object中定义其他原el-button的属性，如icon、type等</p>
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
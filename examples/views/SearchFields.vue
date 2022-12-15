<template>
  <h1 class="m-b-16">搜索框</h1>
  <ul>
    <li>目前仅支持input、select和date（精确日期, 如2022-02-02）</li>
    <li>搜索框内容变化时会自动筛选表格数据</li>
    <li>searchFields属性设置默认展示出来的搜索框</li>
    <li>hiddenSearchFields属性设置默认隐藏起来的搜索框</li>
    <li>重置按钮可重置所有搜索框当前值</li>
    <li>展开/收起按钮控制隐藏搜索字段的显示</li>
    <li>远程获取数据时，每个字段以配置的name字段为key传给后端。如 username=user1&age=18 </li>
    <li>本地数据input搜索框支持模糊搜索</li>
  </ul>
  <h1 class="m-b-16">示例</h1>
  <admin-table-page
    :data="data"
    :columns="columns"
    :searchFields="searchFields"
    :hiddenSearchFields="hiddenSearchFields"
  />
</template>

<script setup>
import { columns, searchFields, hiddenSearchFields, data } from './variables';
</script>
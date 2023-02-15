<template>
  <examples-content
    title="搜索框"
    :links="['基础用法', '远程调用参数', '隐藏搜索框']"
  >
    <h1 class="item-title" id="基础用法">基础用法</h1>
    <ul>
      <li class="info-list">目前仅支持input、select和date（精确日期, 如2022-02-02）</li>
      <li class="info-list">搜索框内容变化时会自动筛选表格数据</li>
      <li class="info-list">search-fields属性设置默认展示出来的搜索框</li>
      <li class="info-list">表格数据为data配置时，input搜索框也支持模糊搜索</li>
      <li>重置按钮可重置所有搜索框当前值</li>
    </ul>
    <admin-table-page
      :data="data"
      :columns="columns"
      :search-fields="searchFields"
    />
    <h1 class="item-title" id="远程调用参数">远程调用参数</h1>
    <ul>
      <li class="info-list">搜索框内容变化时会自动调用远程获取数据的函数来获取过滤后的数据</li>
      <li class="info-list">远程获取数据时，每个字段以配置的name字段为key传给后端。如 username=user1&age=18 </li>
    </ul>
    <p>调用参数： {{params}}</p>
    <admin-table-page
      :columns="columns"
      :search-fields="searchFields"
      :fetch-method="remoteMethod"
    />
    <h1 class="item-title" id="隐藏搜索框">隐藏搜索框</h1>
    <p>对于一些不常用的过滤搜索条件或者过滤搜索条件过多时，可以隐藏一部分搜索条件来保证页面的整洁</p>
    <ul>
      <li class="info-list">hiddenSearchFields属性设置默认隐藏起来的搜索框</li>
      <li class="info-list">展开/收起按钮控制隐藏搜索字段的显示</li>
    </ul>
    <admin-table-page
      :data="data"
      :columns="columns"
      :search-fields="searchFields"
      :hidden-search-fields="hiddenSearchFields"
    />
  </examples-content>
</template>

<script setup>
import { columns, searchFields, fetchMethod, hiddenSearchFields, data } from './variables';
import ExamplesContent from '../components/ExamplesContent.vue';
import { ref } from "vue";

const params = ref();
const remoteMethod = (query) => {
  params.value = query;
  return fetchMethod(query);
}
</script>
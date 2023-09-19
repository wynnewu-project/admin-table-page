<template>
  <examples-content
    title="搜索框"
    :links="['基础用法', '远程调用参数', '隐藏搜索框']"
  >
    <p>定义属性columns时，通过设置列的 <strong class="red">filterable</strong> 或者 <strong class="red">filterOptions</strong> 属性，组件会为这些字段添加该列对应的搜索框</p>
    <p>同时，也支持slot自定义搜索框区域</p>
    <ul> 
      <li class="info-list"> <strong >filterable</strong>: boolean，为字段添加input搜索框 </li>
      <li class="info-list"> <strong>filterOptions</strong>: object，为字段添加其他类型的搜索框、配置是否默认显示等信息 </li>
    </ul>
    <h1 class="item-title" id="基础用法">基础用法</h1>
    <ul>
      <li class="info-list">目前仅支持input、select和date（精确日期, 如2022-02-02）</li>
      <li class="info-list">搜索框内容变化时会自动筛选表格数据</li>
      <li class="info-list">表格数据来源是 local-data 属性定义的本地数据时，input搜索框也支持模糊搜索</li>
      <li class="info-list">重置按钮可重置所有搜索框当前输入值</li>
    </ul>
    <admin-table-page
      :local-data="data"
      :columns="filterColumns"
    />
    <h1 class="item-title" id="远程调用参数">远程调用参数</h1>
    <ul>
      <li class="info-list">表格数据来源为后端API获取时，搜索框内容变化会自动调用服务端API获取数据的函数来重新获取过滤后的数据</li>
      <li class="info-list">每个字段以columso属性中定义的 <strong class="red">prop</strong> 属性为key传给后端。如 username=user1&age=18 </li>
    </ul>
    <p>调用参数： {{params}}</p>
    <admin-table-page
      :columns="filterColumns"
      :fetch-method="remoteMethod"
    />
    <h1 class="item-title" id="隐藏搜索框">隐藏搜索框</h1>
    <p>对于一些不常用的过滤搜索条件或者过滤搜索条件过多时，可以隐藏一部分搜索条件来保证页面的整洁</p>
    <ul>
      <li class="info-list">可通过filterOptions里的 <strong class="red">defaultHidden</strong> 属性来设置搜索框是否默认隐藏</li>
      <li class="info-list"><el-button link type="primary" >展开</el-button>和<el-button link type="primary">收起 </el-button> 按钮控制隐藏搜索字段的显示</li>
    </ul>
    <admin-table-page
      :local-data="data"
      :columns="[...filterColumns, { prop: 'lastLogin', label: 'Last login', filterOptions: { defaultHidden: true, type: 'date' }}]"
    />
  </examples-content>
</template>

<script setup>
import { filterColumns, searchFields, fetchFilterMethod, hiddenSearchFields, data } from './variables';
import ExamplesContent from '../components/ExamplesContent.vue';
import { ref } from "vue";

const params = ref();
const remoteMethod = (query) => {
  params.value = query;
  return fetchFilterMethod(query);
}
</script>
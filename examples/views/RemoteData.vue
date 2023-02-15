<template>
  <examples-content
    title="远程数据"
    :links="['基础用法', '参数', '服务端返回数据key映射']"
  >
  <p>只需要配置远程获取数据的函数，组件会自动渲染数据并进行分页请求</p>
  <h1 class="item-title" id="基础用法">基础用法</h1>
  <p>fetch-method设置获取服务端数据的函数，该函数返回Promise</p>
  <p>服务端返回数据格式默认为{ total, list }, 其中total 返回表格数据总记录数， list返回当前页数据列表</p>
  <admin-table-page
    :columns="columns"
    :fetch-method="fetchMethod"
  />
  <h1 class="item-title" id="参数">参数</h1>
  <p>传给服务端的参数默认为pmit=10&page=1&offset=0</p>
  <p>通过extra-query属性可传递除分页、过滤以外的其他参数，但组件不监听该属性的变化</p>
  <p>参数： {{params}}</p>
  <admin-table-page
    :columns="columns"
    :fetch-method="fetchMethodExtra"
    :extra-query="{id: 2}"
  />
  <h1 class="item-title" id="服务端返回数据key映射">服务端返回数据key映射</h1>
  <p>如果服务端以其他key返回数据，需要设置listKey,totalKey两个属性做映射。例如，服务端返回{ count, items }，则需要设置：</p>
  <el-alert style="margin-bottom: 8px" :closable="false" type="warning">
      <p>total-key="count"</p>
      <p>list-key="items"</p>
  </el-alert>
  <admin-table-page
    :columns="columns"
    :fetch-method="fetchMethodOtherKey"
    total-key="count"
    list-key="items"
  />
  </examples-content>
</template>

<script setup>
import { columns, fetchMethod, fetchMethodOtherKey } from './variables';
import ExamplesContent from '../components/ExamplesContent.vue';
import { ref } from "vue";

const params = ref();

const fetchMethodExtra = (query) => {
  params.value = query;
  return fetchMethod(query);
}
</script>
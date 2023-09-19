<template>
  <examples-content
    title="远程数据"
    :links="['基础用法', '参数', '服务端返回数据key映射']"
  >
  <p>只需要配置远程获取数据的函数，组件会自动渲染数据并进行分页请求</p>
  <h1 class="item-title" id="基础用法">基础用法</h1>
  <p><strong class="red">fetch-method</strong> 属性设置获取服务端数据的接口函数，该函数返回Promise</p>
  <p>服务端返回数据格式默认为{ total: number, list: array }, 其中total为Number类型，返回表格数据总记录数; list为Array类型，返回当前页的数据列表</p>
  <admin-table-page
    :columns="columns"
    :fetch-method="fetchMethod"
  />
  <h1 class="item-title" id="参数">非过滤参数</h1>
  <p>组件传给服务端的参数默认为 limit=10&page=1&offset=0</p>
  <p>定义表格的列时，如果将某一列设置为可过滤字段，那么访问后端接口时会同时传输过滤参数。例如，设置username字段为可过滤，则传递给后端API的参数为：username=xx&limit=10&page=1&offset=0 </p>
  <p>通过 <strong class="red">extra-query</strong> 属性可传递除分页、过滤以外的其他参数，但组件不监听该属性的变化</p>
  <p>参数： {{params}}</p>
  <admin-table-page
    :columns="columns"
    :fetch-method="fetchMethodExtra"
    :extra-query="{id: 2}"
  />
  <h1 class="item-title" id="服务端返回数据key映射">服务端返回数据对象的key映射</h1>
  <p>服务端API返回数据对象的key默认为{ total, list }, 如果服务端以其他key返回数据，可设置 <strong class="red">list-key</strong>,  <strong class="red">total-key</strong> 两个属性做映射。</p>
  <p>例如，服务端返回{ count, items }，则需要设置：</p>
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
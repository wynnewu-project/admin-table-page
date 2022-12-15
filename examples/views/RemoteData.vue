<template>
  <h1 class="m-b-16">远程数据</h1>
  <ul>
    <li>fetch-method设置远程获取数据的函数，该函数返回Promise</li>
    <li>服务端返回数据格式默认为{ total, list }, 其中total 返回表格数据总记录数， list返回当前页数据列表</li>
    <li>如果服务端以其他key返回数据，需要设置listKey,totalKey两个属性做映射。例如，服务端返回{ count, items }，则需要设置：
        <p>total-key="count"</p>
        <p>list-key="items"</p>
    </li>
    <li>传给服务端的参数默认为limit=10&page=1&offset=0</li>
  </ul>
  <h1 class="m-b-16">示例</h1>
  <admin-table-page
    :columns="columns"
    :fetch-method="fetchMethod"
  />
</template>

<script setup>
import { columns, fetchMethod } from './variables';
</script>
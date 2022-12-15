<template>
  <h1 class="m-b-16">操作列</h1>
  <ul>
    <li>可通过actionColumnLabel配置操作列的列名，默认为： 操作（zhCn）/Actions（en）</li>
    <li>actionColumn 数组定义操作列，以 “|”分隔每个操作按钮; 操作按钮对应的click处理函数以当前行为参数</li>
    <li>可通过 &lt;template #actions&gt;&lt;/template&gt;自定义 </li>
  </ul>
  <h1 class="m-b-16">示例</h1>
  <div class="m-b-16">
  <span>
    自定义操作列的列名：
    <el-input style="width: 250px" v-model="actionColumnLabel"/>
  </span>
  </div>
  <admin-table-page
    :columns="columns"
    :data="data"
    :action-column="actionColumn"
    :action-column-label="actionColumnLabel"
  />
</template>

<script setup>
import { ref } from "vue";
import { columns, data, actionColumn } from "./variables";

const actionColumnLabel = ref();

</script>
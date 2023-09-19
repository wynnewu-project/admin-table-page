<template>
  <examples-content
    title="自动刷新表格"
  >
  <ul>
    <li class="list-info"><strong class="red">refresh</strong> 属性用于设置自动刷新频率，类型为number，单位为毫秒</li>
    <li class="info-list">
      设置自动刷新频率后， 组件会在表格右上方提供 
      暂停刷新按钮 <el-button :icon="VideoPause"/> 
      和
      恢复自动刷新按钮 <el-button :icon="Refresh"/> 
    </li>
  </ul>
  <h1 class="item-title">示例: 2s刷新一次 </h1>
  <admin-table-page
    :columns="columns"
    :fetch-method="fetchMethod"
    :refresh="2000"
  />
  </examples-content>
</template>
<script setup>
import { columns, fetchMethod } from './variables';
import { VideoPause, Refresh } from "@element-plus/icons-vue";
import ExamplesContent from '../components/ExamplesContent.vue';

</script>
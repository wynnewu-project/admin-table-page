<template>
  <examples-content
    title="本地数据"
  >
  <p>可通过data属性设置表格数据</p>
  <p>当data数组长度超过表格设置的pageSize时，组件会自动进行分页</p>
  <admin-table-page
    :columns="columns"
    :data="generatorData(11)"
  />
  </examples-content>
</template>

<script setup>
import { columns, generatorData} from './variables';
import ExamplesContent from '../components/ExamplesContent.vue';
</script>
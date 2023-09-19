<template>
  <examples-content
    title="显示行序号"
  >
    <p>属性 <strong class="red">show-index</strong> 类型为boolean，可设置是否显示行序号</p>
    <admin-table-page
      :columns="columns"
      :local-data="data"
      :show-index="true"
    />
  </examples-content>
</template>

<script setup>
import { columns, data } from './variables';
import ExamplesContent from '../components/ExamplesContent.vue';
</script>
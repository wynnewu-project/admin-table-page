<template>
  <examples-content
    title="显示行序号"
  >
    <admin-table-page
      :columns="columns"
      :data="data"
      :showIndex="true"
    />
  </examples-content>
</template>

<script setup>
import { columns, data } from './variables';
import ExamplesContent from '../components/ExamplesContent.vue';
</script>
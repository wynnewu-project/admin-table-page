<template>
  <h1 class="m-b-16">显示行序号</h1>
  <admin-table-page
    :columns="columns"
    :data="data"
    :showIndex="true"
  />
</template>

<script setup>
import { columns, data } from './variables';
</script>
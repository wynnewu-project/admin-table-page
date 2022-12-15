<template>
  <h1 class="m-b-16">本地数据</h1>
  <admin-table-page
    :columns="columns"
    :data="data"
  />
</template>

<script setup>
import { columns, data } from './variables';
</script>
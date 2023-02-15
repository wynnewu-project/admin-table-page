<template>
  <h1>Admin Table Page 组件</h1>
  <layout/>
</template>
<script setup>
import Layout from './views/Layout.vue';
</script>

<style lang="scss">
body {
  color: var(--el-text-color-primary);
}
.m-r-8 {
  margin-right: 8px;
}
.page-title {
  font-size: 2.2rem;
  color: var(--el-text-color-regular);
  margin-bottom: 24px;
}
.item-title {
  font-size: 1.32rem;
  margin-bottom: 16px;
  color: var(--el-text-color-regular);
}
.info-list {
  margin-top: 10px;
}
</style>
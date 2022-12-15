<template>
  <h1 class="m-b-16">语言切换</h1>
  <el-radio-group v-model="locale" class="m-b-16">
    <el-radio-button label="zhCn">Chinese</el-radio-button>
    <el-radio-button label="en">English</el-radio-button>
  </el-radio-group>
  <admin-table-page
    :columns="columns"
    :data="data"
    :searchFields="searchFields"
    :hiddenSearchFields="hiddenSearchFields"
    refresh="manual"
    :locale="locale"
    :actionColumn="actionColumn"
  />
  
</template>

<script setup>
import { ref } from "vue";
import { columns, data, searchFields, hiddenSearchFields, actionColumn } from './variables';
const locale = ref("zhCn");
</script>
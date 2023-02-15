<template>
  <examples-content
    title="语言切换"
  >
    <el-radio-group v-model="locale" style="margin-bottom:16px">
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
  </examples-content>
  
</template>

<script setup>
import { ref } from "vue";
import { columns, data, searchFields, hiddenSearchFields, actionColumn } from './variables';
import ExamplesContent from "../components/ExamplesContent.vue";
const locale = ref("zhCn");
</script>
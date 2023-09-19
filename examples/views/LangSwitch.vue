<template>
  <examples-content
    title="语言切换"
  >
    <p><strong class="red">locale</strong> 属性类型为string，设置组件的语言环境，默认为中文（zhCn），目前仅支持"zhCn"和"en"</p>
    <el-radio-group v-model="locale" style="margin-bottom:16px">
      <el-radio-button label="zhCn">Chinese</el-radio-button>
      <el-radio-button label="en">English</el-radio-button>
    </el-radio-group>
    <admin-table-page
      :columns="filterColumns"
      :local-data="data"
      refresh="manual"
      :locale="locale"
      :actionColumn="actionColumn"
    />
  </examples-content>
  
</template>

<script setup>
import { ref } from "vue";
import { filterColumns, data, searchFields, hiddenSearchFields, actionColumn } from './variables';
import ExamplesContent from "../components/ExamplesContent.vue";
const locale = ref("zhCn");
</script>
<template>
  <el-col 
    v-bind="colBreakpoint"
    v-for="{ name, searchType, label, ...field } in searchFields"
    :key="name"
  >
    <el-form-item 
      :label="label"
      :prop="name"
    >
      <ct-search-item
        v-model="query[name]"
        :search-type="searchType"
        v-bind="field"
      />
    </el-form-item>
  </el-col>
</template>

<script setup>
import { inject } from 'vue';
import CtSearchItem from "./CTSearchItem.vue";

defineProps({
  colBreakpoint: Object,
  searchFields: {
    type: Array,
    default: []
  }
})

const query = inject("query");


</script>
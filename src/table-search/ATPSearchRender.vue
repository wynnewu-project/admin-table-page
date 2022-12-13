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
      <atp-search-item
        v-model="query[name]"
        :search-type="searchType"
        v-bind="field"
      />
    </el-form-item>
  </el-col>
</template>

<script setup>
import { inject } from 'vue';
import AtpSearchItem from "./ATPSearchItem.vue";

defineProps({
  colBreakpoint: Object,
  searchFields: {
    type: Array,
    default: []
  }
})

const query = inject("query");


</script>
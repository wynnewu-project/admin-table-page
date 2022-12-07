<template> 
  <el-select 
    v-if="searchType === 'select'" 
    clearable
    style="width: 100%"
  >
    <el-option 
      v-for="option in selectOptions"
      :key="option.value"
      :value="option.value"
      :label="option.label"
    />
  </el-select>
  <el-date-picker 
    v-else-if="searchType === 'date'" 
    value-format="YYYY-MM-DD hh:mm:ss"
    style="width: 100%"
  />
  <el-input v-else clearable/>
</template>

<script setup>import { computed } from 'vue';

 
const props = defineProps({
  searchType: {
    type: String,
    default: "input"
  },
  label: String,
  options: {
    type: Array,
    default: []
  }
})

const selectOptions = computed(()=> 
  props.options.map(op => {
    if(op?.label) {
      return op
    } 
    return { value: op, label: op}
  })
)

</script>
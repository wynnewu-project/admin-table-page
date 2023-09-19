<template> 
  <el-select 
    v-if="type === 'select'" 
    clearable
    style="width: 100%"
    :placeholder="t('placeholder.select')"
  >
    <el-option 
      v-for="option in selectOptions"
      :key="option.value"
      :value="option.value"
      :label="option.label"
    />
  </el-select>
  <el-date-picker 
    v-else-if="type === 'date'" 
    value-format="YYYY-MM-DD"
    style="width: 100%"
  />
  <el-input v-else clearable/>
</template>

<script setup>
import { computed, inject } from 'vue';

 
const props = defineProps({
  type: {
    type: String,
    default: "input"
  },
  label: String,
  options: {
    type: Array,
    default: []
  }
})

const t = inject("translate");

const selectOptions = computed(()=> 
  props.options.map(op => {
    if(op?.label) {
      return op
    } 
    return { value: op, label: op}
  })
)

</script>
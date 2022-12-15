<template>
  <h1 class="m-b-16">多选表格数据</h1>
  <ul>
    <li>设置selectable="multiple"开启多选</li>
    <li>必须设置row-key属性</li>
    <li>可通过@select-change设置选择数据变化时的处理函数。函数参数为已选行列表</li>
  </ul>
  <h1 class="m-b-16">示例</h1>
  <p class="m-b-16">
    已选用户： 
    <el-tag v-for="u in selectRows" :key="u" style="margin-right: 8px"> {{u}}</el-tag>
  </p>
  <admin-table-page
    :columns="columns"
    :data="data"
    selectable="multiple"
    row-key="username"
    @select-change="handleSelectChange"
  />
</template>
<script setup>
import { ref } from "vue";
import { columns, data } from './variables';

const selectRows = ref([]);

const handleSelectChange = (rows) => {
  selectRows.value = rows.map(user => user.username);
}
</script>
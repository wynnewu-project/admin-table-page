<template>
  <examples-content
    title="多选表格数据"
  >
  <ul>
    <li>设置selectable="multiple"开启多选</li>
    <li>必须设置row-key属性</li>
    <li>可通过@select-change设置选择数据变化时的处理函数。函数参数为已选行列表</li>
    <li>可通过函数getSelectionsu获取已选择的数据。无论是本地数据还是远程获取的数据，调用该函数时，跨页选择的数据也会返回</li>
  </ul>
  <p style="margin-bottom: 16px">
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
  </examples-content>
</template>
<script setup>
import { ref } from "vue";
import { columns, generatorData} from './variables';
import ExamplesContent from "../components/ExamplesContent.vue";

const selectRows = ref([]);
const data = ref(generatorData(11));

const handleSelectChange = (rows) => {
  selectRows.value = rows.map(user => user.username);
}
</script>
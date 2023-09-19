<template>
  <examples-content
    title="多选表格数据"
  >
  <ul>
    <li class="info-list">设置属性 <strong class="red">selectable</strong> 为"multiple"开启表格数据的多选。<strong class="red">翻页后仍保留前面已选的数据</strong></li>
    <li class="info-list">此时，必须同时设置组件属性 <strong class="red">row-key</strong> </li>
    <li class="info-list">可通过监听组件事件 <strong class="red">@select-change</strong> 来处理选择数据变化这一事件。回调函数的参数为已选行列表</li>
    <li class="info-list">可通过组件API <strong class="red">getSelectionsu</strong> 获取已选择的数据。无论是本地数据还是远程获取的数据，调用该函数时，跨页选择的数据也会返回</li>
  </ul>
  <p style="margin-bottom: 16px">
    已选用户： 
    <el-tag v-for="u in selectRows" :key="u" style="margin-right: 8px"> {{u}}</el-tag>
  </p>
  <admin-table-page
    :columns="columns"
    :local-data="data"
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
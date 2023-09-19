<template>
  <examples-content
    title="本地数据"
    :links="['columns 属性类型为 object', 'columns 属性类型为 string']"
  >
  <ul>
    <li class="info-list">可通过 <strong class="red">local-data</strong> 属性设置表格数据</li>
    <li class="info-list">当 local-data 数组长度超过表格设置的pageSize时，组件会自动进行分页</li>
    <li class="info-list"><strong class="red">columns</strong> 属性定义表格中的每一列，可以通过一个object来定义，也可以仅通过一个string来定义</li>
  </ul>
  <h3 class="item-title" id="columns 属性类型为 object"> columns 属性类型为 object</h3>
  <p>
    columns:
    <span>{{ JSON.stringify(columns) }}</span>
  </p>
  <admin-table-page
    :columns="columns"
    :local-data="generatorData(11)"
  />
  <h3 class="item-title" id="columns 属性类型为 string"> columns 属性类型为 string</h3>
  <p>当列定义为字符串时，以每个字符串作为列的prop, 列的label为该字符串首字母大写</p>
  <p>
    columns:
    <span>{{ JSON.stringify(stringColumns) }}</span>
  </p>
  <admin-table-page
    :columns="stringColumns"
    :local-data="generatorData(1,3)"
  />
  </examples-content>
</template>

<script setup>
import { columns, generatorData, stringColumns} from './variables';
import ExamplesContent from '../components/ExamplesContent.vue';
</script>
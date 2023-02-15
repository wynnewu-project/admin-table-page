<template>
  <examples-content
    title="操作列"
    :links="links"
  >
    <h3 class="item-title" id="基础用法">基础用法</h3>
    <p>actionColumn 属性期望传入数组，根据数组元素定义操作列</p>
    <p>页面渲染时以 “|”分隔每个操作按钮; 操作按钮对应的click处理函数以当前行为参数</p>
    <admin-table-page
      :columns="columns"
      :data="data"
      :action-column="actionColumn"
    />
    <h3 class="item-title" id="自定义列名">自定义列名</h3>
    <p>actionColumnLabel属性配置操作列的列名</p>
    <p>默认值： 操作（zhCn）/Actions（en）</p>
    <div style="margin-bottom: 8px">
      <span>
        自定义操作列的列名：
        <el-input style="width: 250px" v-model="actionColumnLabel"/>
      </span>
    </div>
    <admin-table-page
      :columns="columns"
      :data="data"
      :action-column="actionColumn"
    />
    <h3 class="item-title" id="其他属性配置">其他属性配置</h3>
    <p>actionColumnProps属性期望传入Object,配置其他原el-table-column属性</p>
    <p>如可配置操作列右侧固定等</p>
    <admin-table-page
      :columns="columnsWidth"
      :data="data"
      :action-column="actionColumn"
      :action-column-props="{fixed: 'right', width: 400}"
    />
    <h3 class="item-title" id="自定义">自定义</h3>
    <p>可通过name为"actions"的slot自定义操作列的内容, 参考 <el-link type="primary" href="/slot#操作列">自定义操作列</el-link></p>
    <p>可通过name为"actions_header"的slot自定义操作列头的内容, 参考 <el-link type="primary" href="/slot#操作列头">自定义操作列头</el-link></p>
  </examples-content>
</template>

<script setup>
import { ref } from "vue";
import { columns, data, actionColumn, columnsWidth } from "./variables";
import ExamplesContent from "../components/ExamplesContent.vue";

const actionColumnLabel = ref();
const links = [
  "基础用法",
  "列名",
  "其他属性配置",
  "自定义"
]

</script>
<template>
  <examples-content
    title="操作列"
    :links="links"
  >
    <h3 class="item-title" id="基础用法">基础用法</h3>
    <p><strong class="red">action-column</strong> 属性类型为array，用于定义一组对行数据的操作按钮。数组中的每个元素类型为object，定义操作按钮的具体属性</p>
    <p>页面渲染时以 “|”分隔每个操作按钮</p>
    <p>操作按钮object中，<strong class="red">onClick</strong> 属性定义按钮点击的回调函数，参数为当前行数据</p>
    <admin-table-page
      :columns="columns"
      :local-data="data"
      :action-column="actionColumn"
    />
    <h3 class="item-title" id="自定义列名">自定义列名</h3>
    <p>默认操作列的列名为： 操作（zhCn）/Actions（en）</p>
    <p><strong class="red">action-column-label</strong> 属性可配置操作列的列名为其他值</p>
    <div style="margin-bottom: 8px">
      <span>
        自定义操作列的列名：
        <el-input style="width: 250px" v-model="actionColumnLabel"/>
      </span>
    </div>
    <admin-table-page
      :columns="columns"
      :local-data="data"
      :action-column="actionColumn"
      :action-column-label="actionColumnLabel"
    />
    <h3 class="item-title" id="其他属性配置">其他属性配置</h3>
    <p><strong class="red">action-column-props</strong> 属性类型为object，为操作列定义其他原el-table-column属性， 如右侧固定等</p>
    <admin-table-page
      :columns="columnsWidth"
      :local-data="data"
      :action-column="actionColumn"
      :action-column-props="{fixed: 'right', width: 400}"
    />
    <h3 class="item-title" id="自定义">自定义</h3>
    <p>可通过name为 <strong class="red">actions</strong> 的slot自定义操作列的内容, 参考 <el-link type="primary" href="/slot#操作列">自定义操作列</el-link></p>
    <p>可通过name为 <strong class="red">actions_header</strong> 的slot自定义操作列列头的内容, 参考 <el-link type="primary" href="/slot#操作列头">自定义操作列头</el-link></p>
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
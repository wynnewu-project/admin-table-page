<template>
  <examples-content
    title="slot自定义"
    :links="links"
  >
    <h1 class="item-title" id="搜索框">自定义搜索框</h1>
    <p>此时，可通过组件的reload方法，将搜索参数传入并触发数据筛选</p>
    <admin-table-page 
      ref="tableRef"
      :columns="columns" 
      :data="data" 
    >
      <template #search>
        <div class="item-title">
          <el-input v-model="username" placeholder="搜索姓名" style="width: 250px;margin-right: 16px"/>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </div>
      </template>
    </admin-table-page>
    <h1 class="item-title" id="工具栏">自定义工具栏</h1>
    <admin-table-page 
      :columns="columns" 
      :data="data" 
    >
      <template #tools>
        <el-input 
          style="width: 250px;margin-bottom: 16px"
          placeholder="搜索"
        ></el-input>
      </template>
    </admin-table-page>
    <h1 class="item-title" id="操作列">自定义操作列</h1>
    <admin-table-page 
      :columns="columns" 
      :data="data" 
    >
      <template #actions="{ row }">
        <el-button type="primary" @click="handleEditRow(row.username)">编辑</el-button>
      </template>
    </admin-table-page>
    <h1 class="item-title" id="操作列">自定义操作列头</h1>
    <admin-table-page 
      :columns="columns" 
      :data="data" 
      :action-column="actionColumn"
    >
      <template #actions_header>
        <span class="m-r-8">操作</span>
        <span><el-icon><QuestionFilled /></el-icon></span>
      </template>
    </admin-table-page>
    <h1 class="item-title" id="普通列">自定义普通列</h1>
    <admin-table-page 
      :columns="columns" 
      :data="data" 
    >
      <template #username="{ row }">
        <el-tag>{{row.username}}</el-tag>
      </template>
    </admin-table-page>
    <h1 class="item-title" id="普通列头">自定义普通列头</h1>
    <admin-table-page 
      :columns="columns" 
      :data="data" 
    >
      <template #age_header>
        <el-input/>
      </template>
    </admin-table-page>
    <h1 class="item-title" id="额外列定义">额外列定义</h1>
    <p>当有部分列的自定义无法通过columns属性或者普通列相关的slot自定义时(比如一些对admin-table-page进行二次封装的组件需要自定义列或者列名时)，可通过name为extra_columns来补充</p>
    <p>extra_columns定义的列在columns定义的列后面渲染</p>
    <admin-table-page 
      :columns="columns" 
      :data="data" 
    >
      <template #extra_columns="{ row }">
        <el-table-column prop="extra" label="Extra">
          {{ `${row.username_extra}` }}
        </el-table-column>
      </template>
    </admin-table-page>
  </examples-content>
</template>

<script setup>
import { columns, data, actionColumn } from "./variables";  
import { ref } from "vue";
import { QuestionFilled } from "@element-plus/icons-vue";
import ExamplesContent from "../components/ExamplesContent.vue";

const username=ref();
const tableRef = ref();

const links = [
  "搜索框",
  "工具栏",
  "操作列",
  "操作列头",
  "普通列",
  "普通列头",
  "额外列定义",
];

const handleSearch = () => {
  tableRef.value.reload({ username: username.value });
}

const handleEditRow = (name) => {
  alert(name);
}
</script>
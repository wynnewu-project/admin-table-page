<template>
  <el-container> 
    <el-aside width="300px">
      <el-menu router :default-active="activeMenu" :default-openeds="['2']">
        <el-menu-item index="/home">简介</el-menu-item>
        <el-sub-menu index="2">
          <template #title>用法示例</template>
        <el-menu-item index="/localData"> 本地数据 </el-menu-item>
        <el-menu-item index="/remoteData"> 远程数据 </el-menu-item>
        <el-menu-item index="/searchFields"> 搜索框 </el-menu-item>
        <el-menu-item index="/toolButtons"> 工具栏</el-menu-item>
        <el-menu-item index="/manualRefresh"> 手动刷新 </el-menu-item>
        <el-menu-item index="/autoRefresh"> 自动刷新 </el-menu-item>
        <el-menu-item index="/singleSelect"> 单选表格数据 </el-menu-item>
        <el-menu-item index="/multipleSelect"> 多选表格数据 </el-menu-item>
        <el-menu-item index="/showIndex"> 显示行序号</el-menu-item>
        <el-menu-item index="/actionColumn"> 操作列 </el-menu-item>
        <el-menu-item index="/langSwitch"> 语言切换</el-menu-item>
        <el-menu-item index="/tips">Tips</el-menu-item>
        <el-menu-item index="/attributes">El-table Attributes、事件和方法</el-menu-item>
        <el-menu-item index="/slot"> slot自定义</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-main><router-view/></el-main>
  </el-container>
</template>
<script setup>
import { computed } from 'vue-demi';
import { useRoute } from 'vue-router';

const activeMenu = computed(() => useRoute().path)
</script>
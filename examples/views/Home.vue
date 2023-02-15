<template>
  <examples-content
    title="简介"
    :links="['文档', '总体架构', '特点']"
  >
    <p>Admin Table Page基于Vue3和Element-plus，通过简单的属性配置能够快速生成一个具有过滤搜索、工具栏、数据远程获取、分页控制等功能的常见管理后台表格页面。</p>
    <h1 class="item-title" id="#文档">文档</h1>
    <p>组件的安装与使用，以及对外暴露的属性、事件、方法等详细信息，可参考github上的文档</p>
    <ul>
      <li class="info-list"><el-link type="primary" href="https://github.com/wynnewu-project/admin-table-page/blob/main/README.zh.md">简体中文</el-link></li>
      <li class="info-list"><el-link type="primary" href="https://github.com/wynnewu-project/admin-table-page">English</el-link></li>
    </ul>
    <h1 class="item-title" id="#总体架构">总体架构</h1>
    <el-image :src="ArchPicture" style="width: 100%;"></el-image>
    <h1 class="item-title" id="#功能">特点</h1>
    <ul>
      <li class="info-list">只需要配置从服务端获取数据的接口，即可自动从服务端拉取数据，完成表格数据渲染</li>
      <li class="info-list">支持表格数据的刷新，包括自动刷新和手动刷新</li>
      <li class="info-list">过滤搜索区域根据配置自动生成，过滤条件的变化自动触发数据的过滤筛选</li>
      <li class="info-list">组件默认对数据进行分页控制</li>
      <li class="info-list">通过data（同el-table的data属性）属性配置的本地数据也支持数据分页展示</li>
      <li class="info-list">多选表格数据时，支持跨页选择，远程获取数据时也同样支持</li>
      <li class="info-list">通过不同name的slot,可以实现组件各部位的自定义</li>
      <li class="info-list">自适应布局，在窄屏时也有很好的UI展示</li>
      <li class="info-list">支持中/英文切换</li>
    </ul>
  </examples-content>
</template>
<script setup>
import ExamplesContent from '../components/ExamplesContent.vue';
import ArchPicture from "../assets/arch.png"

</script>
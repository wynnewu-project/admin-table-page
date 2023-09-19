<template>
  <el-container>
    <el-main>
      <el-scrollbar height="calc(100vh - 174px)">
        <h1 class="page-title">{{title}}</h1>
        <slot/>
      </el-scrollbar>
    </el-main>
    <el-aside width="200px" v-if="links && links.length">
      <h1>CONTENTS</h1>
      <ul style="list-style: none; padding: 0;font-size: 0.7em;gap: 16px">
        <li
          v-for="link in links"
          :key="link"
          style="margin-top: 10px"
        >
          <el-link :href="`#${link}`">{{link}}</el-link>
        </li>
      </ul>
    </el-aside>
  </el-container>
</template>
<script setup>
defineProps(["links", "title"]);
</script>
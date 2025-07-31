<template>
	<div class="page-header">
		<h1>Admin Table Page 组件</h1>
	</div>
	<layout />
</template>
<script setup lang="ts">
import Layout from "./views/Layout.vue";
</script>

<style lang="scss">
body {
	color: var(--el-text-color-primary);
	margin: 0;
	#app {
		height: 100vh;
		box-sizing: border-box;
		padding: 16px;
	}
}
.page-header {
	height: 80px;
	line-height: 80px;
	h1 {
		margin: 0;
	}
}
.m-r-8 {
	margin-right: 8px;
}
.page-title {
	font-size: 2.2rem;
	color: var(--el-text-color-regular);
	margin-bottom: 24px;
}
.item-title {
	font-size: 1.32rem;
	margin-bottom: 16px;
	color: var(--el-text-color-regular);
}
.info-list {
	margin-top: 10px;
}
.sub-item-title {
	font-size: 1rem;
	color: var(--el-text-color-secondary);
	&::before {
		content: "";
		display: inline-block;
		width: 8px;
		height: 8px;
		background: var(--el-text-color-secondary);
		margin-right: 4px;
		border-radius: 50%;
	}
}
</style>

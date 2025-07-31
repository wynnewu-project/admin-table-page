<script setup lang="ts">
import { h } from "vue";
import ExamplesContent from "../components/ExamplesContent.vue";
import { columns, data } from "./variables";
import ComponentWrapper from "./ComponentWrapper.vue";

const wrapper = h("div", { class: "custom-wrapper" });
</script>

<template>
	<ExamplesContent
		title="Table Wrapper Component"
		:links="['默认Wrapper', '自定义Wrapper']"
	>
		<h1
			class="item-title"
			id="默认Wrapper"
		>
			默认Wrapper
		</h1>
		<p>组件的表格及工具栏部分默认渲染在el-card组件中</p>
		<admin-table-page
			:columns="columns"
			:local-data="data"
		/>
		<h1
			class="item-title"
			id="自定义Wrapper"
		>
			自定义Wrapper
		</h1>
		<p>
			可以通过组件提供的
			<strong class="red">tableWrapper</strong>
			属性来自定义组件的外部容器。该属性可以是一个HTML元素或一个Vue组件。
		</p>
		<h2 class="sub-item-title">HTML Wrapper</h2>
		<admin-table-page
			:columns="columns"
			:local-data="data"
			:table-wrapper="wrapper"
		/>
		<h2 class="sub-item-title">Vue组件Wrapper</h2>
		<admin-table-page
			:columns="columns"
			:local-data="data"
			:table-wrapper="ComponentWrapper"
		/>
	</ExamplesContent>
</template>
<style lang="scss">
.custom-wrapper {
	background-color: #f5f5f5;
	padding: 16px;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

<template>
	<examples-content title="手动刷新表格数据">
		<p>
			当表格数据源为服务端API获取时，配置属性
			<strong class="red">refresh</strong>为
			<strong class="red">"manual"</strong>，
			组件默认渲染刷新按钮。点击表格右上角的刷新按钮会从服务端重新获取表格数据并刷新表格
		</p>
		<admin-table-page
			:columns="columns"
			:fetch-method="fetchMethod"
			refresh="manual"
		/>
	</examples-content>
</template>

<script setup lang="ts">
import { columns, fetchMethod } from "./variables";
import ExamplesContent from "../components/ExamplesContent.vue";
</script>

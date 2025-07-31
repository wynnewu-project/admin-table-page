<template>
	<examples-content
		title="El-table组件属性、事件透传及方法调用"
		:links="[
			'El-table组件属性',
			'El-table组件事件监听',
			'El-table组件方法调用',
		]"
	>
		<p>
			可以透传原el-table的其他属性、事件,
			也可以通过组件暴露的tableRef变量来调用原el-method方法
		</p>
		<h1
			class="item-title"
			id="El-table组件属性"
		>
			El-table组件属性
		</h1>
		<p>如可以设置table的斑马纹以及高度</p>
		<admin-table-page
			stripe
			:height="250"
			:columns="columns"
			:data="data"
		/>
		<h1
			class="item-title"
			id="El-table组件事件监听"
		>
			El-table组件事件监听
		</h1>
		<p class="m-b-16">鼠标进入单元格： {{ msg }}</p>
		<admin-table-page
			:columns="columns"
			:data="data"
			@cell-mouse-enter="handleMouseEnter"
		/>
		<h1
			class="item-title"
			id="El-table组件方法调用"
		>
			El-table组件方法调用
		</h1>
		<p>
			组件对外暴露<strong class="red">tableRef</strong
			>变量，该变量为对ElTable的引用，可以通过tableRef调用ElTable的原生方法
		</p>
		<p>
			<el-button @click="handleClearSelection">取消多选</el-button>
			<el-button @click="handleSort">按年龄降序排序</el-button>
			<el-button @click="setRowOneSelected">选中User2</el-button>
		</p>
		<admin-table-page
			ref="atpTableRef"
			:columns="columns"
			:data="data"
			selectable="multiple"
			row-key="username"
		/>
	</examples-content>
</template>
<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { columns, data, ExampleData } from "./variables";
import ExamplesContent from "../components/ExamplesContent.vue";

const atpTableRef = useTemplateRef("atpTableRef");
const msg = ref("");

const handleMouseEnter = (row: ExampleData, column) => {
	msg.value = `${column.property}: ${row[column.property]}`;
};

const handleClearSelection = () => {
	atpTableRef.value.tableRef.clearSelection();
};
const handleSort = () => {
	console.log(atpTableRef.value.tableRef);
	atpTableRef.value.tableRef.sort("age", "descending");
};

const setRowOneSelected = () => {
	atpTableRef.value.tableRef.toggleRowSelection(data[1], true);
};
</script>

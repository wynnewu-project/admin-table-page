<script setup lang="ts">
import ExamplesContent from "../components/ExamplesContent.vue";
import { columns, data, ExampleData } from "./variables";
import { useTable } from "../../src/composables/useTable";
import { RowAction, TableProps } from "../../src/type/table";
import { computed, ref } from "vue";
const { tableRef, handleBatchAction, handleRowAction } = useTable({
	idKey: "username",
});
const actionColumn: TableProps["actionColumn"] = computed(() => [
	{
		label: "Edit",
		onClick: async (row) => {
			const handler = (rowId, row: ExampleData) => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(row);
					}, 1000);
				}).then((v) => {
					console.log(v);
				});
			};
			await handleRowAction({ handler, row });
		},
	},
	{
		label: "Delete",
		onClick: (row) => {
			const handler = (rowId, row: ExampleData) => {
				return new Promise((resolve, reject) => {
					resolve(row);
				}).then((v) => {
					console.log(v);
				});
			};
			handleRowAction({ handler, row, confirmMsg: "yes" });
		},
	},
	{
		label: "View",
		onClick: (row) => {
			handleRowAction({
				handler: (rowId, row) => {
					return new Promise((resolve, reject) => {
						if (rowId === "user1") {
							resolve(1);
						} else {
							reject(1);
						}
					});
				},
				row,
				successFeedback: `User ${row.username} viewed `,
				failedFeedback: `User ${row.username} not viewed `,
				reload: false,
			});
		},
	},
]);

const toolButtons = [
	{
		label: "批量添加",
		onClick: async () => {
			const handler = (users, userInfos) => {
				return new Promise((resolve) => {
					resolve({ users, userInfos });
				}).then((v) => {
					console.log(v);
				});
			};
			await handleBatchAction({
				handler,
				feedbackWhenSelectNone: true,
			});
		},
	},
	{
		label: "批量删除",
		onClick: async () => {
			const handler = (users, userInfos) => {
				return new Promise((resolve) => {
					resolve({ users, userInfos });
				}).then((v) => {
					console.log(v);
				});
			};
			await handleBatchAction({
				handler,
				feedbackWhenSelectNone: true,
				noneSelectionMsg: "没有选择任何用户",
			});
		},
	},
];
</script>

<template>
	<ExamplesContent title="useTable">
		<p>
			组件提供composition API useTable, 封装了对表格行操作或批量操作时。
			该Composition API提供一下接口：
		</p>
		<ul>
			<li><strong>tableRef</strong> - 用于配置给组件的ref属性</li>
			<li>
				<strong>handleBatchAction</strong> - boolean值，表示是否正在执行操作
				<strong>handleRowAction</strong> - boolean值，表示是否正在执行操作
			</li>
		</ul>
		<admin-table-page
			ref="tableRef"
			:columns="columns"
			:local-data="data"
			:action-column="actionColumn"
			selectable="multiple"
			row-key="username"
			:tool-buttons="toolButtons"
		/>
	</ExamplesContent>
</template>

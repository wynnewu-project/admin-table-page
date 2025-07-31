import { Delete, Plus, View } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type {
	RowAction,
	SearchField,
	TableColumn,
	ToolButton,
} from "../../src/type/table";

export const stringColumns = ["username", "age", "lastLogin"];

export const columns: TableColumn[] = [
	{
		prop: "username",
		label: "Username",
	},
	{
		prop: "age",
		label: "Age",
	},
	{
		prop: "lastLogin",
		label: "Last Login",
	},
];

export const filterColumns: TableColumn[] = [
	{
		prop: "username",
		label: "Username",
		searchable: true,
	},
	{
		prop: "age",
		label: "Age",
		searchConfig: {
			type: "select",
			selectOptions: [18, 19, 20, 21, 22],
		},
	},
];

export const toolButtons: ToolButton[] = [
	{
		label: "New User",
		onClick: () => {
			console.log("new user");
		},
	},
	{
		label: "Delete",
		onClick: () => {
			console.log("delete user");
		},
	},
];

export const toolButtonsEl: ToolButton[] = [
	{
		label: "New User",
		icon: Plus,
		//if you import element-plus/icons-vue global, you can use string
		//icon: "Plus"
		onClick: () => {
			console.log("new user");
		},
	},
	{
		label: "Delete",
		icon: Delete,
		onClick: () => {
			console.log("delete user");
		},
		//you can add other el-button attributes, for example:
		type: "danger",
	},
];

export type ExampleData = {
	username: string;
	age: number;
	lastLogin: string;
};

export const data: ExampleData[] = [
	{
		username: "user1",
		age: 18,
		lastLogin: "2023-01-03",
	},
	{
		username: "user2",
		age: 19,
		lastLogin: "2023-01-02",
	},
];

export const generatorData = (min = 0, max = 20): ExampleData[] => {
	const length = Math.floor(Math.random() * (max - min + 1) + min);
	return [...Array(length)].map((_item, index) => ({
		username: `user${index}`,
		age: index + 18,
		lastLogin: `2023-01-${index + 1}`,
	}));
};

/**
 * fetchMethod -  Return a Promise.
 * the returned table data should contain:
 *  - "total": the total number of the table datas, you can map another words to this key by "totalKey" props
 *  - "list": the list of table datas, you can map another words to this key by "listKey" props
 *
 */
export const fetchMethod = (): Promise<{
	total: number;
	items: ExampleData[];
}> => {
	ElMessage.success({
		message: "fetch data from remote",
		offset: 100,
	});
	return new Promise((resolve, reject) => {
		const data = generatorData(11);
		resolve({
			total: data.length,
			items: data.slice(0, 10), // return the first 10 items
		});
	});
};

export const fetchFilterMethod = (
	query: Record<PropertyKey, unknown>,
): Promise<{ total: number; items: ExampleData[] }> => {
	ElMessage.success({
		message: "fetch data from remote",
		offset: 100,
	});
	return new Promise((resolve, reject) => {
		let data = generatorData(4, 4);
		const filterFields = Object.keys(query).filter(
			(k) => !["page", "pageSize", "offset", "limit"].includes(k),
		);
		data = data.filter((d) => {
			let filter = true;
			for (let k of filterFields) {
				if (query[k] === undefined || query[k] === null || query[k] === "")
					continue;
				if (typeof d[k] === "string") {
					filter = d[k].includes(query[k] as string);
				} else {
					filter = d[k] === Number(query[k]);
				}
			}
			return filter;
		});
		resolve({
			total: data.length,
			items: data,
		});
	});
};

export const fetchMethodOtherKey = (
	query: Record<PropertyKey, unknown>,
): Promise<{ count: number; list: ExampleData[] }> => {
	ElMessage.success({
		message: "fetch data from remote",
		offset: 100,
	});
	return new Promise((resolve, reject) => {
		const data = generatorData(8, 10);
		resolve({
			count: 18,
			list: data,
		});
	});
};

export const actionColumn: RowAction<ExampleData>[] = [
	{
		label: "编辑",
		onClick: () => {
			console.log("edit");
		},
	},
	{
		label: "删除",
		onClick: () => {
			console.log("delete");
		},
	},
	{
		icon: View,
		label: "查看",
		onClick: () => {
			console.log("view");
		},
		hidden: true, // this button will not be shown
	},
];

export const columnsWidth: TableColumn[] = [
	{
		prop: "username",
		label: "Username",
		width: 400,
	},
	{
		prop: "age",
		label: "Age",
		width: 400,
	},
	{
		prop: "lastLogin",
		label: "Last Login",
		width: 400,
	},
];

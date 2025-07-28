<template>
	<el-config-provider :locale="configLocale">
		<slot name="search">
			<atp-search
				v-if="searchFields.length || hiddenSearchFields.length"
				:showFields="searchFields"
				:hiddenFields="hiddenSearchFields"
			/>
		</slot>
		<el-card>
			<slot name="tools">
				<atp-tool
					:buttons="toolButtons"
					:refresh="refresh"
					@auto-refresh="handleAutoRefresh"
					@manual-refresh="getTableData"
					@pause-auto-refresh="handlePauseAutoRefresh"
				/>
			</slot>
			<slot name="tips">
				<el-alert
					v-if="tips"
					:title="tips"
					type="success"
					:closable="false"
					style="margin-bottom: 8px"
				/>
			</slot>
			<el-table
				ref="tableRef"
				v-loading="loading"
				:highlight-current-row="selectable === 'single'"
				:row-key="rowKey"
				table-layout="auto"
				@current-change="handleSelectionChange"
				@selection-change="handleSelectionChange"
				:header-cell-style="{
					backgroundColor: '#fafafa',
				}"
				border
				:data="tableData"
				v-bind="$attrs"
			>
				<el-table-column
					type="index"
					width="50"
					v-if="showIndex"
				/>
				<el-table-column
					type="selection"
					width="50"
					reserve-selection
					v-if="selectable === 'multiple'"
				/>
				<template
					v-for="{ hidden, ...elCol } in tableColumns"
					:key="elCol.prop"
				>
					<el-table-column
						v-if="!hidden"
						align="center"
						v-bind="elCol"
					>
						<template #header>
							<slot :name="`${elCol.prop}_header`">{{ elCol.label }}</slot>
						</template>
						<template #default="{ row, column }">
							<slot
								:name="elCol.prop"
								:row="row"
								>{{ row[column.property] }}</slot
							>
						</template>
					</el-table-column>
				</template>
				<slot name="extra_columns" />
				<el-table-column
					v-if="$slots.actions || actionColumn.length"
					prop="actions"
					align="center"
					v-bind="actionColumnProps"
				>
					<template #header>
						<slot name="actions_header">{{
							actionColumnLabel ?? $t("label.actionColumn")
						}}</slot>
					</template>
					<template #default="{ row }">
						<slot
							name="actions"
							:row="row"
						>
							<template
								v-for="({ text, hidden, onClick }, index) in actionColumn"
								:key="text"
							>
								<template v-if="!hidden">
									<el-divider
										direction="vertical"
										v-if="index"
										class="hidden-xs-only"
									/>
									<el-button
										type="primary"
										link
										size="small"
										@click="() => onClick(row)"
										>{{ text }}</el-button
									>
								</template>
							</template>
						</slot>
					</template>
				</el-table-column>
			</el-table>
			<div class="table-pagination">
				<el-pagination
					v-if="paginationable"
					v-model:current-page="page"
					v-model:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					@size-change="getTableData"
					@current-change="getTableData"
					:total="total"
					v-bind="elPaginationProps"
				/>
			</div>
		</el-card>
	</el-config-provider>
</template>

<script
	setup
	lang="ts"
	generic="
		DataType extends Record<string, unknown>,
		TotalKey extends string = 'total',
		ItemsKey extends string = 'items'
	"
>
import AtpTool from "../table-tool/ATPTool.vue";
import AtpSearch from "../table-search/ATPSearch.vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

import {
	computed,
	onMounted,
	onUnmounted,
	provide,
	ref,
	toValue,
	useTemplateRef,
	watch,
} from "vue";
import useMediaQuery from "../utils/useMediaQuery";
import { omitBy } from "lodash/fp";
import { debounce } from "lodash";
import type {
	PaginatedResult,
	SearchField,
	TableColumn,
	TableProps,
} from "@/type/table";
import type { TableInstance } from "element-plus";
import { useI18n } from "vue-i18n";

const props = withDefaults(
	defineProps<TableProps<DataType, TotalKey, ItemsKey>>(),
	{
		locale: "zhCn",
		showIndex: false,
		searchAreaMode: "card",
		localData: () => [],
		toolButtons: () => [],
		actionColumn: () => [],
		totalKey: () => "total" as TotalKey,
		itemsKey: () => "items" as ItemsKey,
		paginationable: true,
		rowKey: "id",
	},
);

const emits = defineEmits<{
	(e: "selectChange", selectedRows: DataType[]): void;
}>();

const i18n = useI18n();

const tableRef = useTemplateRef<TableInstance>("tableRef");
const tableData = ref<DataType[]>([]);
const filteredData = ref<DataType[]>(props.localData);
const timer = ref<number | null>(null);
const loading = ref(false);
const page = ref(1);
const pageSize = ref(10);
const total = ref(props.localData.length ?? 0);
const query = ref<Record<string, any>>({});
const queryChange = ref(false);
const searchFields = ref<SearchField[]>([]);
const hiddenSearchFields = ref<SearchField[]>([]);
const tableColumns = ref<TableColumn[]>();
const selectedRows = ref<DataType[]>([]);

const { breakpoint } = useMediaQuery();

const configLocale = computed(() => {
	return props.locale === "zhCn" ? zhCn : en;
});

const formatColumns = () => {
	const formatted = props.columns.map((col) => {
		if (typeof col === "string") {
			return {
				prop: col,
				label: col[0].toUpperCase() + col.slice(1),
				hidden: false,
			};
		}
		return col;
	});
	tableColumns.value = formatted;
	formatted.forEach((col) => {
		const { prop, label, searchable, searchConfig } = col;
		if (
			!searchable &&
			(searchConfig === undefined || JSON.stringify(searchConfig) === "{}")
		) {
			return;
		}
		if (!prop) {
			return;
		}
		const {
			defaultHidden = false,
			defaultValue = undefined,
			type = "input",
		} = searchConfig ?? {};
		query.value[prop] = defaultValue;

		const field: SearchField = {
			name: prop,
			label: label ?? prop[0].toUpperCase() + prop.slice(1),
			type,
			...searchConfig,
		};

		defaultHidden
			? hiddenSearchFields.value.push(field)
			: searchFields.value.push(field);
	});
};

formatColumns();

provide("breakpoint", breakpoint);
provide("query", query);
provide("translate", i18n.t);

const fetchRemoteData = async (params: Record<string, unknown> = {}) => {
	const finalQuery = {
		...query.value,
		...toValue(props.extraQuery ?? {}),
		...params,
		page: page.value,
		pageSize: pageSize.value,
		offset: (page.value - 1) * pageSize.value,
		limit: pageSize.value,
	};
	const res = await props.fetchMethod!(finalQuery);
	if (props.paginationable) {
		total.value =
			(res as PaginatedResult<DataType, TotalKey, ItemsKey>)[
				props.totalKey as TotalKey
			] ?? 0;
		tableData.value =
			(res as PaginatedResult<DataType, TotalKey, ItemsKey>)[
				props.itemsKey as ItemsKey
			] ?? [];
		return;
	}
	tableData.value = res as DataType[];
};

const filterLocalData = (params: Record<string, unknown> = {}) => {
	if (queryChange.value || (params && JSON.stringify(params) !== "{}")) {
		const filterParams = omitBy((value) => {
			return (
				value === null ||
				value === "" ||
				value === undefined ||
				(Array.isArray(value) && !value.length)
			);
		})({
			...query.value,
			...toValue(props.extraQuery),
			...params,
		});
		filteredData.value = props.localData.filter((data) => {
			let filter = true;
			for (let [key, value] of Object.entries(filterParams)) {
				const rowValue = data[key];
				if (typeof value === "string") {
					const testStr = new RegExp(value);
					filter = testStr.test(data[key] as string);
				} else if (Array.isArray(value)) {
					filter = value.includes(data[key]);
				} else {
					filter = value === rowValue;
				}
				if (!filter) {
					break;
				}
			}
			return filter;
		});
	}
	tableData.value = filteredData.value.slice(
		(page.value - 1) * pageSize.value,
		page.value * pageSize.value,
	);
};

const getTableData = async (params: Record<string, unknown> = {}) => {
	console.log("getTableData", params);
	try {
		loading.value = true;
		if (props.localData && !props.fetchMethod) {
			filterLocalData(params);
		} else {
			await fetchRemoteData(params);
		}
	} finally {
		loading.value = false;
	}
};

const reloadTableDebounced = () => {
	const func = debounce(getTableData, 300);
	func();
};

const handleSelectionChange = (rows: DataType | DataType[]) => {
	const selected = Array.isArray(rows) ? rows : [rows];
	selectedRows.value = selected;
	emits("selectChange", selected);
};
const handleAutoRefresh = () => {
	if (timer.value) {
		window.clearInterval(timer.value);
	}
	timer.value = window.setInterval(
		getTableData,
		(props.refresh as number) ?? 5000,
	);
};

const handlePauseAutoRefresh = () => {
	if (timer.value) {
		window.clearInterval(timer.value);
		timer.value = null;
	}
};

onMounted(() => {
	getTableData();
	if (typeof props.refresh === "number") {
		handleAutoRefresh();
	}
});

onUnmounted(() => {
	handlePauseAutoRefresh();
});

defineExpose({
	tableRef,
	reload: getTableData,
	getSelections: () => selectedRows.value,
	clearSelection: () => {
		selectedRows.value = [];
		if (!props.selectable) {
			return;
		}
		if (props.selectable === "multiple") {
			tableRef.value?.clearSelection();
			return;
		}
		tableRef.value?.setCurrentRow(null);
	},
});

watch(
	query,
	() => {
		queryChange.value = true;
		reloadTableDebounced();
	},
	{ deep: true },
);

watch(
	() => props.locale,
	(newLocale) => {
		i18n.locale.value = newLocale;
	},
);

watch(() => props.extraQuery, reloadTableDebounced);
watch(() => props.localData, reloadTableDebounced, { immediate: true });
</script>

<style lang="scss">
@use "../../style/atp-table.scss";
</style>

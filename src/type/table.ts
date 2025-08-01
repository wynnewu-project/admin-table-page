import type {
	ButtonProps as ElButton,
	TableColumnCtx as ElTableColumn,
	PaginationProps as ElPaginationProps,
} from "element-plus";
import type { Component, Ref } from "vue";

export type QueryParams = Record<PropertyKey, unknown>;

export type TableRowData = Record<PropertyKey, unknown>;

/**
 * render component type for the search field
 */
export type SearchRenderType = "input" | "select" | "date";

export interface ColumnSearchConfig {
	/**
	 * The type of the search component.
	 */
	type?: SearchRenderType;
	/**
	 * Whether the search component for the column is hidden by default.
	 */
	defaultHidden?: boolean;
	/**
	 * The options for the select component when `type` is `select`.
	 */
	selectOptions?: Array<{ label: string; value: unknown } | string | number>;
	/**
	 * default value for the search component.
	 */
	defaultValue?: unknown;
}

export interface SearchField extends ColumnSearchConfig {
	name: string;
	label: string;
}

export interface TableColumn extends Partial<ElTableColumn> {
	/**
	 * Hidden the column when `true`.
	 */
	hidden?: boolean;
	/**
	 * The column can be searched when `searchable` is true.
	 */
	searchable?: boolean;
	/**
	 * The search component configuration for the column.
	 */
	searchConfig?: ColumnSearchConfig;
}

export interface ToolButton extends Partial<ElButton> {
	/**
	 * The label for the tool button.
	 */
	label: string;
	/**
	 *  A function that is called when the button is clicked.
	 */
	onClick: () => void;
	/**
	 * Hides the button when `true`.
	 */
	hidden?: boolean | Ref<boolean>;
	/**
	 * If disable the button when selection is none in multiple selection
	 */
	disabledWhenNoSelect: boolean;
}

export interface RowAction<DataType> extends Partial<ElButton> {
	/**
	 * The label for the action button.
	 */
	label?: string;
	/**
	 * The icon for the action button.
	 */
	icon?: string | Component;
	/**
	 * The function that is called when the action button is clicked.
	 */
	onClick: (row: unknown) => void;
	/**
	 * Whether the action button is hidden
	 */
	hidden?: boolean | Ref<boolean> | ((row: DataType) => boolean);
	/**
	 * loading
	 */
	acting?: boolean | Ref<boolean>;
}

export type PaginatedResult<
	DataType,
	TotalKey extends string = "total",
	ItemsKey extends string = "items",
> = {
	[K in TotalKey]: number;
} & {
	[K in ItemsKey]: DataType[];
};

export interface TableProps<
	DataType extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
	TotalKey extends string = "total",
	ItemsKey extends string = "items",
> {
	/**
	 * columns of the table
	 */
	columns: (TableColumn | string)[];
	/**
	 * The component used to Wrap the table. Default is `el-card`.
	 */
	tableWrapper?: Component;
	/**
	 * The mode of the search area.
	 */
	searchAreaMode?: "card" | "inline";
	/**
	 * Locale for the table
	 */
	locale?: "zhCn" | "en";
	/**
	 * Whether to show the index column
	 */
	showIndex?: boolean;
	/**
	 * Local data for the table
	 * If `fetchMethod` is provided, this will be ignored.
	 */
	localData?: DataType[];
	/**
	 * Whether the table is paginated.
	 */
	paginationable?: boolean;
	/**
	 * The method to fetch data for the table.
	 */
	fetchMethod?: (
		query: Record<string, unknown>,
	) =>
		| Promise<PaginatedResult<DataType, TotalKey, ItemsKey>>
		| Promise<DataType[]>;
	/**
	 * How to refresh the table data.
	 * - `manual`: A refresh button will be shown to manually refresh the data.
	 * - `number`: The data will be fetched every `number` milliseconds automatically.
	 * - `undefined`: refresh is disabled.
	 */
	refresh?: "manual" | number;
	/**
	 * A list of tool buttons to be displayed above the table.
	 */
	toolButtons?: ToolButton[];
	/**
	 * How to select rows in the table.
	 * - `single`: Only one row can be selected at a time.
	 * - `multiple`: Multiple rows can be selected at a time, support selecting rows on different pages.
	 * - `undefined`: No selection is allowed.
	 */
	selectable?: "single" | "multiple";
	/**
	 * - The key used to identify each row in the table.
	 * - It's required when `selectable` is not `undefined`.
	 */
	rowKey?: string;
	/**
	 * The operations column configuration.
	 */
	actionColumn?: RowAction<DataType>[] | Ref<RowAction<DataType>[]>;
	/**
	 * The label for the action column. When locale is `zhCn`, the default is `操作`, otherwise it's `Operations`.
	 */
	actionColumnLabel?: string;
	/**
	 * Props for the action column.
	 */
	actionColumnProps?: TableColumn;
	/**
	 * The key used to get the total number of items in the paginated result.
	 */
	totalKey?: TotalKey;
	/**
	 * The key used to get the items in the paginated result.
	 */
	itemsKey?: ItemsKey;
	/**
	 * Extra query parameters to be sent for fetching data.
	 */
	extraQuery?: Record<string, unknown>;
	/**
	 * Props for the el-pagination.
	 */
	elPaginationProps?: ElPaginationProps;
	/**
	 * A tip for the table, displayed at the top of the table, under the tool buttons.
	 */
	tips?: string;
}

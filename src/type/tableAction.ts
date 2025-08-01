import type { TableRowData } from "./table";

export type ConfirmHandler = (
	message: string,
	callback: (...params: unknown[]) => void,
	errorHandle?: (...params: unknown[]) => void,
) => void;

export type RowActionHandler = (
	rowId: unknown,
	row: TableRowData,
) => Promise<void>;

export type TableBatchActionHandler = (
	rowIds: unknown[],
	rows: TableRowData[],
) => Promise<void>;

export interface CommonHandlerParams {
	reload?: boolean;
	successFeedback?: string;
	failedFeedback?: string;
}

export interface ActionHandlerParams extends CommonHandlerParams {
	/**
	 * The function that is called when the action is performed.
	 */
	handler: () => Promise<void>;
}

export interface ActionHandlerParamsWithConfirm extends ActionHandlerParams {
	confirmMsg: string;
	confirmHandler?: (callback: (params: ActionHandlerParams) => void) => void;
}

export interface TableActionHandlerParams extends CommonHandlerParams {
	handler: () => Promise<void>;
	actionLabel?: string;
	confirmMsg?: string;
	confirmHandler?: (callback: (params: ActionHandlerParams) => void) => void;
}

export interface RowActionHandlerParams
	extends Omit<TableActionHandlerParams, "handler"> {
	handler: RowActionHandler;
	row: TableRowData;
}

export interface TableBatchActionParams
	extends Omit<TableActionHandlerParams, "handler"> {
	/**
	 * The function that is called when the batch action is performed.
	 */
	handler: TableBatchActionHandler;
	/**
	 * Show feedback when select none rows
	 */
	feedbackWhenSelectNone?: boolean;
	noneSelectionMsg?: string;
}

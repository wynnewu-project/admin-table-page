import type { QueryParams, TableRowData } from "./table";

export type ConfirmHandler = (
	message: string,
	callback: (...params: unknown[]) => void,
	errorHandle?: (...params: unknown[]) => void,
) => void;

export type RowActionHandler = (
	rowId: unknown,
	row: TableRowData,
) => Promise<void>;

export type BatchActionHandler = (
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

export interface TableBatchActionParams extends CommonHandlerParams {
	/**
	 * The function that is called when the batch action is performed.
	 */
	handler: BatchActionHandler;
	/**
	 * Show feedback when select none rows
	 */
	feedbackWhenSelectNone?: boolean;
}

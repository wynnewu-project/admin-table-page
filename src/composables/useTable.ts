import { ElMessage } from "element-plus";
import { ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useUtils } from "./useUtils";
import type { TableRowData } from "@/type/table";
import type {
	ActionHandlerParams,
	ActionHandlerParamsWithConfirm,
	BatchActionParams,
	ConfirmHandler,
	HandleRowActionParams,
	HandleRowActionParamsWithConfirm,
	RowActionHandlerParams,
	TableBatchActionParams,
} from "@/type/tableAction";
import type { pa } from "element-plus/es/locales.mjs";

export function useTable(tableRefKey = "tableRef", idKey: PropertyKey = "id") {
	const externalTableRef = useTemplateRef<any>(tableRefKey);
	const { systemConfirm } = useUtils();
	const i18n = useI18n();
	const loading = ref(false);

	const handleAction = async ({
		handler,
		reload = true,
		successFeedback,
		failedFeedback,
	}: ActionHandlerParams) => {
		try {
			loading.value = true;
			await handler();
			ElMessage.success(
				successFeedback ?? i18n.t(`feedback.operation.success`),
			);
			if (reload) {
				externalTableRef.value.tableRef.reload();
			}
		} catch (error) {
			ElMessage.error(failedFeedback ?? i18n.t(`feedback.operation.failed`));
			console.error("Row action failed:", error);
		} finally {
			loading.value = false;
		}
	};

	const handleActionWithConfirm = async ({
		confirmMsg,
		confirmHandler,
		...params
	}: ActionHandlerParamsWithConfirm) => {
		if (confirmHandler) {
			confirmHandler(() => {
				handleAction(params);
			});
			return;
		}
		systemConfirm(confirmMsg, () => {
			handleAction(params);
		});
	};

	const handleRowAction = async ({
		handler,
		row,
		confirmMsg,
		confirmHandler,
		...commonParams
	}: RowActionHandlerParams) => {
		const rowActionHandler = async () => {
			await handler(row[idKey], row);
		};
		if (confirmMsg) {
			const params: ActionHandlerParamsWithConfirm = {
				...commonParams,
				handler: rowActionHandler,
				confirmMsg,
				confirmHandler,
			};
			await handleActionWithConfirm(params);
			return;
		}
		await handleAction({ handler: rowActionHandler, ...commonParams });
	};

	const handleBatchAction = async ({
		handler,
		feedbackWhenSelectNone,
	}: TableBatchActionParams) => {
		const selectedRows =
			externalTableRef.value.tableRef.getSelectedRowIds() as TableRowData[];
		if (selectedRows.length) {
			const selectedIds = selectedRows.map((row) => row[idKey]);
			const batchHandler = () => {
				handler(selectedIds, selectedRows);
			};
			return;
		}
		if (feedbackWhenSelectNone) {
			ElMessage.warning("");
		}
	};

	return {
		tableRef: externalTableRef,
		handleBatchAction,
		handleRowAction,
		loading,
	};
}

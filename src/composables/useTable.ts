import { ElMessage } from "element-plus";
import { ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useUtils } from "./useUtils";
import type { TableRowData } from "@/type/table";
import type {
	ActionHandlerParams,
	ActionHandlerParamsWithConfirm,
	RowActionHandlerParams,
	TableActionHandlerParams,
	TableBatchActionParams,
} from "@/type/tableAction";

export function useTable({
	tableRefKey = "tableRef",
	idKey = "id",
}: {
	tableRefKey?: string;
	idKey?: PropertyKey;
} = {}) {
	const externalTableRef = useTemplateRef<any>(tableRefKey);
	const { systemConfirm } = useUtils();
	const i18n = useI18n();

	const handleAction = async ({
		handler,
		reload = true,
		successFeedback,
		failedFeedback,
	}: ActionHandlerParams) => {
		try {
			await handler();
			ElMessage.success(
				successFeedback ?? i18n.t(`feedback.operation.success`),
			);
			if (reload) {
				console.log("reload");
				externalTableRef.value.reload();
			}
		} catch (error) {
			ElMessage.error(failedFeedback ?? i18n.t(`feedback.operation.failed`));
			console.error("Row action failed:", error);
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

	const handleTableAction = async ({
		confirmMsg,
		confirmHandler,
		actionLabel,
		...params
	}: TableActionHandlerParams) => {
		if (confirmMsg) {
			await handleActionWithConfirm({
				confirmMsg,
				confirmHandler,
				...params,
			});
			return;
		}
		await handleAction(params);
	};

	const handleRowAction = async ({
		handler,
		row,
		...params
	}: RowActionHandlerParams) => {
		const rowActionHandler = async () => {
			await handler(row[idKey], row);
		};
		await handleTableAction({
			handler: rowActionHandler,
			...params,
		});
	};

	const handleBatchAction = async ({
		handler,
		feedbackWhenSelectNone,
		noneSelectionMsg,
		...params
	}: TableBatchActionParams) => {
		const selectedRows =
			externalTableRef.value.getSelections() as TableRowData[];
		if (selectedRows.length) {
			const selectedIds = selectedRows.map((row) => row[idKey]);
			const batchHandler = async () => {
				await handler(selectedIds, selectedRows);
			};
			await handleTableAction({ handler: batchHandler, ...params });
			return;
		}
		if (feedbackWhenSelectNone) {
			ElMessage.warning(noneSelectionMsg ?? i18n.t("feedback.select.none"));
		}
	};

	return {
		tableRef: externalTableRef,
		handleBatchAction,
		handleRowAction,
	};
}

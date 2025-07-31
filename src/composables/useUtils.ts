import type { ConfirmHandler } from "@/type/tableAction";
import { ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";

export function useUtils() {
	const i18n = useI18n();

	const systemConfirm: ConfirmHandler = (message, callback, errorHandle) => {
		ElMessageBox.confirm(message, i18n.t("term.systemremind"), {
			confirmButtonText: i18n.t("button.ok"),
			cancelButtonText: i18n.t("button.cancel"),
			showClose: false,
			type: "warning",
		})
			.then(() => {
				callback?.();
			})
			.catch((err) => {
				errorHandle?.(err);
			});
	};

	return {
		systemConfirm,
	};
}

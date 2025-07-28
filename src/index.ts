import type { App } from "vue";
import AdminTablePage from "./table/AdminTablePage.vue";
import i18n from "./locals";

export { AdminTablePage };

const components = [{ name: "AdminTablePage", component: AdminTablePage }];

const install = (app: App) => {
	app.use(i18n);
	components.forEach((item) => {
		app.component(item.name, item.component);
	});
};

export default { install };
export type {
	TableProps,
	TableColumn,
	ColumnSearchConfig,
	ToolButton,
	RowAction,
	PaginatedResult,
} from "./type/table";

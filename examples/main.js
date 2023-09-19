import { createApp } from "vue";
import AdminTablePage from "../src/index";
import "../style/index.scss";
import App from "./App.vue"
import router from "./router";
import "element-plus/theme-chalk/el-message.css";
import "./assets/main.css";


const app = createApp(App);
app.use(AdminTablePage);
app.use(router);

app.mount("#app");

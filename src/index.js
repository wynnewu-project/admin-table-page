import AdminTablePage from "./table/AdminTablePage.vue";


export { AdminTablePage };

const components = [{ name: "AdminTablePage", component: AdminTablePage}];

const install = (App) => {
  components.forEach( item => {
    App.component(item.name, item.component)
  })
}

export default { install };
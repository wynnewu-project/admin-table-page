import AdminTablePage from "./table/AdminTablePage.vue";

export { AdminTablePage };

const components = [AdminTablePage];

const install = (App) => {
  components.forEach( item => {
    App.component(item.__name, item)
  })
}

export default { install };
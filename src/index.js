import ConfigTable from "./table/ConfigTable.vue";

export { ConfigTable };

const components = [ConfigTable];

const install = (App) => {
  components.forEach( item => {
    App.component(item.__name, item)
  })
}

export default { install };
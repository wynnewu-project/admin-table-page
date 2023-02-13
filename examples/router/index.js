import { createRouter, createWebHistory } from "vue-router"; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    name: "home",
    redirect: "/localData",
    children: [{
      path: "/localData",
      component: () => import("../views/LocalData.vue")
    }, {
      path: "/remoteData",
      component: () => import("../views/RemoteData.vue")
    }, {
      path: "/searchFields",
      component: () => import("../views/SearchFields.vue")
    }, {
      path: "/toolButtons",
      component: () => import("../views/ToolButtons.vue")
    }, {
      path: "/manualRefresh",
      component: () => import("../views/ManualRefresh.vue")
    }, {
      path: "/autoRefresh",
      component: () => import("../views/AutoRefresh.vue")
    }, {
      path: "/singleSelect",
      component: () => import("../views/SingleSelect.vue")
    }, {
      path: "/multipleSelect",
      component: () => import("../views/MultipleSelect.vue")
    }, {
      path: "/showIndex",
      component: () => import("../views/ShowIndex.vue")
    }, {
      path: "/actionColumn",
      component: () => import("../views/ActionColumn.vue")
    }, {
      path: "/langSwitch",
      component: () => import("../views/LangSwitch.vue")
    }, {
      path: "/slot",
      component: () => import("../views/SlotConfig.vue")
    }, {
      path: "/tips",
      component: () => import("../views/Tips.vue")
    }]
  }]
})

export default router;
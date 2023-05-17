import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "Test",
    path: "/test",
    meta: {
      title: "Test",
    },    
    component: () => import("@/views/test/index.vue"),
  },
];

export default routes;
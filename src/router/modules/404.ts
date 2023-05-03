import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
];

export default routes;
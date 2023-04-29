import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "Login",
    path: "/login",
    meta: {
      title: "Login",
    },    
    component: () => import("@/views/login/index.vue"),
  },
];

export default routes;

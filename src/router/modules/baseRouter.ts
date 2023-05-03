import type { RouteRecordRaw } from "vue-router";

const baseRouter: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: { name: "Home" },
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "系统首页",
          permiss: "1",
        },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },  
];

export default baseRouter;

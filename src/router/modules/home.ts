import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
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
      {
        path: "/instance",
        name: "Instance",
        meta: {
          title: "实例管理",
          permiss: "3",
        },
        component: () => import("@/views/instance/index.vue"),
      },    
      {
        path: "/user/list",
        name: "UserList",
        meta: {
          title: "用户管理",
          permiss: "4",
        },
        component: () => import("@/views/user/UserList/index.vue"),
      },
      {
        path: "/user/role",
        name: "UserRole",
        meta: {
          title: "角色管理",
          permiss: "5",
        },
        component: () => import("@/views/user/UserRole/index.vue"),
      },
      {
        path: "/user/group",
        name: "UserGroup",
        meta: {
          title: "用户组管理",
          permiss: "6",
        },
        component: () => import("@/views/user/UserGroup/index.vue"),
      },
    ],
  },
];

export default routes;

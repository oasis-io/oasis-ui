import { computed, ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { defineStore } from "pinia";
import { asyncMenu } from "@/api/menu";
import { asyncRouterHandle } from "@/utils/asyncRouter";

const KeepAliveFilter = (routes: any) => {};

const formatRouter = (routes: any, routeMap: any) => {
  // 避免routes为null,使用&&
  routes &&
    routes.forEach((item: any) => {
      item.meta.hidden = item.hidden;
      routeMap[item.name] = item;
      if (item.children && item.children.length > 0) {
        formatRouter(item.children, routeMap);
      }
    });
};

export const useRouterStore = defineStore("router", () => {
  // KeepAlive
  const keepAliveRouters = ref([]);
  const asyncRouters = ref<RouteRecordRaw[]>([]);
  const routeMap = {};
  const asyncRouterCount = ref(0);

  const updateRouterCount = async () => {
    asyncRouterCount.value++;
  };

  const SetAsyncRouter = async () => {
    // 统计调用次数
    updateRouterCount()

    // 基础路由
    const baseRouter: RouteRecordRaw[] = [
      {
        path: "/",
        name: "Layout",
        component: () => import("@/layout/index.vue"),
        meta: {
          title: "layout",
        },
        children: [],
      },
    ];

    // 接受后端返回的数据
    const res = await asyncMenu();
    const asyncRouter = res.data.data.menus;

    formatRouter(asyncRouter, routeMap);

    // 异步路由添加到基础路由中
    baseRouter[0].children = asyncRouter;
    asyncRouterHandle(baseRouter);
    asyncRouters.value = baseRouter;
    return true;
  };

  return {
    asyncRouters,
    asyncRouterCount,
    keepAliveRouters,
    SetAsyncRouter,
    routeMap,
  };
});

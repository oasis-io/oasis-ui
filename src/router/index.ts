import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/user";

const routes: RouteRecordRaw[] = [];

const modules: Record<string, any> = import.meta.glob("./modules/*.ts", {
  eager: true,
});

for (const path in modules) {
  routes.push(...modules[path].default);
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});


export default router;
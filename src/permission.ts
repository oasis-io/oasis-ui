import router from "@/router";
import { useUserStore } from "@/store/user";
import { useRouterStore } from "./store/router";

const getRouter = async (userStore: any) => {
  const routerStore = useRouterStore();
  await routerStore.SetAsyncRouter();
  await userStore.GetUserInfo();
  const asyncRouters = routerStore.asyncRouters;
  asyncRouters.forEach((asyncRouter) => {
    router.addRoute(asyncRouter);
  });
};

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = userStore.token;
  const routerStore = useRouterStore();

  // 检查用户是否已登录, 避免无限重定向
  if (!token && to.name !== "Login") {
    // 将用户重定向到登录页面
    next({ name: "Login" });
  } else {
    if (token) {
      if (routerStore.asyncRouterCount === 0) {
        await getRouter(userStore);
        next(to.path);
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

import { RouteRecordRaw } from "vue-router";

interface MenuItem {
  id: number;
  create_time: string;
  update_time: string;
  parentID: string;
  name: string;
  path: string;
  component: string;
  meta: {
    keepAlive: boolean;
    title: string;
    icon: string;
  };
  hidden: boolean;
  sort: number;
  children: MenuItem[] | null;
}

const viewModules = import.meta.glob("../view/**/*.vue");

export const asyncRouterHandle = (asyncRouter: any) => {
  asyncRouter.forEach((item: any) => {
    if (item.component) {
      if (typeof item.component === "string") {
        if (item.component.split('/')[0] === 'view') {
          item.component = dynamicImport(viewModules, item.component)
        } else {
          delete item["component"];
        } 
      }
    } 
    if (item.children) {
      asyncRouterHandle(item.children);
    }
  });
};

const dynamicImport = (views: any, component: any) => {
  const keys = Object.keys(views);
  const matchKeys = keys.filter((key) => {
    const k = key.replace("../", "");
    return k === component;
  });
  const matchKey = matchKeys[0];
  return views[matchKey];
};

<template>
  <div>
    <transition
      :duration="{ enter: 800, leave: 100 }"
      mode="out-in"
      name="el-fade-in-linear"
    >
      <el-menu
        unique-opened
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="el-menu-cont"
        :default-active="activeIndex"
        :collapse="sidebar.isCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="MenuChange"
      >
          <MenuItem :router-info="routerStore.asyncRouters[0].children" :is-collapse="sidebar.isCollapse" />
      </el-menu>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/store/collapse";
import { useRouterStore } from "@/store/router";
import MenuItem from "./MenuItem.vue";

const activeIndex = ref("0");

// 侧边栏折叠
const sidebar = useSidebarStore();
const routerStore = useRouterStore();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// 关联寻找到菜单栏
const router = useRouter();

// Menu
const menuItems = ref(router.getRoutes());

const MenuChange = (index: string) => {
  router.push({ path: index });
};
</script>

<style lang="scss">
.el-menu-item:hover {
  background-color: #1890ff;
  color: #fff;
}

.el-menu-cont:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

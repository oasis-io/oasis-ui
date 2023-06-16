<template>
  <div>
      <el-menu
        unique-opened
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="el-menu-cont"
        :default-active="activeIndex"
        :collapse="sidebar.isCollapse"
        @select="MenuChange"
      >
          <MenuItem :router-info="routerStore.asyncRouters[0].children" :is-collapse="sidebar.isCollapse" />
      </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/store/collapse";
import { useRouterStore } from "@/store/router";
import MenuItem from "./MenuItem.vue";


// 侧边栏折叠
const sidebar = useSidebarStore();
const routerStore = useRouterStore();
const router = useRouter();


const activeIndex = ref(localStorage.getItem("activeIndex") || "0");


watch(() => router.currentRoute.value, (newRoute) => {
  activeIndex.value = newRoute.path;
  localStorage.setItem("activeIndex", newRoute.path);
});

const MenuChange = (index: string) => {
  router.push({ path: index });
};

</script>

<style lang="scss">
.el-menu-item.is-active {
  background-color: #1890ff;
  color: #fff;
}

.el-menu-cont:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

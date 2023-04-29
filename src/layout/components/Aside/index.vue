<template>
    <div>
      <el-menu unique-opened background-color="#001529" text-color="#fff" active-text-color="#ffd04b" class="el-menu-cont"
        default-active="2" :collapse="sidebar.isCollapse" @open="handleOpen" @close="handleClose" @select="MenuChange">
        <el-menu-item index="1">
          <el-icon><home-filled /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>实例管理</span>
          </template>
          <el-menu-item index="4-1">实例列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <user />
            </el-icon>
            <span>用户中心</span>
          </template>
          <el-menu-item index="5-1">用户管理</el-menu-item>
          <el-menu-item index="5-2">角色管理</el-menu-item>
          <el-menu-item index="5-3">用户组管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {
    HomeFilled,
    Menu as IconMenu,
    User,
    Bicycle,
    Search,
  } from "@element-plus/icons-vue";
  import { useRouter } from "vue-router";
  import { useSidebarStore } from "@/store/collapse";
  
  // 侧边栏折叠
  const sidebar = useSidebarStore();
  
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  
  // 关联寻找到菜单栏
  const router = useRouter();
  const MenuChange = (index: string) => {
    switch (index) {
      case "1":
        router.push({ name: "Home" });
        break;
      case "4-1":
        router.push({ name: "Instance" });
        break;
      case "5-1":
        router.push({ name: "UserList" });
        break;
      case "5-2":
        router.push({ name: "UserRole" });
        break;
      case "5-3":
        router.push({ name: "UserGroup" });
        break;
    }
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
  
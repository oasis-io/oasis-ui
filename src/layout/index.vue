<template>
  <div class="layout-cont">
    <el-container>
      <el-aside class="aside-cont">
        <Aside />
      </el-aside>
      <el-container>
        <el-header class="header-cont">
          <Header />
        </el-header>
        <el-main class="main-cont">
          <router-view>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script setup lang="ts">
import { useRouterStore } from "@/store/router";
import Aside from "./components/Aside/index.vue";
import Header from "./components/Header/index.vue"


const routerStore = useRouterStore()
</script>
  
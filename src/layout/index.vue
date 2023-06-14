<template>
  <div>
    <el-container>
      <el-aside>
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main class="main">
          <transition mode="out-in" name="el-fade-in-linear">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from "./components/Aside/index.vue";
import Header from "./components/Header/index.vue"
</script>

<style lang="scss">
.el-header {
  top: 0;
  position: sticky;
  background-color: #fff;
}

.el-menu-cont {
  height: 100vh;
  border: none;
  border-right-width: 0;
}

.el-aside {
  width: auto;
}

.main {
  height: calc(100vh - 70px);
  overflow-y: auto;
}
</style>
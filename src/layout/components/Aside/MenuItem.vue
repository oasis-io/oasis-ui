<template>
  <div>
    <template v-for="item in routerInfo">
      <el-sub-menu
        :index="item._id"
        v-if="
          item.children &&
          item.children.length > 0 &&
          item.children[0].menuType.toString() === '1'
        "
      >
        <template #title>
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.menuName }}</span>
        </template>
        <MenuItem :router-info="item.children"></MenuItem>
      </el-sub-menu>
      <!-- 判断children里面的路由 -->
      <el-menu-item
        v-else-if="item.menuType.toString() === '1'"
        :index="item.path"
        :key="item._id"
      >
      <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>      
        {{ item.menuName }}
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  routerInfo: {
    default: function () {
      return null;
    },
    type: Object,
  },
  isCollapse: {
    default: function () {
      return false;
    },
    type: Boolean,
  },
});
</script>

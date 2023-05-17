
<template >
  <div>
    <template v-for="item in routerInfo">
      <el-sub-menu :index="item.ID" v-if="item.children &&
        item.children.length > 0
        ">
        <template #title>
          <el-icon v-if="item.meta.icon">
            <component :is="item.meta.icon" />
          </el-icon>
          <span v-if="!isCollapse">{{ item.meta.title }}</span>
        </template>
        <MenuItem :router-info="item.children" :is-collapse="isCollapse"/>
      </el-sub-menu>
      <el-menu-item :index="item.path" v-else>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span v-if="!isCollapse">{{ item.meta.title }}</span> 
      </el-menu-item>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";

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

<template>
<div>
    <div class="clearfix sticky-button">
      <el-input v-model="filterText" class="fitler" placeholder="筛选" />
      <el-button class="fl-right" type="primary" @click="relation">确 定</el-button>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';


const filterText = ref('')


const relation = async() => {
    ElMessage({
      type: 'success',
      message: '菜单设置成功!'
    })
}
</script>

<style lang="scss" scoped>
@import "@/style/button.scss";
.custom-tree-node{
  span+span{
    margin-left: 12px;
  }
}
</style>
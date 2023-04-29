<template>
    <div class="header-main">
        <!-- 折叠按钮 -->
        <div class="collapse-left" @click="collapseChage">
            <el-icon v-if="sidebar.isCollapse" :size="24">
                <Expand />
            </el-icon>
            <el-icon v-else :size="24">
                <Fold />
            </el-icon>
        </div>
        <!-- 下拉弹框 -->
        <div class="dropdown-right">
            <el-avatar :icon="UserFilled" :size="30" />
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link"  style="margin-left: 5px">
                    {{ userStore.userInfo.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <a href="https://github.com/oasis-io/oasis.git" target="_blank">
                            <el-dropdown-item>代码仓库</el-dropdown-item>
                        </a>
                        <el-dropdown-item command="user">个人中心</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
  
  
<script setup lang="ts">
import { ref } from "vue";
import { Fold, Expand, UserFilled, ArrowDown } from "@element-plus/icons-vue";
import { useSidebarStore } from "@/store/collapse";
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

// 侧边栏折叠
const sidebar = useSidebarStore();
const collapseChage = () => {
    sidebar.handleCollapse();
};

const userStore = useUserStore();
const router = useRouter();


const handleCommand = (command: string) => {
	if (command == 'loginout') {
        userStore.LoginOut();
	} else if (command == 'user') {
        ElMessage.info('Welcome !');
	}
};
</script>

<style lang="scss" scoped>
.header-main {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
}

.collapse-left {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    float: left;
    // padding: 0 21px;
    cursor: pointer;
}

.dropdown-right {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    float: right;
    // padding: 0 21px;
    cursor: pointer;
}
</style>
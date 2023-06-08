<template>
    <div class="dashboard-container">
        <div class="header-card">
            <el-card class="content-card" style="height: 100px; background-color: #256D7B;">
                <div class="text-space-between" slot="header">
                    <h2 style="color: #fff;">Welcome to Oasis</h2>
                    <div class="help-and-docs">
                        <div class="help-link">
                            <h3 style="color: #fff;">Help?</h3>
                        </div>
                        <div class="docs-link">
                            <h5><a href="https://github.com/oasis-io/oasis-ui" target="_blank"
                                    style="color: #fff;">Documentation</a></h5>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="status-cards">
            <el-card class="system-status-card" style="background-color: #FFFFFF;">
                <template #header>
                    <div class="card-header" style="color: #256D7B; font-size: 1.25em;">
                        系统信息
                    </div>
                </template>
            </el-card>
            <div class="additional-status-cards">
                <div class="status-card-pair">
                    <el-card class="status-card" style="background-color: #89C4C9;">
                        <div slot="header">
                            <span>运行时间：245d</span>
                        </div>
                    </el-card>
                    <el-card class="status-card" style="background-color: #89C4C9;">
                        <div slot="header">
                            <span>用户数：8</span>
                        </div>
                    </el-card>
                </div>
                <div class="status-card-pair">
                    <el-card class="status-card" style="background-color: #89C4C9;">
                        <div slot="header">
                            <span>实例数：264</span>
                        </div>
                    </el-card>
                    <el-card class="status-card" style="background-color: #89C4C9;">
                        <div slot="header">
                            <span>正在登陆：2</span>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <div class="announcement-section">
            <el-card class="content-card" style="height: 300px; background-color: #B5DEE1;">
                <div slot="header">
                    <h2 style="color: #256D7B;">通知</h2>
                </div>
                <div>
                    <p>这里是你的通知内容。</p>
                </div>
            </el-card>
        </div>
    </div>
</template>




<script setup lang="ts">
import { ElCard } from 'element-plus';
</script>

<style scoped>
.dashboard-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
}

.text-space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.help-and-docs {
    display: flex;
    align-items: center;
}

.help-link {
    margin-right: 20px;
}

.content-card {
    width: 100%;
}

.status-cards {
    display: flex;
    justify-content: space-between;
}

.system-status-card {
    width: 40%;
    height: 293px;
    margin-right: 20px;
}

.additional-status-cards {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 58%;
}

.status-card-pair {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.status-card {
    width: 48%;
    height: 140px;
}
</style>

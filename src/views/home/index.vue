<template>
    <div class="dashboard-container">
        <div class="header-card">
            <el-card class="content-card" style="height: 100px; background-color: #34495E;">
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
            <el-card class="system-status-card" style="background-color: #FFFFFF; box-shadow: 0px 0px 10px rgba(38,109,123,0.1); border-radius: 5px;">
                <template #header>
                    <div class="card-header" style="color: #34495E; font-size: 1.25em;">
                        系统信息
                    </div>
                </template>
            </el-card>
            <div class="additional-status-cards">
                <div class="status-card-pair">
                    <el-card class="status-card" style="background-color: #FFFFFF; box-shadow: 0px 0px 10px rgba(38,109,123,0.1); border-radius: 5px;">
                        <div slot="header">
                            <span style="color: #34495E;">运行时间：245d</span>
                        </div>
                    </el-card>
                    <el-card class="status-card" style="background-color: #FFFFFF; box-shadow: 0px 0px 10px rgba(38,109,123,0.1); border-radius: 5px;">
                        <div slot="header">
                            <span style="color: #34495E;">用户数：8</span>
                        </div>
                    </el-card>
                </div>
                <div class="status-card-pair">
                    <el-card class="status-card" style="background-color: #FFFFFF; box-shadow: 0px 0px 10px rgba(38,109,123,0.1); border-radius: 5px;">
                        <div slot="header">
                            <span style="color: #34495E;">实例数：264</span>
                        </div>
                    </el-card>
                    <el-card class="status-card" style="background-color: #FFFFFF; box-shadow: 0px 0px 10px rgba(38,109,123,0.1); border-radius: 5px;">
                        <div slot="header">
                            <span style="color: #34495E;">正在登陆：2</span>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <div class="announcement-section">
            <el-card class="content-card" style="height: 300px; background-color: #FFFFFF; box-shadow: 0px 0px 10px rgba(38,109,123,0.1); border-radius: 5px;">
                <div slot="header">
                    <h2 style="color: #34495E;">通知</h2>
                </div>
                <div>
                    <p style="color: #34495E;">这里是你的通知内容。</p>
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

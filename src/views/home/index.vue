<template>
    <div>
        <div class="header-card">
            <el-card class="box-card"
                style="height: 100px; background-color: #FFFFFF; box-shadow: 0px 0px 10px rgba(38,109,123,0.1); border-radius: 5px;">
                <div class="box-card-cent">
                    <h2 style="color: #34495E;">Welcome to Oasis</h2>
                </div>

            </el-card>
        </div>

        <div>

        </div>

        <!-- <div class="announcement-section">
            <el-card class="box-card"
                style="height: 300px; background-color: #FFFFFF; box-shadow: 0px 0px 10px rgba(38,109,123,0.1); border-radius: 5px;">
                <div slot="header">
                    <h2 style="color: #34495E;">通知</h2>
                </div>
                <div>
                    <p style="color: #34495E;">这里是你的通知内容。</p>
                </div>
            </el-card>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus';
</script>

<style lang="scss" scoped>
.box-card {
    width: 100%;
}
</style>

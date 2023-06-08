<template>
    <div class="container">
        <el-card class="box-card" style="height: 100px; margin-bottom: 20px; background-color: #E0E7FF;">
            <div class="text-center" slot="header">
                <h2>Welcome to Oasis</h2>
            </div>
        </el-card>
        <el-card class="box-card" style="height: 300px; margin-bottom: 20px; background-color: #F0F4C3;">
            <div slot="header">
                <span>Card 2</span>
            </div>
        </el-card>
        <div class="bottom-cards">
            <el-card class="box-card" style="height: 400px; margin-right: 10px; background-color: #D1C4E9;">
                <div slot="header">
                    <span>Card 3</span>
                </div>
            </el-card>
            <el-card class="box-card" style="height: 400px; background-color: #FFE0B2;">
                <div slot="header">
                    <span>Card 4</span>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus';
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.bottom-cards {
    display: flex;
    justify-content: space-between;
}

.box-card {
    width: 100%;
}

.text-center {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>

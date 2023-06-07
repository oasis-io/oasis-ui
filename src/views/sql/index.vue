<template>
    <div>
        <el-button icon="CaretRight" type="primary" text @click.prevent="runCode">执行</el-button>
        <el-button icon="CaretLeft" type="primary" text @click.prevent="stopCode">停止</el-button>
        <el-button icon="MagicStick" type="primary" text @click.prevent="formatCode">美化SQL</el-button>
        <!-- <MonacoEditor ref="monacoEditorRef" /> -->
        <div :style="{ height: editorHeight + 'px', overflow: 'hidden' }">
            <MonacoEditor ref="monacoEditorRef" />
        </div>        
        <div class="sql-table-box" v-if="showTable">
            <el-table :data="tableData" border style="width: 100%" height="400">
                <el-table-column v-for="(item, index) in columns" :key="index" :prop="item" :label="item" align="left"
                    show-overflow-tooltip :min-width="120"/>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import MonacoEditor from '@/components/MonacoEditor.vue';
import { ElMessage } from 'element-plus';
import { myQuery } from '@/api/sql';


const columns = reactive<string[]>([]);
const tableData = ref([]);
const showTable = computed(() => tableData.value.length > 0);  // 显示表格的条件可以计算而得


let monacoEditorRef = ref();


// 定义编辑器的高度，初始为400，查询完成后设置为0
let editorHeight = ref(400);

const formatCode = async () => {
    if (monacoEditorRef.value) {
        monacoEditorRef.value.formatCode();
    }
};

const runCode = async () => {
    const code = monacoEditorRef.value?.getValue();
    if (code && code.trim() !== '') {
        try {
            const res = await myQuery(code);
            if (res.data.code === 1000) {
                tableData.value = res.data.data;
                columns.length = 0;  // 清空当前的列
                if (tableData.value.length > 0) {
                    for (let key in tableData.value[0]) {
                        columns.push(key);
                    }
                }
                // 查询完成后收缩编辑器
                editorHeight.value = 0;
            } else {
                ElMessage.error('执行失败');
            }
        } catch (err) {
            ElMessage.error('查询出错');
        }
    } else {
        ElMessage.success('编辑器无内容');
    }
}
// const runCode = async () => {
//     const code = monacoEditorRef.value?.getValue();
//     if (code && code.trim() !== '') {
//         try {
//             const res = await myQuery(code);
//             if (res.data.code === 1000) {
//                 tableData.value = res.data.data;
//                 columns.length = 0;  // 清空当前的列
//                 if (tableData.value.length > 0) {
//                     for (let key in tableData.value[0]) {
//                         columns.push(key);
//                     }
//                 }
//             } else {
//                 ElMessage.error('执行失败');
//             }
//         } catch (err) {
//             ElMessage.error('查询出错');
//         }
//     } else {
//         ElMessage.success('编辑器无内容');
//     }
// }

const stopCode = async () => {
    // 停止代码执行时恢复编辑器高度
    editorHeight.value = 400;
}
</script>

<style lang="scss">
.sql-table-box {
    padding: 24px;
    background-color: #fff;
    border-radius: 2px;
    margin-top: 5px;
}
</style>
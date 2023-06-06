<template>
    <div>
        <el-button icon="CaretRight" type="primary" text @click.prevent="runCode">执行</el-button>
        <el-button icon="MagicStick" type="primary" text @click.prevent="formatCode">美化SQL</el-button>
        <MonacoEditor ref="monacoEditorRef" />
        <div class="table-box">
            <el-table :data="tableData" border style="width: 100%" v-if="showTable">
                <el-table-column v-for="(item, index) in columns" :key="index" :prop="item" :label="item" width="180" />
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
</script>

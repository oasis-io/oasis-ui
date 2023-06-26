<template>
    <div class="table-box">
        <div>
            <el-form ref="sqlFormRef" :model="sqlForm" status-icon :rules="rules" class="demo-ruleForm">
                <el-row :gutter="10" justify="start" align="middle">
                    <el-col :span="4">
                        <div>
                            <el-form-item prop="instance">
                                <el-select v-model="sqlForm.instance" remote-show-suffix reserve-keyword filterable remote
                                    :loading="loading" @focus="getInstanceData" :remote-method="remoteMethod" clearable
                                    placeholder="实例">
                                    <el-option v-for="item in optionInstance" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div>
                            <el-form-item prop="database">
                                <el-select v-model="sqlForm.database" clearable placeholder="数据库">
                                    <el-option v-for="item in optionDatabase" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item>
                            <el-space>
                                <el-button :icon="CaretRight" type="success" text @click="runCode">运行</el-button>
                                <el-button :icon="CaretLeft" type="danger" text @click="stopCode">停止</el-button>
                                <el-button :icon="MagicStick" type="primary" text @click="formatCode">美化SQL</el-button>
                            </el-space>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <AceEditor ref="editorRef" class="editor-border" style="height: 400px; width: 100%" />
                </el-form-item>
            </el-form>
        </div>
        <div v-if="showTable" class="editor-border">
            <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="Info" name="info">信息</el-tab-pane>
                <el-tab-pane label="Result" name="result">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column v-for="(item, index) in columns" :key="index" :prop="item" :label="item"
                            align="left" show-overflow-tooltip :min-width="120" />
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>



<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import AceEditor from "@/components/AceEditor.vue";
import { CaretRight, CaretLeft, MagicStick } from '@element-plus/icons-vue'
import { myQuery } from '@/api/sql';
import { getInstanceName, getInstanceDatabase } from '@/api/instance'
import type { TabsPaneContext } from 'element-plus'


const optionInstance = ref<any[]>([]);
const optionDatabase = ref<any[]>([]);;

const sqlForm = reactive({
    instance: "",
    database: "",
});

const rules = reactive({})

const loading = ref(false)
const columns = reactive<string[]>([]);
const tableData = ref([]);
const showTable = computed(() => tableData.value.length > 0);  // 显示表格的条件可以计算而得

const editorRef = ref();

// 定义编辑器的高度，初始为400，查询完成后设置为0
let editorHeight = ref(400);

// 标签页
const activeName = ref('result')


const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}


// 表单数据
const form = reactive({
    sql: '', // SQL字段
});



const getInstanceData = async () => {
    const res = await getInstanceName()
    if (res.data.code === 1000) {
        optionInstance.value = res.data.data.map((item: any) => ({ label: item.name, value: item.name }));
    }
}


watch(form, (newForm) => {
    editorRef.value.setEditorValue(newForm.sql);
});


interface RowData {
    [key: string]: any;  
}

// 按照columnsOrder 字段顺序展示数据
const reorderColumns = (row: RowData, columnsOrder: string[]): RowData => {
    const newRow: RowData = {};
    columnsOrder.forEach(column => {
        newRow[column] = row[column];
    });
    return newRow;
};


const runCode = async (data: any) => {
    // 检查是否选择了 instance
    if (!sqlForm.instance) {
        ElMessage.error('请先选择一个实例');
        return;
    }

    const code = editorRef.value.getValue()?.trim();
    if (!code) {
        ElMessage.success('编辑器无内容');
        return;
    }
    if (code) {

        const data = {
            sql: code,
            instance: sqlForm.instance,
            database: sqlForm.database
        };

        const res = await myQuery(data);
        if (res.data.code === 1000) {
            const columnsOrder = res.data.data.columns;
            tableData.value = res.data.data.data.map((row: RowData) => reorderColumns(row, columnsOrder));  // 调整每一行的列顺序
            columns.length = 0;  // 清空当前的列
            if (tableData.value.length > 0) {
                for (let key in tableData.value[0]) {
                    columns.push(key);
                }
            }
            // 查询完成后收缩编辑器
            editorHeight.value = 0
        }
    }
};


const stopCode = () => {
    // 在这里执行你的停止SQL的逻辑
    console.log('Stopping SQL');
};

const formatCode = () => {
    editorRef.value.formatCode();
};


const remoteMethod = (query: string) => {
}

watch(() => sqlForm.instance, async (newInstance) => {
    if (newInstance) {
        await getInstanceInfo(newInstance);
    }
});

const getInstanceInfo = async (data: string) => {
    console.log(data)
    const instance = {
        name: data
    };

    const res = await getInstanceDatabase(instance)
    if (res.data.code === 1000) {
        optionDatabase.value = res.data.data.map((item: any) => ({ label: item, value: item }));
    }
}

</script>

<style scoped>
.editor-border {
    border-width: 1px 2px;
    border-style: solid;
    border-color: #f0f0f0;
}
</style>
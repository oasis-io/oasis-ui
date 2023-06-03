<template>
    <div>
        <div class="clearfix sticky-button">
            <el-input v-model="filterText" class="fitler" placeholder="search" />
            <el-button class="fl-right" type="primary" @click="submit">确 定</el-button>
        </div>

        <div class="tree-content">
            <el-tree ref="treeRef" highlight-current default-expand-all show-checkbox :props="apiProps" :data="apiData"
                @check-change="handleCheckChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { getBaseMenuApi } from "@/api/menu";

const props = defineProps({
    row: {
        default: function () {
            return {};
        },
        type: Object,
    },
});


interface ApiItem {
    id: number;
    create_time: string;
    update_time: string;
    group: string;
    desc: string;
    path: string;
    method: string;
    onlyId?: string;
}

interface ApiGroup {
    ID: string;
    desc: string;
    children: ApiItem[];
}

// interface ApiGroup {
//     group: string;
//     children: ApiItem[];
// }

const treeRef = ref<ApiGroup | null>(null);
const filterText = ref("");
const apiData = ref<ApiGroup[]>([]);
const apiProps = ref({
    children: 'children',
    label: 'desc'
})

const init = async () => {
    // 获得菜单数据
    const res = await getBaseMenuApi();
    const apis: ApiItem[] = res.data.data.apis;
    apiData.value = buildApiTree(apis);
};

init();

const buildApiTree = (apis: ApiItem[]): ApiGroup[] => {
    let groupMap: Record<string, ApiItem[]> = {};

    // 分组APIs
    for (let api of apis) {
        api.onlyId = 'p:' + api.path + 'm:' + api.method;
        if (!groupMap[api.group]) {
            groupMap[api.group] = [];
        }
        groupMap[api.group].push(api);
    }

    // 构造API树
    let apiTree: ApiGroup[] = [];
    for (let group in groupMap) {
        const treeNode = {
            ID: group,
            desc: group + '组',
            children: groupMap[group],
        };
        apiTree.push(treeNode);
    }

    return apiTree;
};

const handleCheckChange = async () => { };

const submit = async () => {
    ElMessage({
        type: "success",
        message: "Api设置成功!",
    });
};
</script>

<style lang="scss" scoped>
@import "@/style/button.scss";
</style>

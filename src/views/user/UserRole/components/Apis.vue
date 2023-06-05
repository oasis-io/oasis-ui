<template>
  <div>
    <div class="clearfix sticky-button">
      <el-input v-model="filterText" class="fitler" placeholder="search" />
      <el-button class="fl-right" type="primary" @click="submit">确 定</el-button>
    </div>

    <div class="tree-content">
      <el-tree
        ref="treeRef"
        highlight-current
        default-expand-all
        show-checkbox
        :default-checked-keys="defaultApiKey"
        :props="apiProps"
        :data="apiData"
        @check-change="handleCheckChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { getBaseMenuApi, AddApiPermissions, getMenuApiAuthorized } from "@/api/menu";

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

// const treeRef = ref<ApiGroup | null>(null);
const treeRef = ref<any | null>(null);
const filterText = ref("");
const apiData = ref<ApiGroup[]>([]);
const defaultApiKey = ref([]);
const apiProps = ref({
  children: "children",
  label: "desc",
});

const init = async () => {
  // 获得菜单数据
  const res = await getBaseMenuApi();
  const apis: ApiItem[] = res.data.data.apis;
  apiData.value = buildApiTree(apis);
  const resAuthorized = await getMenuApiAuthorized({ name: props.row.name });
  const apiAuthorized = resAuthorized.data.data.apis;
  defaultApiKey.value = apiAuthorized
};

init();


const buildApiTree = (apis: ApiItem[]): ApiGroup[] => {
  let groupMap: Record<string, ApiItem[]> = {};

  // 分组APIs
  for (let api of apis) {
    api.onlyId = "p:" + api.path + "m:" + api.method;
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
      desc: group + "组",
      children: groupMap[group],
    };
    apiTree.push(treeNode);
  }

  return apiTree;
};

const handleCheckChange = async () => {};

interface Casbin {
  path: string;
  method: string;
}

const submit = async () => {
  const checkedKeys = treeRef.value.getCheckedNodes();
  const roleName = props.row.name;

  const filteredKeys: Casbin[] = checkedKeys.map((api: { path: any; method: any }) => ({
    path: api.path,
    method: api.method,
  }));

  try {
    const res = await AddApiPermissions({
      name: roleName,
      apis: filteredKeys,
    });
    if (res.data.code === 1000) {
      ElMessage({
        type: "success",
        message: "API授权成功!",
      });
    } else {
      ElMessage({
        type: "error",
        message: "API授权失败!",
      });
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: "API授权失败!",
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/button.scss";
</style>

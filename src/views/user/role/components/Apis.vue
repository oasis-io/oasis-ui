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
        node-key="onlyId"
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

const treeRef = ref<any | null>(null);
const filterText = ref("");
const apiData = ref<ApiGroup[]>([]);
const defaultApiKey = ref<string[]>([]);
const apiProps = ref({
  children: "children",
  label: "desc",
});

const init = async () => {
  // 获取菜单数据
  const res = await getBaseMenuApi();
  const apis  = res.data.data;
  apiData.value = apis;

  // 获取已经授权的API
  const resAuthorized = await getMenuApiAuthorized({ name: props.row.name });
  const apiAuthorized  = resAuthorized.data.data;

  // 将已授权的API数据转化为onlyId的数组
  defaultApiKey.value = apiAuthorized.flatMap((group: { children: any[]; }) => group.children.map(child => child.onlyId));
};


init();


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

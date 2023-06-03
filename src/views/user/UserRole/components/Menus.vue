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
        node-key="id"
        :default-checked-keys="defaultMenuKey"
        :props="menuProps"
        :data="menuData"
        @check-change="handleCheckChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { getBaseMenuTree, AddMenuPermissions, getMenuAuthorized } from "@/api/menu";

const props = defineProps({
  row: {
    default: function () {
      return {};
    },
    type: Object,
  },
});

const treeRef = ref<any | null>(null);
const filterText = ref("");
const menuData = ref([]);
const defaultMenuKey = ref([]);
const menuProps = ref({
  children: "children",
  label: function (data: any) {
    return data.meta.title;
  },
});

const init = async () => {
  // 获得菜单数据
  const resTree = await getBaseMenuTree();
  menuData.value = resTree.data.data.menus;
  const resAuthorized = await getMenuAuthorized({ name: props.row.name });
  const menus = resAuthorized.data.data.menus;
  defaultMenuKey.value = menus.map((menu: { id: any; }) => menu.id)
};


init();

const handleCheckChange = async () => {};

const submit = async () => {
  const checkedKeys = treeRef.value.getCheckedNodes();
  const roleName = props.row.name;

  try {
    const res = await AddMenuPermissions({
      name: roleName,
      menus: checkedKeys,
    });
    if (res.data.code === 1000) {
      ElMessage({
        type: "success",
        message: "角色授权成功!",
      });
    } else {
      ElMessage({
        type: "error",
        message: "角色授权失败!",
      });
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: "角色授权失败!",
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/button.scss";

.custom-tree-node {
  span + span {
    margin-left: 12px;
  }
}
</style>

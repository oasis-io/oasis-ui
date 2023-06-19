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
import { getBaseMenuTree, UpdateMenuPermissions, getMenuAuthorized } from "@/api/menu";

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
const defaultMenuKey = ref<any[]>([]);
const menuProps = ref({
  children: "children",
  label: function (data: any) {
    return data.meta.title;
  },
});

// Tree组件在父节点被选中，那么它的所有子节点也会被选中
// 这里过滤下，防止全选
const filterAuthorizedMenus = (menus: any) => {
  const ids: any[] = [];

  const traverse = (menus: any) => {
    menus.forEach((menu: any) => {
      if (menu.parentID !== "0" || (menu.parentID === "0" && menu.children === null)) {
        ids.push(Number(menu.id));
      }

      // 如果菜单有子菜单，递归地访问这些子菜单
      if (menu.children) {
        traverse(menu.children);
      }
    });
  };

  traverse(menus);

  return ids;
};



const init = async () => {
  // 获得菜单数据
  const resTree = await getBaseMenuTree();
  menuData.value = resTree.data.data.menus;
  const resAuthorized = await getMenuAuthorized({ name: props.row.name });
  const menus = resAuthorized.data.data.menus;
  defaultMenuKey.value = filterAuthorizedMenus(menus)
};


init();


const handleCheckChange = async () => {
  
};

const submit = async () => {
  const checkedKeys = treeRef.value.getCheckedKeys().concat(treeRef.value.getHalfCheckedKeys())
  const roleName = props.row.name;

  try {
    const res = await UpdateMenuPermissions({
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

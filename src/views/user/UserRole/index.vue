<template>
  <div class="authority">
    <div class="table-box">
      <div class="button-left">
        <el-button type="primary" icon="plus" @click.prevent="addRole">新增角色</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="left" prop="name" label="角色名" width="180" />
        <el-table-column align="left" prop="desc" label="描述" width="380" />
        <el-table-column align="left" label="操作" width="358">
          <template #default="scope">
            <el-button icon="setting" type="primary" link @click.prevent="editRow(scope.row)">设置权限</el-button>
            <el-button icon="delete" type="primary" link @click.prevent="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
          :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
          :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
      <el-dialog v-model="addDialog" title="创建角色" width="40%">
        <div>
          <el-form ref="addFormRef" :model="addForm" status-icon :rules="rules" label-width="120px"
            style="max-width: 380px" class="demo-ruleForm">
            <el-form-item label="角色名" prop="name">
              <el-input v-model="addForm.name" maxlength="30" show-word-limit placeholder="请输入角色名" />
            </el-form-item>
            <el-form-item label="角色描述" prop="desc">
              <el-input v-model="addForm.desc" maxlength="50" :rows="5" type="textarea" show-word-limit
                placeholder="请输入角色描述" />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelForm">关闭</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </span>
        </template>
      </el-dialog>
      <el-drawer v-if="drawer" v-model="drawer" custom-class="auth-drawer" :with-header="false" size="40%" title="角色配置">
        <el-tabs :before-leave="autoEnter" type="border-card">
          <el-tab-pane label="菜单权限">
            <Menus ref="menus" :row="activeRow" @changeRow="changeRow" />
          </el-tab-pane>
          <el-tab-pane label="API权限">
            <Apis ref="apis" :row="activeRow" @changeRow="changeRow" />
          </el-tab-pane>
        </el-tabs>
      </el-drawer>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { getRoleList, createRole, updateRole, deleteRole, Role } from "@/api/user"

import Menus from './components/Menus.vue'
import Apis from './components/Apis.vue'

const total = ref(0)
const currentPage = ref(1);
const pageSize = ref(10);
const tableData = ref([]);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const addFormRef = ref();
const editFormRef = ref();

const addDialog = ref(false);
const editDialog = ref(false);

const drawer = ref(false)


interface User {
  name: string,
  age: number,
  // 其他属性
}

const activeRow = ref<User>({ name: '', age: 0 });

const rules = reactive({
  name: [{ required: true, trigger: 'blur' }],
});

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getTableData();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getTableData();
};

const getTableData = async () => {
  const table = await getRoleList({ pageSize: pageSize.value, currentPage: currentPage.value });
  if ((table.data.code === 1000)) {
    tableData.value = table.data.data.data;
    total.value = table.data.data.total;
    pageSize.value = table.data.data.pageSize;
    currentPage.value = table.data.data.currentPage;
  }
};

getTableData()


const autoEnter = () => {

}

const changeRow = (key: string, value: any) => {
  (activeRow.value as Record<string, any>)[key] = value;
};

const menus = ref(null)
const apis = ref(null)

// 增删改查
const deleteRow = async (row: Role) => {
  ElMessageBox.confirm(
    '此操作将永久删除该角色, 是否继续?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      const res = await deleteRole({ name: row.name });
      if (res.data.code === 1000) {
        ElMessage({
          type: 'success',
          message: '角色删除成功',
        })
        await getTableData();
      } else {
        ElMessage({
          type: 'error',
          message: '角色删除失败',
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除角色',
      })
    })
};

const addRole = () => {
  addDialog.value = true
}

const editRow = async (row: any) => {
  drawer.value = true
  activeRow.value = row
}


const addForm = reactive({
  name: '',
  desc: '',
});


const editForm = reactive({
  name: '',
  desc: '',
})


const cancelForm = async () => {
  addFormRef.value.resetFields();
  addDialog.value = false;
};


const submitForm = async () => {
  addFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await createRole(addForm);
      if (res.data.code === 1000) {
        ElMessage({ type: 'success', message: '角色创建成功' });
        await getTableData();
        cancelForm();
      } else {
        ElMessage({ type: 'error', message: '角色创建失败' })
      }
      addDialog.value = false;
    }
  });
};


const cancelEdit = async () => {
  editFormRef.value.resetFields()
  editDialog.value = false;
}


const submitEdit = async () => {
  editFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await updateRole(editForm);
      if (res.status === 200) {
        ElMessage({ type: 'success', message: '用户修改成功' });
        await getTableData();
        cancelEdit();
      }
      editDialog.value = false;
    }
  });
}

</script>
  

<style lang="scss">
.authority {
  .el-input-number {
    margin-left: 15px;

    span {
      display: none;
    }
  }
}

.tree-content {
  margin-top: 10px;
  height: calc(100vh - 148px);
  overflow: auto;
}
</style>
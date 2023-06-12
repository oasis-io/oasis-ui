<template>
  <div class="table-box">
    <div class="button-left">
      <el-button type="primary" icon="plus" @click.prevent="addUserGroup">新增用户组</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="left" prop="name" label="用户组名" min-width="150" />
      <el-table-column align="left" prop="desc" label="描述" min-width="180" />
      <el-table-column align="left" label="操作" min-width="200">
        <template #default="scope">
          <el-button icon="edit" type="primary" link @click.prevent="editRow(scope.row)">
            编辑
          </el-button>
          <el-button icon="delete" type="primary" link @click.prevent="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <div>
      <el-dialog v-model="addDialog" title="创建用户组" width="40%">
        <div>
          <el-form ref="addFormRef" :model="addForm" status-icon :rules="rules" label-width="120px"
            style="max-width: 380px" class="demo-ruleForm">
            <el-form-item label="用户组名" prop="name">
              <el-input v-model="addForm.name" maxlength="30" show-word-limit placeholder="请输入用户组" />
            </el-form-item>
            <el-form-item label="用户组描述" prop="desc">
              <el-input v-model="addForm.desc" maxlength="50" :rows="5" type="textarea" show-word-limit
                placeholder="请输入用户组描述" />
            </el-form-item>
            <el-form-item label="绑定用户" prop="users">
              <el-select v-model="addForm.users" multiple clearable style="width: 100%" placeholder="请选择用户">
                <el-option v-for="item in optionUsers" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="绑定角色" prop="roles">
              <el-select v-model="addForm.roles" multiple clearable style="width: 100%" placeholder="请选择角色">
                <el-option v-for="item in optionRoles" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
    </div>
    <div>
      <el-dialog v-model="editDialog" title="编辑用户组" width="40%">
        <div>
          <el-form ref="editFormRef" :model="editForm" status-icon :rules="rules" label-width="120px"
            style="max-width: 380px" class="demo-ruleForm">
            <el-form-item label="用户组名" prop="name">
              <el-input v-model="editForm.name" maxlength="30" show-word-limit placeholder="请输入用户组" />
            </el-form-item>
            <el-form-item label="用户组描述" prop="desc">
              <el-input v-model="editForm.desc" maxlength="50" :rows="5" type="textarea" show-word-limit
                placeholder="请输入用户组描述" />
            </el-form-item>
            <el-form-item label="绑定用户" prop="users">
              <el-select v-model="editForm.users" multiple clearable style="width: 100%" placeholder="请选择用户">
                <el-option v-for="item in optionUsers" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="绑定角色" prop="roles">
              <el-select v-model="editForm.roles" multiple clearable style="width: 100%" placeholder="请选择角色">
                <el-option v-for="item in optionRoles" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelEditForm">关闭</el-button>
            <el-button type="primary" @click="submitEditForm">提交</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

  </div>
</template>
  
<script lang="ts" setup>
import { UserGroup, createGroup, deleteGroup, getGroupList, getRoles, getUserGroup, getUsers, updateGroup } from '@/api/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue';

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

interface Option {
  label: string;
  value: string;
}

const optionRoles = ref<Option[]>([]);
const optionUsers = ref<Option[]>([]);

const addForm = reactive({
  name: '',
  desc: '',
  users: [],
  roles: [],
});

const editForm = reactive({
  id: 0,
  name: '',
  desc: '',
  users: [],
  roles: [],
});

const addUserGroup = async () => {
  addDialog.value = true
  const res1 = await getUsers();
  if (res1.data.code === 1000) {
    // 将数组转换为{label: '用户名称', value: '用户名称'}
    optionUsers.value = res1.data.data.data.map((users: any) => ({ label: users, value: users }));
  }
  const res = await getRoles();
  if (res.data.code === 1000) {
    // 将数组转换为{label: '角色名称', value: '角色名称'}
    optionRoles.value = res.data.data.data.map((roles: any) => ({ label: roles, value: roles }));
  }
}


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
  const table = await getGroupList({ pageSize: pageSize.value, currentPage: currentPage.value });
  if ((table.data.code === 1000)) {
    tableData.value = table.data.data.data;
    total.value = table.data.data.total;
    pageSize.value = table.data.data.pageSize;
    currentPage.value = table.data.data.currentPage;
  }
};

getTableData()

const editRow = async (row: UserGroup) => {
  editDialog.value = true;
  const res = await getUserGroup({ name: row.name });
  if (res.data.code === 1000) {
    editForm.id = res.data.data.data[0].id;
    editForm.name = res.data.data.data[0].name;
    editForm.desc = res.data.data.data[0].desc;
    editForm.users = res.data.data.data[0].users.map((user: any) => user.username);
    editForm.roles = res.data.data.data[0].roles.map((role: any) => role.name);
  }
  const users = await getUsers();
  if (users.data.code === 1000) {
    // 将数组转换为{label: '用户名称', value: '用户名称'}
    optionUsers.value = users.data.data.data.map((users: any) => ({ label: users, value: users }));
  }
  
  const roles = await getRoles();
  if (roles.data.code === 1000) {
    // 将数组转换为{label: '角色名称', value: '角色名称'}
    optionRoles.value = roles.data.data.data.map((roles: any) => ({ label: roles, value: roles }));
  }
}

const deleteRow = async (row: UserGroup) => {
  ElMessageBox.confirm(
    '此操作将永久删除该用户组, 是否继续?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      const res = await deleteGroup({ name: row.name });
      if (res.data.code === 1000) {
        ElMessage({
          type: 'success',
          message: '用户组删除成功',
        })
        await getTableData();
      } else {
        ElMessage({
          type: 'error',
          message: '用户组删除失败',
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除用户组',
      })
    })
};

const cancelForm = async () => {
  addFormRef.value.resetFields();
  addDialog.value = false;
};


const submitForm = async () => {
  addFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await createGroup(addForm);
      if (res.data.code === 1000) {
        ElMessage({ type: 'success', message: '用户组创建成功' });
        await getTableData();
        cancelForm();
      } else {
        ElMessage({ type: 'error', message: '用户组创建失败' })
      }
      addDialog.value = false;
    }
  });
};


const cancelEditForm = async () => {
  editFormRef.value.resetFields();
  editDialog.value = false;
}


const submitEditForm = async () => {
  editFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await updateGroup(editForm);
      if (res.data.code === 1000) {
        ElMessage({ type: 'success', message: '用户组更新成功' });
        await getTableData();
        cancelForm();
      } else {
        ElMessage({ type: 'error', message: '用户组更新失败' })
      }
      editDialog.value = false;
    }
  });
}
</script>
  
<template>
    <div class="table-box">
      <div class="button-left">
        <el-button type="primary" icon="plus" @click="addUser">新增角色</el-button>
      </div>  
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="left" prop="name" label="角色名" width="180" />
      <el-table-column align="left" label="操作" width="180">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="editRow(scope.row)">
              编辑
            </el-button>
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.row)">
              删除
            </el-button>   
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
          <el-form ref="addFormRef" :model="addForm" status-icon :rules="rules" label-width="120px" style="max-width: 380px"
            class="demo-ruleForm">
            <el-form-item label="角色名" prop="name">
              <el-input v-model="addForm.name" maxlength="30" show-word-limit placeholder="请输入用户名" />
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
      <el-dialog v-model="editDialog" title="修改角色" width="40%">
        <div>
          <el-form ref="editFormRef" :model="editForm" status-icon :rules="rules" label-width="120px"
            style="max-width: 380px" class="demo-ruleForm">
            <el-form-item label="角色名" prop="name">
              <el-input v-model="editForm.name" disabled maxlength="50" show-word-limit placeholder="请输入用户名" />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelEdit">关闭</el-button>
            <el-button type="primary" @click="submitEdit">提交</el-button>
          </span>
        </template>
      </el-dialog>    
  </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive } from "vue";
  import { ElMessage } from 'element-plus';
  import { getRoleList,createRole,updateRole,deleteRole,User, Role } from "@/api/user"
  
  
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
  
  const initPage = async () => {
    getTableData();
  };
  
  initPage();
  
  // 增删改查
  const deleteRow = async (row: Role) => {
    const res = await deleteRole({ name: row.name });
    if (res.data.code === 1000) {
      ElMessage.success('删除成功');
      await getTableData();
    } else {
        ElMessage({ type: 'error', message: '角色删除失败'})
    }
  };
  
  const addUser = () => {
    addDialog.value = true
  }
  
  const editRow = async (row: User) => {
    editDialog.value = true
  
    // const res = await getUser({ username: row.username });
    // if (res.status === 200) {
    //   editForm.name = res.data.data[0].name;
    //   editForm.db_type = res.data.data[0].db_type;
    //   editForm.host = res.data.data[0].host;
    //   editForm.port = res.data.data[0].port;
    //   editForm.user = res.data.data[0].user;
    //   editForm.password = res.data.data[0].password;
    // }
  }
  
  
  const addForm = reactive({
    name: '',
  });
  
  
  const editForm = reactive({
    name: '',
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
            ElMessage({ type: 'error', message: '角色创建失败'})
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
  
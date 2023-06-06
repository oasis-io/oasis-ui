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
                    <el-button icon="delete" type="primary" link @click.prevent="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
          :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
          :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>        
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
</template>
  
<script lang="ts" setup>
import { UserGroup, createGroup, deleteGroup, getGroupList } from '@/api/user';
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
const addDialog = ref(false);


const addForm = reactive({
  name: '',
  desc: '',
});

const addUserGroup = () => {
  addDialog.value = true
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


</script>
  
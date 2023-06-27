<template>
      <div class="table-box">
        <div class="button-left">
          <el-button type="primary" icon="plus" @click="addIns">新增实例</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="left" prop="name" label="实例名" min-width="120" />
          <el-table-column align="left" prop="db_type" label="数据库类型" min-width="120" />
          <el-table-column align="left" prop="host" label="数据库地址" min-width="120" />
          <el-table-column align="left" prop="port" label="数据库端口" min-width="120" />
          <el-table-column align="left" prop="user" label="连接用户" min-width="120" />
          <el-table-column align="left" label="操作" min-width="180" fixed="right">
            <template #default="scope">
              <el-button icon="Connection" type="primary" link @click.prevent="pingRow(scope.row)">
                连接测试
              </el-button>
              <el-dropdown>
                <el-button  type="primary" text >更多 <el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item divided>
                      <el-button icon="edit" type="primary" link @click.prevent="editRow(scope.row)">
                        编辑
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                      <el-button icon="delete" type="primary" link @click.prevent="deleteRow(scope.row)">
                        删除
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                      <el-button icon="Lock" type="primary" link @click.prevent="passwordRow(scope.row)">
                        修改密码
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
            :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <el-dialog v-model="addInsDialog" title="创建实例" style="max-width: 500px">
          <div>
            <el-form ref="insFormRef" :model="insForm" status-icon :rules="rules" label-width="120px"
              style="max-width: 380px" class="demo-ruleForm">
              <el-form-item label="实例名" prop="name">
                <el-input v-model="insForm.name" maxlength="30" show-word-limit placeholder="请输入实例名" />
              </el-form-item>
              <el-form-item label="数据库类型" prop="db_type">
                <el-select v-model="insForm.db_type" placeholder="数据库类型" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="数据库地址" prop="host">
                <el-input v-model="insForm.host" placeholder="请输入数据库地址" />
              </el-form-item>
              <el-form-item label="数据库端口" prop="port">
                <el-input v-model="insForm.port" placeholder="请输入数据库端口" />
              </el-form-item>
              <el-form-item label="数据库用户" prop="user">
                <el-input v-model="insForm.user" placeholder="请输入连接用户" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="insForm.password" placeholder="请输入密码" autocomplete="off" type="password"
                  show-password />
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="insForm.checkPass" placeholder="请再次输入密码" autocomplete="off" type="password"
                  show-password />
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
        <el-dialog v-model="editInsDialog" title="修改实例" style="max-width: 500px">
          <div>
            <el-form ref="editFormRef" :model="editForm" status-icon :rules="rules" label-width="120px"
              style="max-width: 380px" class="demo-ruleForm">
              <el-form-item label="实例名" prop="name">
                <el-input v-model="editForm.name" disabled maxlength="50" show-word-limit placeholder="请输入实例名" />
              </el-form-item>
              <el-form-item label="数据库类型" prop="db_type">
                <el-input v-model="editForm.db_type" disabled placeholder="请输入数据库类型" />
              </el-form-item>
              <el-form-item label="数据库地址" prop="host">
                <el-input v-model="editForm.host" placeholder="请输入数据库地址" />
              </el-form-item>
              <el-form-item label="数据库端口" prop="port">
                <el-input v-model="editForm.port" placeholder="请输入数据库端口" />
              </el-form-item>
              <el-form-item label="数据库用户" prop="user">
                <el-input v-model="editForm.user" placeholder="请输入连接用户" />
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
        <el-dialog v-model="passDialog" title="修改密码" style="max-width: 500px">
          <div>
            <el-form ref="passFormRef" :model="passForm" status-icon :rules="passRules" label-width="120px"
              style="max-width: 380px" class="demo-ruleForm">
              <el-form-item label="密码" prop="password">
                <el-input v-model="passForm.password" placeholder="请输入密码" autocomplete="off" type="password"
                  show-password />
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="passForm.checkPass" placeholder="请再次输入密码" autocomplete="off" type="password"
                  show-password />
              </el-form-item>
            </el-form>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancelFormPass">关闭</el-button>
              <el-button type="primary" @click="submitFormPass">提交</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
</template>
    
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { getInstanceList, pingInstance, getInstance, createInstance, deleteInstance, updateInstance, updateInstancePassword, Instance } from "@/api/instance"
import { ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue'


const total = ref(0)
const currentPage = ref(1);
const pageSize = ref(10);
const tableData = ref([]);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const addInsDialog = ref(false);
const editInsDialog = ref(false);
const passDialog = ref(false);

const insFormRef = ref();
const editFormRef = ref();
const passFormRef = ref()

const options = [
  {
    value: 'MySQL',
    label: 'MySQL',
  },
  {
    value: 'PostgreSQL',
    label: 'PostgreSQL',
  }
]

const getTableData = async () => {
  const table = await getInstanceList({ pageSize: pageSize.value, currentPage: currentPage.value });
  if ((table.data.code === 1000)) {
    tableData.value = table.data.data.data;
    total.value = table.data.data.total;
    pageSize.value = table.data.data.pageSize;
    currentPage.value = table.data.data.currentPage;
  }
};

const initPage = async () => {
  await getTableData();
};

initPage();

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getTableData();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getTableData();
};


// 增删改查
const deleteRow = async (row: Instance) => {
  ElMessageBox.confirm(
    '此操作将永久删除该实例, 是否继续?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      const res = await deleteInstance({ name: row.name });
      if (res.data.code === 1000) {
        ElMessage({
          type: 'success',
          message: '实例删除成功',
        })
        await getTableData();
      } else {
        ElMessage({
          type: 'error',
          message: '实例删除失败',
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除实例',
      })
    })
};

const addIns = () => {
  addInsDialog.value = true
}

const passwordRow = async (row: Instance) => {
  passForm.name = row.name;
  passDialog.value = true;
}


const editRow = async (row: Instance) => {
  editInsDialog.value = true

  const res = await getInstance({ name: row.name });
  if (res.data.code === 1000) {
    editForm.id = res.data.data.data[0].id;
    editForm.name = res.data.data.data[0].name;
    editForm.db_type = res.data.data.data[0].db_type;
    editForm.host = res.data.data.data[0].host;
    editForm.port = res.data.data.data[0].port;
    editForm.user = res.data.data.data[0].user;
  }
}


// 数据库连接性测试
const pingRow = async (row: Instance) => {
  const res = await pingInstance({ name: row.name });
  if (res.data.code === 1000 && res.data.data === 1) {
    ElMessage({ type: 'success', message: '连接数据库成功' });
  } else {
    ElMessage({ type: 'error', message: '连接数据库失败' });
  }
}


const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (insForm.checkPass !== '') {
      if (!insFormRef.value) return;
      insFormRef.value.validateField('checkPass', () => null);
    }
    callback();
  }
};

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value != insForm.password) {
    callback(new Error('输入的密码不相同!'));
  } else {
    callback();
  }
};


const validatePass2Pass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== passForm.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};

const passRules = reactive({
  password: [
    { required: true, trigger: "blur" },
    { required: true, min: 6, max: 30, trigger: "blur" },
  ],
  checkPass: [
    { required: true, trigger: "blur" },
    { required: true, min: 6, max: 30, trigger: "blur" },
    { validator: validatePass2Pass, trigger: 'blur' },
  ],
});

const rules = reactive({
  name: [{ required: true, trigger: 'blur' }],
  db_type: [{ required: true, trigger: 'blur' }],
  host: [{ required: true, trigger: 'blur' }],
  port: [{ required: true, trigger: 'blur' }],
  user: [{ required: true, trigger: 'blur' }],
  password: [{ validator: validatePass }, { required: true, min: 6, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2 }, { required: true, min: 6, trigger: 'blur' }],
});

const editForm = reactive({
  id: 0,
  name: '',
  db_type: '',
  host: '',
  port: '',
  user: '',
  password: '',
})

const insForm = reactive({
  name: '',
  db_type: '',
  host: '',
  port: '',
  user: '',
  password: '',
  checkPass: '',
});

const passForm = reactive({
  name: "",
  password: "",
  checkPass: "",
});


// 创建用户取消按钮
const cancelForm = async () => {
  insFormRef.value.resetFields();
  addInsDialog.value = false;
};

// 创建用户提交按钮
const submitForm = async () => {
  insFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await createInstance(insForm);
      if (res.data.code === 1000) {
        ElMessage({ type: 'success', message: '实例创建成功' });
        await getTableData();
        cancelForm();
      }
      addInsDialog.value = false;
    }
  });
};


const cancelEdit = async () => {
  editFormRef.value.resetFields()
  editInsDialog.value = false;
}

const submitEdit = async () => {
  editFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await updateInstance(editForm);
      if (res.data.code === 1000) {
        ElMessage({ type: 'success', message: '实例修改成功' });
        await getTableData();
        cancelEdit();
      }
      editInsDialog.value = false;
    }
  });
}


const cancelFormPass = async () => {
  passFormRef.value.resetFields();
  passDialog.value = false;
}


const submitFormPass = async () => {
  passFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await updateInstancePassword(passForm);
      if (res.data.code === 1000) {
        ElMessage({ type: 'success', message: '实例密码修改成功' });
        await getTableData();
        cancelFormPass;
      }
      passDialog.value = false;
    }
  })
}

</script>

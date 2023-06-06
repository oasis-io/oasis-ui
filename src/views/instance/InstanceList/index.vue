<template>
    <div class="table-box">
      <div class="button-left">
        <el-button type="primary" icon="plus" @click="addIns">新增实例</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column  align="left" prop="name" label="实例名" />
        <el-table-column align="left" prop="db_type" label="数据库类型" />
        <el-table-column align="left" prop="host" label="数据库地址" />
        <el-table-column align="left" prop="port" label="数据库端口" />
        <el-table-column align="left" prop="user" label="连接用户" />
        <el-table-column align="left"  label="操作" width="180">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="editIns(scope.row)">
              编辑
            </el-button>
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.row)">
              删除
            </el-button>
            <el-button link type="primary" size="small" @click.prevent="pingRow(scope.row)">
              连接测试
            </el-button>          
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
          :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
          :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
      <el-dialog v-model="addInsDialog" title="创建实例" width="40%">
        <div>
          <el-form ref="insFormRef" :model="insForm" status-icon :rules="rules" label-width="120px" style="max-width: 380px"
            class="demo-ruleForm">
            <el-form-item label="实例名" prop="name">
              <el-input v-model="insForm.name" maxlength="30" show-word-limit placeholder="请输入实例名" />
            </el-form-item>
            <el-form-item label="数据库类型" prop="db_type">
              <!-- <el-input v-model="insForm.db_type" placeholder="请输入数据库类型" /> -->
              <el-select v-model="insForm.db_type" placeholder="数据库类型">
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
              <el-input v-model="insForm.password" placeholder="请输入密码" autocomplete="off" type="password" show-password />
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
      <el-dialog v-model="editInsDialog" title="修改实例" width="40%">
        <div>
          <el-form ref="editFormRef" :model="editForm" status-icon :rules="rules" label-width="120px"
            style="max-width: 380px" class="demo-ruleForm">
            <el-form-item label="实例名" prop="name">
              <el-input v-model="editForm.name" disabled maxlength="50" show-word-limit placeholder="请输入实例名" />
            </el-form-item>
            <el-form-item label="数据库类型" prop="db_type">
              <el-input v-model="editForm.db_type"  disabled placeholder="请输入数据库类型" />
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
            <el-form-item label="密码" prop="password">
              <el-input v-model="editForm.password" placeholder="请输入密码" autocomplete="off" type="password" show-password />
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
  import { getInstanceList, pingIns, getIns, createIns, deleteIns, updateIns, Instance } from "@/api/instance"
  import { ElMessage } from 'element-plus';
  
  const total = ref(0)
  const currentPage = ref(1);
  const pageSize = ref(10);
  const tableData = ref([]);
  
  const small = ref(false);
  const background = ref(false);
  const disabled = ref(false);
  
  const value = ref('')
  const options = [
    {
      value: 'mysql',
      label: 'MySQL',
    },
    {
      value: 'redis',
      label: 'Redis',
    },
    {
      value: 'mongodb',
      label: 'MongoDB',
    },
    {
      value: 'elasticsearch',
      label: 'Elasticsearch',
    },
    {
      value: 'postgresql',
      label: 'PostgreSQL',
    }
  ]
  
  const getTableData = async () => {
    const table = await getInstanceList({ pageSize: pageSize.value, currentPage: currentPage.value });
    if ((table.status = 200)) {
      tableData.value = table.data.data;
      total.value = table.data.total;
      pageSize.value = table.data.pageSize;
      currentPage.value = table.data.currentPage;
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
  
  
  const addInsDialog = ref(false);
  const editInsDialog = ref(false);
  
  // 增删改查
  const deleteRow = async (row: Instance) => {
    const res = await deleteIns({ name: row.name });
    if (res.status === 200) {
      ElMessage.success('删除成功');
      await getTableData();
    }
  };
  
  const addIns = () => {
    addInsDialog.value = true
  }
  
  
  const editIns = async (row: Instance) => {
    editInsDialog.value = true
  
    const res = await getIns({ name: row.name });
    if (res.status === 200) {
      editForm.name = res.data.data[0].name;
      editForm.db_type = res.data.data[0].db_type;
      editForm.host = res.data.data[0].host;
      editForm.port = res.data.data[0].port;
      editForm.user = res.data.data[0].user;
      editForm.password = res.data.data[0].password;
    }
  }
  
  
  // 数据库连接性测试
  const pingRow = async (row: Instance) => {
    const res = await pingIns({ name: row.name });
    if (res.status === 200) {
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
  
  const rules = reactive({
    name: [{ required: true, trigger: 'blur' }],
    db_type: [{ required: true, trigger: 'blur' }],
    host: [{ required: true, trigger: 'blur' }],
    port: [{ required: true, trigger: 'blur' }],
    user: [{ required: true, trigger: 'blur' }],
    password: [{ validator: validatePass }, { required: true, min: 6, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2 }, { required: true, min: 6, trigger: 'blur' }],
  });
  
  const insFormRef = ref();
  const editFormRef = ref();
  
  const editForm = reactive({
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
  
  // 创建用户取消按钮
  const cancelForm = async () => {
    insFormRef.value.resetFields();
    addInsDialog.value = false;
  };
  
  // 创建用户提交按钮
  const submitForm = async () => {
    insFormRef.value.validate(async (valid: boolean) => {
      if (valid) {
        const res = await createIns(insForm);
        if (res.status === 200) {
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
        const res = await updateIns(editForm);
        if (res.status === 200) {
          ElMessage({ type: 'success', message: '实例修改成功' });
          await getTableData();
          cancelEdit();
        }
        editInsDialog.value = false;
      }
    });
  }
  
  </script>
    
    
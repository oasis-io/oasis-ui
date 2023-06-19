<template>
      <keep-alive>
    <transition mode="out-in" name="el-fade-in-linear">
    <div class="table-box">
        <div class="button-left">
            <el-button type="primary" icon="plus" @click="addUser">新增用户</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column align="left" prop="username" min-width="150" label="用户名" />
            <el-table-column align="left" prop="email" min-width="150" label="邮箱" show-overflow-tooltip/>
            <el-table-column align="left" prop="phone" min-width="150" label="手机号" />
            <el-table-column align="left" min-width="150" label="角色" >
                <template #default="scope">
                    <span v-for="(roles, index) in scope.row.roles" :key="index">{{ roles.name }}<span
                            v-if="index !== scope.row.roles.length - 1">, </span></span>
                </template>
            </el-table-column>
            <el-table-column  label="操作" min-width="249" fixed="right">
                <template #default="scope">
                    <el-button icon="edit" type="primary" link @click.prevent="editRow(scope.row)"
                        v-if="scope.row.username !== 'admin'">
                        编辑
                    </el-button>
                    <el-button icon="delete" type="primary" link @click.prevent="deleteRow(scope.row)"
                        v-if="scope.row.username !== 'admin'">
                        删除
                    </el-button>
                    <el-button icon="Lock" type="primary" link @click.prevent="passwordRow(scope.row)">
                        修改密码
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class=" pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
                :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
        <el-dialog v-model="addDialog" title="创建用户" width="40%">
            <div>
                <el-form ref="addFormRef" :model="addForm" status-icon :rules="rules" label-width="120px"
                    style="max-width: 380px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addForm.username" maxlength="18" show-word-limit placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="邮件" prop="email">
                        <el-input v-model="addForm.email" maxlength="30" show-word-limit placeholder="请输入邮件" />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="addForm.phone" maxlength="18" show-word-limit placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addForm.password" placeholder="请输入密码" autocomplete="off" type="password"
                            show-password />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input v-model="addForm.checkPass" placeholder="请再次输入密码" autocomplete="off" type="password"
                            show-password />
                    </el-form-item>
                    <el-form-item label="角色" prop="roles">
                        <el-select v-model="addForm.roles" multiple clearable style="width: 100%" placeholder="请选择角色">
                            <el-option v-for="item in optionroles" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelFormAdd">关闭</el-button>
                    <el-button type="primary" @click="submitFormAdd">提交</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="editDialog" title="修改用户" width="40%">
            <div>
                <el-form ref="editFormRef" :model="editForm" status-icon :rules="rules" label-width="120px"
                    style="max-width: 380px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="editForm.username" disabled maxlength="18" show-word-limit
                            placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="邮件" prop="email">
                        <el-input v-model="editForm.email" maxlength="30" show-word-limit placeholder="请输入邮件" />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="editForm.phone" maxlength="18" show-word-limit placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item label="角色" prop="roles">
                        <el-select v-model="editForm.roles" multiple clearable style="width: 100%" placeholder="请选择角色">
                            <el-option v-for="item in optionroles" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelFormEdit">关闭</el-button>
                    <el-button type="primary" @click="submitFormEdit">提交</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="passDialog" title="修改密码" width="40%">
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
</transition>
    </keep-alive>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    getUserList,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    User,
    getRoles,
    updatePassword,
} from "@/api/user";

const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const tableData = ref([]);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const addFormRef = ref();
const editFormRef = ref();
const passFormRef = ref()

const addDialog = ref(false);
const editDialog = ref(false);
const passDialog = ref(false);

const optionroles = ref<RolesOption[]>([]);


const validatePass = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("请输入密码"));
    } else {
        if (addForm.checkPass !== "") {
            if (!addFormRef.value) return;
            addFormRef.value.validateField("checkPass", () => null);
        }
        callback();
    }
};

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("请再次输入密码"));
    } else if (value != addForm.password) {
        callback(new Error("输入的密码不相同!"));
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
        { required: true, min: 6,max: 30, trigger: "blur" },
    ],
    checkPass: [
        { required: true, trigger: "blur" },
        { required: true, min: 6,max: 30, trigger: "blur" },
        { validator: validatePass2Pass, trigger: 'blur' },
    ],
});


const rules = reactive({
    username: [{ required: true, trigger: "blur" }],
    password: [{ validator: validatePass }, { required: true, min: 6, max: 30, trigger: "blur" }],
    checkPass: [{ validator: validatePass2 }, { required: true, min: 6, max: 30,trigger: "blur" }],
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
    const table = await getUserList({
        pageSize: pageSize.value,
        currentPage: currentPage.value,
    });
    if (table.data.code === 1000) {
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

// 增删改查
const deleteRow = async (row: User) => {
    ElMessageBox.confirm(
        '此操作将永久删除该用户, 是否继续?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            const res = await deleteUser({ username: row.username });
            if (res.data.code === 1000) {
                ElMessage({
                    type: 'success',
                    message: '用户删除成功',
                })
                await getTableData();
            } else {
                ElMessage({
                    type: 'error',
                    message: '用户删除失败',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除用户',
            })
        })
};


const passwordRow = async (row: User) => {
    passForm.username = row.username;
    passDialog.value = true;
}

interface RolesOption {
    label: string;
    value: string;
}

const addUser = async () => {
    addDialog.value = true;
    const res = await getRoles();
    if (res.data.code === 1000) {
        // 将数组转换为{label: '角色名称', value: '角色名称'}
        optionroles.value = res.data.data.data.map((roles: any) => ({ label: roles, value: roles }));
    }
};

const editRow = async (row: User) => {
    editDialog.value = true;
    const res = await getUser({ username: row.username });
    if (res.data.code === 1000) {
        editForm.username = res.data.data.data[0].username;
        editForm.email = res.data.data.data[0].email;
        editForm.phone = res.data.data.data[0].phone;
        editForm.password = res.data.data.data[0].password;
        editForm.roles = res.data.data.data[0].roles.map((role: any) => role.name);
    }
    const roles = await getRoles();
    if (roles.data.code === 1000) {
        // 将数组转换为{label: '角色名称', value: '角色名称'}
        optionroles.value = roles.data.data.data.map((roles: any) => ({ label: roles, value: roles }));
    }
};

const addForm = reactive({
    username: "",
    email: "",
    phone: "",
    password: "",
    checkPass: "",
    roles: []
});

const editForm = reactive({
    username: "",
    email: "",
    phone: "",
    password: "",
    roles: [],
});


const passForm = reactive({
    username: "",
    password: "",
    checkPass: "",
});

const cancelFormAdd = async () => {
    addFormRef.value.resetFields();
    addDialog.value = false;
};

const cancelFormEdit = async () => {
    editFormRef.value.resetFields();
    editDialog.value = false;
};

const cancelFormPass = async () => {
    passFormRef.value.resetFields();
    passDialog.value = false;  
}

const handleForm = async (formRef: any, formData: any, successMessage: string, failMessage: string, submitFunc: any, callback: any) => {
    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const res = await submitFunc(formData);
            if (res.data.code === 1000) {
                ElMessage({ type: "success", message: successMessage });
                callback();
                await getTableData();
            } else {
                ElMessage({ type: "error", message: failMessage });
            }
        }
    });
};

const submitFormAdd = async () => {
    await handleForm(addFormRef, addForm, "用户创建成功", "用户创建失败", createUser, cancelFormAdd);
};

const submitFormEdit = async () => {
    await handleForm(editFormRef, editForm, "用户修改成功", "用户修改失败", updateUser, cancelFormEdit);
};

const submitFormPass = async () => {
    await handleForm(passFormRef, passForm, "用户密码修改成功", "用户密码修改失败", updatePassword, cancelFormPass);
};
</script>

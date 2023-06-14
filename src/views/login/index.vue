<template>
    <div class="login-container">
      <div class="login-background"></div>
      <div class="login-title">Oasis 数据库运维平台</div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
        label-width="auto"
        class="login-form"
        @keyup.enter="submitForm"
      >
        <el-form-item label="" prop="username" style="margin-bottom: 20px">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            class="login-input"
            maxlength="30"
            prefix-icon="el-icon-user"
            :style="{ '--el-input-border-radius': '25px' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password" style="margin-top: 0">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
            class="login-input"
            maxlength="30"
            prefix-icon="el-icon-lock"
            :style="{ '--el-input-border-radius': '25px' }"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 20px"> 
          <el-button type="primary" @click.prevent="submitForm" class="login-button"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive } from "vue";
  import { ElForm } from "element-plus";
  import { useUserStore } from "@/store/user";
  
  // el-form ref
  const loginFormRef = ref();
  
  // el-form model
  const loginForm = reactive({
    username: "",
    password: "",
  });
  
  // el-form rules
  const rules = reactive({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  });
  
  // 状态管理
  const userStore = useUserStore();
  
  const submitForm = () => {
    loginFormRef.value.validate(async (valid: boolean) => {
      if (valid) {
        await userStore.LoginIn(loginForm);
      } else {
        return false;
      }
    });
  };
  </script>
  
  <style lang="scss" scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #2196f3;
    background-image: url("@/assets/login.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  
  .login-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: #000;
  }
  
  .login-title {
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 24px;
    color: #fff;
    text-align: center;
    width: 100%;
  }
  
  .login-form {
    margin: 20px 0;
    width: 400px;
  }
  
  .login-input {
    width: 100%;
    height: 40px;
  }
  
  .login-input .el-input__inner {
    padding-left: 45px;
    padding-right: 15px;
  }
  
  .login-input .el-input__prefix {
    font-size: 20px;
  }
  
  .login-button {
    width: 100%;
    height: 40px;
    border-radius: 25px;
  }
  </style>
  
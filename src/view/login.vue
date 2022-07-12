<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-main">
        <div class="login-header">Hinovel活动配置平台</div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="user">
            <el-input v-model="loginForm.user" placeholder="请输入邮箱地址" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password @keydown.enter="handleLogin(loginFormRef)" />
          </el-form-item>
          <el-form-item class="footer">
            <el-button class="login-btn" type="primary" :loading="loading" @click.prevent="handleLogin(loginFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="forget">忘记密码？</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
const router = useRouter()

const loading = ref(false)
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  user: '',
  password: ''
})

const validateUser = (rule:any, value:any, callback:any) => {
  if (value.length === 0) {
    callback(new Error('用户名不能为空'))
  } else {
    callback()
  }
}

const validatePass = (rule:any, value:any, callback:any) => {
  if (value.length === 0) {
    callback(new Error('密码不能为空'))
  } else if (value.length < 8) {
    callback(new Error('密码不能小于8位'))
  } else {
    callback()
  }
}

const loginRules = reactive({
  user: [
    { required: true, trigger: 'blur', validator: validateUser }
  ],
  password: [
    { required: true, trigger: 'blur', validator: validatePass }
  ]
})

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  formEl.validate((valid) => {
    if (valid) {
      router.push('/')
      loading.value = false
    } else {
      loading.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login-form {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login-bg.jpg');
  background-size: cover;
  position: relative;
  .login-main {
    position: absolute;
    width: 345px;
    //height: 427px;
    right: 216px;
    bottom: 216px;
    background-color: $white;
    border-radius: 3px;
    text-align: center;
    padding: 54px;
    .login-header {
      margin-bottom: 40px;
      text-align: center;
      width: 100%;
      font-size: 16px;
    }
    .el-form {
      .el-form-item {
        margin-bottom: 24px;
        &:last-child {
          margin-bottom: 0px;
        }
      }
      .footer {
        .el-button {
          display: block;
        }
        .el-button {
          width: 100%;
          border-radius: 48px;
          outline: none;
          border: none;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
        .login-btn {
          margin-top: 6px;
          height: 45px;
        }
      }
    }
  }
  .forget {
    cursor: pointer;
    position: absolute;
    bottom: 170px;
    right: 216px;
    width: 345px;
    text-align: center;
    font-size: 16px;
    color: $white;
  }
}

</style>
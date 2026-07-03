<template>
  <v-dialog v-model="dialog" width="400px" density="comfortable">
    <v-card>
      <v-card-title class="text-center">
        <span class="font-weight-bold">注册</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent="register" autocomplete="off" novalidate>
          <v-text-field 
            v-model="username" 
            label="用户名" 
            required 
            :disabled="loading"
            :error-messages="usernameError"
            @blur="validateUsername"
            autocomplete="username"
            name="username"
          ></v-text-field>
          
          <v-text-field 
            v-model="email" 
            label="电子邮件" 
            required 
            :disabled="loading"
            :error-messages="emailError"
            @blur="validateEmail"
            autocomplete="new-email"
          >
            <template v-slot:append>
              <v-btn 
                @click="sendVerificationCode" 
                color="primary" 
                :disabled="!email || emailError || verificationCodeSent || sendingCode || countdown > 0 || loading"
                :loading="sendingCode"
              >
                {{ countdown > 0 ? `${countdown}s` : (verificationCodeSent ? '已发送' : '验证') }}
              </v-btn>
            </template>
          </v-text-field>
          
          <v-text-field 
            v-model="verificationCode" 
            label="验证码" 
            type="text" 
            required 
            :disabled="loading"
            :error-messages="codeError"
            @blur="validateCode"
            autocomplete="one-time-code"
            name="one-time-code"
          ></v-text-field>
          
          <v-text-field 
            v-model="password" 
            label="密码" 
            type="password" 
            required 
            :disabled="loading"
            :error-messages="passwordError"
            @blur="validatePassword"
            hint="密码长度必须大于7个字符且包含至少一个字母"
            persistent-hint
            autocomplete="new-password"
            name="new-password"
          ></v-text-field>
          
          <v-text-field 
            v-model="confirmPassword" 
            label="确认密码" 
            type="password" 
            required 
            :disabled="loading"
            :error-messages="confirmPasswordError"
            @blur="validateConfirmPassword"
            class="mb-0"
            autocomplete="new-password"
            name="new-password-confirm"
          ></v-text-field>
        </v-form>
        
        <transition name="fade">
          <p v-if="serverError" class="error-message">{{ serverError }}</p>
        </transition>
      </v-card-text>
      <v-card-actions class="flex justify-end">
        <v-btn 
          @click="loginInstead" 
          color="blue" 
          :disabled="loading"
          variant="text"
        >
          已有账号？登录
        </v-btn>
        <v-btn 
          @click="register" 
          color="success" 
          :loading="loading" 
          :disabled="loading || !username || !email || !password || !confirmPassword || !verificationCode || usernameError || emailError || passwordError || confirmPasswordError || codeError"
        >
          注册
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue';
  import { getRegisterDialogRef, openLoginDialog } from "../js/userDialog.js";
  import {authApi, saveTokens, fetchUserInfo} from "../js/api.js"
  import validator from "validator"
  
  const dialog = getRegisterDialogRef();
  const form = ref(null);
  const isFormValid = ref(false);

  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const verificationCode = ref('');
  const verificationCodeSent = ref(false);
  const serverError = ref('');
  const loading = ref(false);
  const sendingCode = ref(false);
  const countdown = ref(0);

  // 错误消息
  const usernameError = ref(null);
  const emailError = ref(null);
  const passwordError = ref(null);
  const confirmPasswordError = ref(null);
  const codeError = ref(null);

  // 验证函数
  const validateUsername = () => {
    if (!username.value) {
      usernameError.value = '请输入用户名';
    } else if (username.value.length < 3) {
      usernameError.value = '用户名至少需要3个字符';
    } else if (username.value.length >= 10) {
      usernameError.value = '用户名长度必须小于10个字符';
    } else {
      usernameError.value = null;
    }
  };

  const validateEmail = () => {
    if (!email.value) {
      emailError.value = '请输入邮箱';
    } else if (!validator.isEmail(email.value)) {
      emailError.value = '邮箱格式错误';
    } else {
      emailError.value = null;
    }
  };

  const validatePassword = () => {
    if (!password.value) {
      passwordError.value = '请输入密码';
    } else if (password.value.length <= 7 || !/[a-zA-Z]/.test(password.value)) {
      passwordError.value = '密码长度必须大于7个字符且包含至少一个字母';
    } else {
      passwordError.value = null;
    }
    
    // 当密码改变时，也要验证确认密码
    if (confirmPassword.value) {
      validateConfirmPassword();
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword.value) {
      confirmPasswordError.value = '请确认密码';
    } else if (password.value !== confirmPassword.value) {
      confirmPasswordError.value = '两次密码不一致';
    } else {
      confirmPasswordError.value = null;
    }
  };

  const validateCode = () => {
    if (!verificationCode.value) {
      codeError.value = '请输入验证码';
    } else if (verificationCode.value.length < 4) {
      codeError.value = '验证码格式错误';
    } else {
      codeError.value = null;
    }
  };

  // 验证所有字段
  const validateAll = () => {
    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateCode();
    
    return !(usernameError.value || emailError.value || passwordError.value || 
             confirmPasswordError.value || codeError.value);
  };

  // 移除所有实时监听，改为失去焦点时验证
  
  // 监听对话框状态，重置表单
  watch(dialog, (newVal) => {
    if (newVal === true) {
      resetForm();
    }
  });
  
  // 重置表单
  const resetForm = () => {
    username.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    verificationCode.value = '';
    verificationCodeSent.value = false;
    serverError.value = '';
    usernameError.value = '';
    emailError.value = '';
    passwordError.value = '';
    confirmPasswordError.value = '';
    codeError.value = '';
    countdown.value = 0;
    if (form.value) {
      form.value.resetValidation();
    }
  };
  
  // 组件挂载时进行初始验证
  onMounted(() => {
    if (username.value) validateUsername();
    if (email.value) validateEmail();
    if (password.value) validatePassword();
    if (confirmPassword.value) validateConfirmPassword();
    if (verificationCode.value) validateCode();
  });

  // 倒计时功能
  const startCountdown = () => {
    countdown.value = 60;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
        verificationCodeSent.value = false;
      }
    }, 1000);
  };

  const register = async () => {
    serverError.value = "";
    
    // 验证所有字段
    if (!validateAll()) {
      return;
    }
    
    loading.value = true;
    try {
      await authApi.registerAuthRegisterPost({
        account: username.value, email: email.value,
        code: verificationCode.value, password: password.value,
      });
      const loginResp = await authApi.loginAuthLoginPost({ login: username.value, password: password.value });
      if (loginResp.data.access_token) {
        saveTokens(loginResp.data.access_token, loginResp.data.refresh_token || "");
      }
      await fetchUserInfo();
      dialog.value = false;
    } catch (err) {
      console.error(err);
      if (!err.response) {
        serverError.value = "网络错误，请检查您的网络连接";
      } else {
        serverError.value = err.response.data.detail;
      }
    } finally {
      loading.value = false;
    }
  };

  const loginInstead = () => {
    console.log('切换到登录页面');
    dialog.value = false;
    openLoginDialog();
  };

  const sendVerificationCode = async () => {
    validateEmail();
    if (emailError.value) {
      return;
    }

    sendingCode.value = true;
    serverError.value = "";
    try {
      await authApi.sendCodeAuthSendCodePost({ email: email.value, purpose: "register" });
      verificationCodeSent.value = true;
      serverError.value = "验证码已发送";
      startCountdown();
    } catch (err) {
      console.error(err);
      verificationCodeSent.value = false;
      if (!err.response) {
        serverError.value = "网络错误，请检查您的网络连接";
      } else {
        serverError.value = err.response.data.detail;
      }
    } finally {
      sendingCode.value = false;
    }
  };
</script>

<style scoped>
.v-card-actions {
  flex-direction: row;
  gap: 10px;
  padding: 8px 24px 12px;
}

.v-card {
  background: linear-gradient(135deg, #f8f8f8, #e0e0e0);
  border-radius: 16px;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.v-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 10% 20%, rgba(100, 149, 237, 0.15) 10px, transparent 80px),
    radial-gradient(circle at 90% 80%, rgba(147, 112, 219, 0.15) 20px, transparent 100px),
    radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.15) 50px, transparent 150px);
  z-index: 0;
  pointer-events: none;
}

.v-card-title {
  position: relative;
  z-index: 1;
  padding: 20px 24px;
  font-size: 1.5rem;
  letter-spacing: 1px;
  color: #424242;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.v-card-text {
  position: relative;
  z-index: 1;
  padding: 8px 24px 0px;
}

.error-message {
  color: #ff5252;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(255, 82, 82, 0.08);
  border-left: 3px solid #ff5252;
  margin: 0 0 4px 0;
  display: none;
}

.error-message:not(:empty) {
  display: block;
}


/* 动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 错误提示样式增强 */
:deep(.v-messages__message) {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  padding-left: 4px;
  min-height: 0;
  font-size: 0.75rem;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
  40%, 60% { transform: translate3d(3px, 0, 0); }
}
</style>
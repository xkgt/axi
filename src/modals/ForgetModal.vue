<template>
  <v-dialog v-model="dialog" width="400px" density="comfortable">
    <v-card>
      <v-card-title class="text-center">
        <span class="font-weight-bold">修改密码</span>
      </v-card-title>
      <v-card-text>
        <p>请输入您的电子邮件地址以获取验证码。</p>
        <v-text-field v-model="email" label="电子邮件" required></v-text-field>
        <div v-if="verificationCodeSent">
          <v-text-field v-model="verificationCode" label="验证码" type="text" required></v-text-field>
          <v-text-field 
            v-model="newPassword" 
            label="新密码" 
            type="password" 
            required 
            :error-messages="passwordError"
            @blur="validatePassword"
            hint="密码长度必须大于7个字符且包含至少一个字母"
            persistent-hint
          ></v-text-field>
          <v-text-field 
            v-model="confirmPassword" 
            label="确认密码" 
            type="password" 
            required 
            :error-messages="confirmPasswordError"
            @blur="validateConfirmPassword"
          ></v-text-field>
          <v-btn @click="resetPassword" color="success" :disabled="!verificationCode || !newPassword || !confirmPassword || passwordError || confirmPasswordError">
            重置密码
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions class="flex justify-end">
        <v-btn @click="loginInstead" color="blue">
          返回登录
        </v-btn>
        <v-btn @click="sendVerificationCode" color="primary" :disabled="verificationCodeSent || !email">
          {{ verificationCodeSent ? '已发送' : '发送验证码' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { getForgetPasswordDialogRef, openLoginDialog } from "../js/userDialog.js";
import {authApi} from "@/js/api.js";

const dialog = getForgetPasswordDialogRef();
const email = ref(''); // 用户输入的电子邮件字段
const verificationCode = ref(''); // 用户输入的验证码
const newPassword = ref(''); // 新密码
const confirmPassword = ref(''); // 确认密码
const verificationCodeSent = ref(false); // 是否已发送验证码
const errorMsg = ref(''); // 错误信息

// 密码错误消息
const passwordError = ref(null);
const confirmPasswordError = ref(null);

// 验证函数
const validatePassword = () => {
  if (!newPassword.value) {
    passwordError.value = '请输入密码';
  } else if (newPassword.value.length <= 7 || !/[a-zA-Z]/.test(newPassword.value)) {
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
  } else if (newPassword.value !== confirmPassword.value) {
    confirmPasswordError.value = '两次密码不一致';
  } else {
    confirmPasswordError.value = null;
  }
};

// 发送验证码
const sendVerificationCode = async () => {
  try {
    errorMsg.value = '';
    await authApi.sendCodeAuthSendCodePost({ email: email.value, purpose: "forgot-password" });
    verificationCodeSent.value = true;
  } catch (error) {
    console.error('发送验证码失败:', error);
    if (!error.response) {
      errorMsg.value = "网络错误，请检查您的网络连接";
      return;
    }
    errorMsg.value = error.response.data.detail;
  }
};

// 重置密码
const resetPassword = async () => {
  try {
    errorMsg.value = '';
    if (!verificationCode.value) {
      errorMsg.value = '请填写验证码';
      return;
    }
    if (!newPassword.value || !confirmPassword.value || passwordError.value || confirmPasswordError.value) {
      errorMsg.value = '请正确填写密码和确认密码';
      return;
    }

    await authApi.forgotPasswordAuthForgotPasswordPost({
      email: email.value,
      code: verificationCode.value,
      new_password: newPassword.value,
    });
    dialog.value = false;
    openLoginDialog();
  } catch (error) {
    console.error('重置密码失败:', error);
    if (!error.response) {
      errorMsg.value = "网络错误，请检查您的网络连接";
      return;
    }
    errorMsg.value = error.response.data.detail;
  }
};

const loginInstead = () => {
  dialog.value = false;
  openLoginDialog();
};
</script>

<style scoped>
.v-card-actions {
  flex-direction: row;
  gap: 10px;
  position: relative;
  z-index: 1;
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
  border-radius: 16px;
}

.v-card-title {
  position: relative;
  z-index: 1;
}

.v-card-text {
  position: relative;
  z-index: 1;
}
</style>
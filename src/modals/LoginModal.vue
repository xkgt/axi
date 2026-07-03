<template>
  <v-dialog v-model="dialog" width="400px" density="comfortable">
    <v-card>
      <v-card-title class="text-center">
        <span class="font-weight-bold">管理账号登录</span>
      </v-card-title>
      <v-card-text>
        <p class="login-hint">此页面仅供站长登录以管理自己的网站<br/>如果你是访客，不需要登录</p>
        <v-text-field v-model="username" label="用户名" required :disabled="loading"></v-text-field>
        <v-text-field v-model="password" label="密码" type="password" required :disabled="loading"></v-text-field>
        <transition name="fade">
          <p v-if="errmsg" class="error-message">{{ errmsg }}</p>
        </transition>
      </v-card-text>
      <v-card-actions class="flex justify-end">
        <v-btn @click="forgetPassword" color="blue" :disabled="loading">
          忘记密码
        </v-btn>
        <!-- <v-btn @click="register" color="deep-purple" :disabled="loading">
          注册
        </v-btn> -->
        <v-btn @click="login" color="success" :disabled="loading" :loading="loading">
          登录
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from 'vue';
import {getLoginDialogRef, openForgetPasswordDialog, openRegisterDialog} from "../js/userDialog.js";
import {authApi, saveTokens, fetchUserInfo} from "../js/api.js"

const dialog = getLoginDialogRef();

const username = ref('');
const password = ref('');
const errmsg = ref('');
const loading = ref(false);

const login = async () => {
  if (!username.value || !password.value) {
    errmsg.value = "请填写用户名和密码";
    return;
  }

  errmsg.value = "";

  if (password.value.length <= 7 || !/[a-zA-Z]/.test(password.value)) {
    errmsg.value = "密码长度必须大于7个字符且包含至少一个字母";
    return;
  }

  loading.value = true;
  try {
    const resp = await authApi.loginAuthLoginPost({ login: username.value, password: password.value });
    if (resp.data.access_token) {
      saveTokens(resp.data.access_token, resp.data.refresh_token || "");
    }
    await fetchUserInfo();
    dialog.value = false;
  } catch (err) {
    console.error(err);
    if (!err.response) {
      errmsg.value = "网络错误，请检查您的网络连接";
    } else {
      errmsg.value = err.response.data.detail;
    }
  } finally {
    loading.value = false;
  }
};

const forgetPassword = () => {
  dialog.value = false;
  openForgetPasswordDialog()
};

const register = () => {
  dialog.value = false;
  openRegisterDialog();
}
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

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 8px;
  position: relative;
  z-index: 1;
}

.login-hint {
  color: #666;
  font-size: 0.82rem;
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.5;
  position: relative;
  z-index: 1;
}

/* 动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
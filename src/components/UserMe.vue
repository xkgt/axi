<template>
  <v-card class="user-card" elevation="4">
    <v-card-text>
      <div class="d-flex align-center justify-space-between">
        <div>
          <h3 class="text-h5 font-weight-bold mb-1">{{ user.username }}</h3>
          <!--          <p class="text-caption text&#45;&#45;secondary">注册时间: {{ user.c }}</p>-->
          <p class="text-caption text--secondary">ID: {{ user.id }}</p>
        </div>
        <v-avatar size="64">
          <v-img :src="user.avatar" alt="" />
        </v-avatar>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="green" variant="text" @click="changeAvatar">更换头像</v-btn>
      <v-btn color="primary" @click="logout1">登出</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn color="orange" variant="text" @click="resetPassword">修改密码</v-btn>
      <v-btn color="error" @click="deleteAccount">注销</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {authApi, user, logout} from "@/js/api.js";
import {showSnackbar, openChangeAvatarDialog, showConfirmDialog, openForgetPasswordDialog} from "@/js/userDialog.js";

const resetPassword = () => {
  // 实现重置密码逻辑
  console.log('重置密码');
  openForgetPasswordDialog();
};

const changeAvatar = () => {
  // 实现更换头像逻辑
  console.log('更换头像');
  openChangeAvatarDialog();
};

const logout1 = () => {
  // 实现登出逻辑
  console.log('登出');
  logout()
};

const deleteAccount = async () => {
  // 第一次确认：是否注销
  const firstConfirm = await showConfirmDialog({
    title: "确认注销",
    text: "您确定要注销账号吗？此操作不可逆。",
    color: "red"
  });

  if (firstConfirm) {
    // 第二次确认：最后确认一遍
    const secondConfirm = await showConfirmDialog({
      title: "最后确认",
      text: "请再次确认是否注销账号。",
      color: "red"
    });

    if (secondConfirm) {
      try {
        authApi.deleteMeAuthMeDelete().then(() => {
          showSnackbar("注销成功")
          logout();
        }).catch(err => {
          showSnackbar(err.response?.data?.detail || '注销失败')
        })
        console.log("账号已成功注销");
        // 可以在此处跳转到登录页或其他页面
      } catch (error) {
        console.error("注销失败:", error);
      }
    }
  }
};
</script>

<style scoped>
</style>
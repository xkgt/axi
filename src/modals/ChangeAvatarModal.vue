<template>
  <v-dialog v-model="dialog" width="400px" density="comfortable">
    <v-card>
      <v-card-title class="text-center">
        <span class="font-weight-bold">修改头像</span>
      </v-card-title>

      <v-card-text class="text-center">
        <!-- 上传按钮 -->
        <div class="avatar-wrapper">
          <div
              class="avatar-container"
              @click="triggerFileInput"
              :class="{ 'has-avatar': !!displayAvatar }"
          >
            <v-img v-if="displayAvatar" :src="displayAvatar" class="avatar" />
            <div v-else class="avatar-placeholder">
              <span class="upload-text">上传头像</span>
            </div>
          </div>

          <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="uploadFile"
              hidden
          />
        </div>

        <!-- 剪裁框，在上传图片后出现 -->



        <!-- 错误信息 -->
        <p v-if="errorMsg" class="error-message mt-2">{{ errorMsg }}</p>
      </v-card-text>

      <v-card-actions class="flex justify-end">
        <v-btn @click="dialog = false" color="blue">取消</v-btn>
        <v-btn @click="saveAvatar" color="success" :disabled="!avatarUrl">
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <ImgCutter ref="imgCutterRef" @cutDown="cutDown" rate="1:1">
    <template #open>
    </template>
  </ImgCutter>
</template>

<script setup>
import {computed, ref} from 'vue';
import {getChangeAvatarDialogRef, showSnackbar} from '@/js/userDialog.js';
import {setUser, user, API_BASE, getAccessToken} from "@/js/api.js";
import ImgCutter from 'vue-img-cutter'

const dialog = getChangeAvatarDialogRef();
const fileInput = ref(null);
const avatarUrl = ref(null)
const displayAvatar = computed(() => {
  if (avatarUrl.value) {
    return avatarUrl.value;
  } else if (user.value) {
    return user.value.avatar;
  } else {
    return '';
  }
})
let file = null;
const imgCutterRef = ref(null);
const errorMsg = ref('');

/* 触发文件选择 */
const triggerFileInput = () => fileInput.value.click();

const uploadFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  console.log(file)
  avatarUrl.value = URL.createObjectURL(file);
  imgCutterRef.value.handleOpen({
    name: file.name,
    src: avatarUrl.value
  })
  dialog.value = false;
};

const cutDown = (data) => {
  console.log(data)
  avatarUrl.value = data.dataURL;
  file = data.file;
  dialog.value = true;
}

const saveAvatar = async () => {
  const form = new FormData();
  form.append("file", file);
  const axios = (await import('axios')).default;
  const token = getAccessToken();
  axios.post(`${API_BASE}/auth/me/avatar`, form, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  }).then(resp => {
    setUser(resp.data)
    avatarUrl.value = resp.data.avatar_url;
    showSnackbar("修改成功")
  }).catch(err => {
    showSnackbar(err.response.data.detail)
  })
};
</script>

<style scoped>
/* 原样式保持不变 */
.avatar-wrapper {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.avatar-container {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  width: 150px;
  height: 150px;
  transition: all 0.3s ease;
  border: 2px dashed transparent;
}
.avatar-container:hover {
  border-color: rgba(0, 0, 0, 0.2);
}
.avatar-container.has-avatar:hover .avatar {
  transform: scale(1.05);
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: block;
}
.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.3s ease;
}
.upload-text {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.avatar-container:hover .upload-text {
  opacity: 1;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
}
.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
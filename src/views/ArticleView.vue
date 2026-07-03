<template>
  <div class="container">
    <div class="progress" v-if="isLoading">
      <v-progress-circular
          indeterminate
          color="primary"
          size="64"
      ></v-progress-circular>
    </div>

    <iframe
      v-show="!isLoading"
      src="https://xkgt.github.io/PythonLearn/"
      class="custom-iframe"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {showSnackbar} from "@/js/userDialog";

showSnackbar("文章加载会比较缓慢，推荐在单独页面中打开")
// 定义加载状态
const isLoading = ref(true);

// iframe 加载完成时触发
const onIframeLoad = () => {
  isLoading.value = false;
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%;
  width: 100%;
  position: relative;
}
.custom-iframe {
  border: none;
  border-radius: 12px;
  width: 63%;
  height: 93%;
}
.progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
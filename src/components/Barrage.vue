<template>
  <div class="barrage-container">
    <div
        v-for="message in messages"
        class="barrage-item"
        :key="message.id"
        :style="getStyle(message.content)"
    >
      {{ message.content }}  {{message.id}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessagePublic } from "@/js/server-api/index.js";
import {ref} from 'vue'

const messages = ref([]);

function addMessage(_messages: MessagePublic[]) {
  messages.value.push(..._messages);
}
defineExpose({addMessage})

function getFontSize(content: string): number {
  const maxLength = 20;
  return Math.min(content.length, maxLength) * 4 + 12;
}

function getAnimationDuration(): number {
  return 10 + Math.random() * 5; // 10~15 秒
}

function getMessageDelay(): number {
  return Math.random() * 10; // 随机延迟 0~10 秒
}

function getStartX(): number {
  return Math.random() * 100; // 0%~100% 的 vw
}

function getStyle(content: string) {
  const duration = getAnimationDuration();
  const delay = getMessageDelay();
  const left = getStartX();
  const fontSize = getFontSize(content);
  return {
    fontSize: `${fontSize}px`,
    left: `${left}vw`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  };
}
</script>

<style scoped>
.barrage-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0; /* 确保在页面内容之下，但不设为 -1 */
}

.barrage-item {
  position: absolute;
  top: -50px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.6);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  user-select: none;
  opacity: 0;
  animation: fall linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(110vh);
    opacity: 0;
  }
}
</style>
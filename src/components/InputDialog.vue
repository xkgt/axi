<template>
  <v-dialog v-model="dialogVisible" persistent width="500">
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text>
        <p>{{ text }}</p>
        <v-textarea
          v-model="inputText"
          placeholder="请输入内容"
          auto-grow
          rows="3"
          row-height="20"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="cancel">取消</v-btn>
        <v-btn color="success" @click="confirm">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: String,
  text: String
});

const emits = defineEmits(['close', "cancel"]);

const inputText = ref('');

// 使用 props 访问 modelValue
const dialogVisible = ref(true);


const cancel = () => {
  dialogVisible.value = false;
  emits('cancel');
};

const confirm = () => {
  dialogVisible.value = false;
  emits('close', inputText.value);
};
</script>

<style scoped>
/* 可根据需要添加自定义样式 */
</style>
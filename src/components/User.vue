<template>
  <v-card class="user-card" elevation="4">
    <v-card-text>
      <div class="d-flex align-center justify-space-between">
        <div>
          <h3 class="text-h5 font-weight-bold mb-1">{{ user.username }}</h3>
          <p class="text-caption text--secondary">ID: {{ user.id }}</p>
        </div>
        <v-avatar size="64">
          <v-img :src="user.avatar_url" alt="" />
        </v-avatar>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  user: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.user-card {
  max-width: 300px;
  margin: 0 auto;
}

.text-h5 {
  line-height: 1.2;
}
</style>
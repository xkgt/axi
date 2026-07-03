<template>
  <Container>
    <v-card>
      <v-card-title>论坛管理</v-card-title>
      <v-card-text>
        <v-table density="compact">
          <thead><tr><th>内容</th><th>作者</th><th>点赞</th><th>状态</th><th>时间</th><th>操作</th></tr></thead>
          <tbody>
            <tr v-for="m in items" :key="m.id">
              <td>{{ m.content?.slice(0, 40) }}{{ m.content?.length > 40 ? '...' : '' }}</td>
              <td>{{ m.author_account }}</td>
              <td>{{ m.likes }}</td>
              <td><v-chip :color="m.is_deleted ? 'red' : 'green'" size="x-small">{{ m.is_deleted ? '已删' : '正常' }}</v-chip></td>
              <td>{{ formatTime(m.created_at) }}</td>
              <td>
                <v-btn size="small" color="error" variant="tonal" :disabled="m.is_deleted" @click="del(m.id)">删除</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex justify-center mt-4">
          <v-btn-group>
            <v-btn :disabled="page <= 1" @click="load(page - 1)">上一页</v-btn>
            <v-btn variant="tonal">{{ page }}</v-btn>
            <v-btn @click="load(page + 1)">下一页</v-btn>
          </v-btn-group>
        </div>
      </v-card-text>
    </v-card>
  </Container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adminApi, client, formatTime } from "@/js/api.js"
import { showSnackbar, showConfirmDialog } from "@/js/userDialog.js"

const items = ref([])
const page = ref(1)
const cursors = ref([])

async function load(p) {
  if (p < 1) return
  const cursor = p > 1 && cursors.value.length >= p - 1 ? cursors.value[p - 2] : undefined
  try {
    const resp = await adminApi.listMessagesAdminAdminMessagesGet(cursor, 50)
    items.value = resp.data
    page.value = p
    if (resp.data.length > 0 && cursors.value.length < p) {
      cursors.value.push(resp.data[0].created_at)
    }
  } catch {}
}
async function del(id) {
  if (!await showConfirmDialog({ title: "确认删除", text: "确定要删除此帖子？" })) return
  try { await client.delete(`/messages/item/${id}`); showSnackbar('已删除'); load(page.value) }
  catch { showSnackbar('删除失败') }
}

onMounted(() => load(1))
</script>

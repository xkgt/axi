<template>
  <Container>
    <v-card>
      <v-card-title>弹幕管理</v-card-title>
      <v-card-text>
        <v-table density="compact">
          <thead><tr><th>内容</th><th>作者</th><th>颜色</th><th>时间</th><th>操作</th></tr></thead>
          <tbody>
            <tr v-for="b in items" :key="b.id">
              <td>{{ b.text }}</td>
              <td>{{ b.user_account }}</td>
              <td><span :style="{color: b.color}">●</span> {{ b.color }}</td>
              <td>{{ formatTime(b.created_at) }}</td>
              <td><v-btn size="small" color="error" variant="tonal" @click="del(b.id)">删除</v-btn></td>
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
import { adminApi, formatTime } from "@/js/api.js"
import { showSnackbar, showConfirmDialog } from "@/js/userDialog.js"

const items = ref([])
const page = ref(1)
const cursors = ref([])  // cursor 栈：每页第一条的 created_at

async function load(p) {
  if (p < 1) return
  const cursor = p > 1 && cursors.value.length >= p - 1 ? cursors.value[p - 2] : undefined
  try {
    const resp = await adminApi.listBarragesAdminAdminBarragesGet(cursor, 50)
    items.value = resp.data
    page.value = p
    if (resp.data.length > 0 && cursors.value.length < p) {
      cursors.value.push(resp.data[0].created_at)
    }
  } catch {}
}
async function del(id) {
  if (!await showConfirmDialog({ title: "确认删除", text: "确定要删除此弹幕？" })) return
  try { await adminApi.deleteBarrageAdminAdminBarragesItemBarrageIdDelete(id); showSnackbar('已删除'); load(page.value) }
  catch { showSnackbar('删除失败') }
}

onMounted(() => load(1))
</script>

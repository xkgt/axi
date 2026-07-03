<template>
  <Container>
    <v-card>
      <v-card-title>人员管理</v-card-title>
      <v-card-text>
        <v-table density="compact">
          <thead><tr><th>ID</th><th>账号</th><th>邮箱</th><th>状态</th><th>注册时间</th><th>操作</th></tr></thead>
          <tbody>
            <tr v-for="u in items" :key="u.id">
              <td>{{ u.id }}</td>
              <td>{{ u.account }}</td>
              <td>{{ u.email }}</td>
              <td>
                <v-chip :color="u.is_deleted ? 'grey' : u.is_ban ? 'red' : 'green'" size="x-small">
                  {{ u.is_deleted ? '已注销' : u.is_ban ? '封禁' : '正常' }}
                </v-chip>
              </td>
              <td>{{ formatTime(u.created_at) }}</td>
              <td>
                <v-btn v-if="!u.is_deleted" size="small" :color="u.is_ban ? 'green' : 'warning'" variant="tonal" @click="toggleBan(u)">{{ u.is_ban ? '解封' : '封禁' }}</v-btn>
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
import { adminApi, formatTime } from "@/js/api.js"
import { showSnackbar, showConfirmDialog } from "@/js/userDialog.js"

const items = ref([])
const page = ref(1)
const cursors = ref([])

async function load(p) {
  if (p < 1) return
  const cursor = p > 1 && cursors.value.length >= p - 1 ? cursors.value[p - 2] : undefined
  try {
    const resp = await adminApi.listUsersAdminUsersGet(cursor, 50)
    items.value = resp.data
    page.value = p
    if (resp.data.length > 0 && cursors.value.length < p) {
      cursors.value.push(resp.data[0].created_at)
    }
  } catch {}
}
async function toggleBan(user) {
  const action = user.is_ban ? '解封' : '封禁'
  if (!await showConfirmDialog({ title: `确认${action}`, text: `确定要${action}用户 "${user.account}" 吗？` })) return
  try {
    const resp = user.is_ban
      ? await adminApi.unbanUserAdminUsersUserIdUnbanPut(user.id)
      : await adminApi.banUserAdminUsersUserIdBanPut(user.id)
    user.is_ban = resp.data.is_ban
    showSnackbar(resp.data.message)
  } catch { showSnackbar('操作失败') }
}

onMounted(() => load(1))
</script>

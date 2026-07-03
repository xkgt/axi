<template>
  <Container>
    <v-container class="admin-view">
      <v-row justify="center" class="mb-4">
        <v-col cols="auto">
          <v-btn @click="fetchReports(currentPage - 1)" :disabled="currentPage === 1">上一页</v-btn>
        </v-col>
        <v-col cols="auto" class="mx-2">
          <span>第 {{ currentPage }} 页</span>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="fetchReports(currentPage + 1)">下一页</v-btn>
        </v-col>
      </v-row>

      <v-data-table :headers="headers" :items="reports" item-key="id" class="elevation-1">
        <template v-slot:item.report="{ item }">
          <div style="height: 1rem"></div>
          <div class="report-content">
            <div class="reporter-info"><strong>举报人：</strong>{{ item.reporter_account }}</div>
            <div class="reporter-info"><strong>举报时间：</strong>{{ formatTime(item.created_at) }}</div>
            <div class="reported-info"><strong>被举报内容：</strong>{{ item.message_content }}</div>
            <div class="reported-info"><strong>举报原因：</strong>{{ item.reason }}</div>
            <div v-if="item.is_processed" class="processed-info"><strong>处理结果：</strong>{{ item.result }}</div>
            <div v-if="item.is_processed" class="processed-info"><strong>处理时间：</strong>{{ formatTime(item.processed_at) }}</div>
          </div>
          <div style="height: 1rem"></div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="error" small class="mr-2" @click="deletePost(item.message_id)">删除帖子</v-btn>
          <br>
          <v-btn v-if="!item.is_processed" color="success" small @click="markAsHandled(item.id)">标记处理</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </Container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatTime, messagesApi, reportsApi } from "@/js/api.js"
import { showSnackbar, showInputDialog, showConfirmDialog } from "@/js/userDialog.js"

const currentPage = ref(1)
const reports = ref([])
const cursors = ref([])

const headers = [
  { text: '举报信息', value: 'report' },
  { text: '操作', value: 'actions' }
]

async function fetchReports(page) {
  if (page < 1) return
  const cursor = page > 1 && cursors.value.length >= page - 1 ? cursors.value[page - 2] : undefined
  try {
    const resp = await reportsApi.listReportsReportsGet(cursor, 50);
    const list = Array.isArray(resp.data) ? resp.data : [];
    reports.value = list.map(r => ({
      ...r,
      reporter: { username: r.reporter_account, id: r.reporter_id },
      message: { id: r.message_id, content: r.message_content, author: { username: "作者#" + r.message_id, id: r.message_id } },
    }));
    currentPage.value = page;
    if (list.length > 0 && cursors.value.length < page) {
      cursors.value.push(list[0].created_at)
    }
  } catch {}
}

async function deletePost(id) {
  if (!await showConfirmDialog({ title: "确认删除", text: "确定要删除该帖子吗？" })) return
  try { await messagesApi.deleteMessageMessagesItemMessageIdDelete(id); showSnackbar('帖子已删除'); fetchReports(currentPage.value) }
  catch (e) { showSnackbar(e.response?.data?.detail || '删除失败') }
}

async function markAsHandled(id) {
  const result = await showInputDialog({ title: '处理结果', text: '请输入处理结果：' })
  if (!result) return
  try { await reportsApi.processReportReportsReportIdProcessPost(id, { result }); showSnackbar('已处理'); fetchReports(currentPage.value) }
  catch (e) { showSnackbar(e.response?.data?.detail || '处理失败') }
}

onMounted(() => fetchReports(1))
</script>

<style scoped>
.admin-view { padding: 20px; }
.report-content { margin-bottom: 10px; line-height: 1.5; font-size: 14px; color: #333; }
.report-content div { margin: 5px 0; }
.report-content strong { color: #007bff; }
.reporter-info { background-color: #f0f8ff; padding: 4px; border-radius: 4px; }
.reported-info { background-color: #fff9c4; padding: 4px; border-radius: 4px; }
.processed-info { background-color: #e8f5e9; padding: 4px; border-radius: 4px; }
.reporter-info strong { color: #1e88e5; }
.reported-info strong { color: #d32f2f; }
.processed-info strong { color: #aa00ff; }
</style>

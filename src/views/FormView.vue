<template>
  <Container>
    <v-sheet v-if="isAdmin" color="#ffffff7f" rounded="lg">
      <div class="card">
        <v-textarea
          v-model="message"
          label="分享你的故事吧"
          variant="underlined"
        >
        </v-textarea>
        <div v-if="uploadPreviews.length > 0" class="upload-grid mb-2">
          <div v-for="(img, i) in uploadPreviews" :key="i" class="upload-item">
            <v-img :src="img" cover aspect-ratio="1" width="80" class="rounded" />
            <svg viewBox="0 0 24 24" width="18" height="18" class="upload-remove" @click="removeImage(i)">
              <path :d="mdiClose"></path>
            </svg>
          </div>
          <div v-if="uploadPreviews.length < 9" class="upload-add" @click="triggerFileInput">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path :d="mdiPlus"></path>
            </svg>
          </div>
        </div>
        <div class="d-flex align-center" style="gap: 8px">
          <svg v-if="uploadPreviews.length === 0" viewBox="0 0 24 24" width="24" height="24" style="cursor:pointer; color:#999" @click="triggerFileInput">
            <path :d="mdiImageOutline"></path>
          </svg>
          <v-spacer />
          <v-btn @click="pub">发布</v-btn>
        </div>
        <input ref="fileInput" type="file" accept="image/*" multiple style="display:none" @change="onFilesSelected" />
      </div>
    </v-sheet>

    <div style="height: 15px;">
      <svg style="float: right" viewBox="0 0 24 24" width="16" height="16" @click="fetchMessages" ref="refreshIcon"
           class="refresh-icon"
      >
        <path :d="mdiRefresh"></path>
      </svg>
    </div>

    <v-sheet color="#ffffff7f" rounded="lg">
      <div style="height: 15px;"></div>
      <div v-for="post in messages" :key="post.id">
        <v-slide-y-transition appear>
          <div>
            <Post :post="post" :reply-open="activeReply === post.id" :is-admin="isAdmin" @deleted="handlePostDeleted" @toggle-reply="activeReply = activeReply === post.id ? null : post.id"/>
          </div>
        </v-slide-y-transition>
      </div>

      <div v-if="isLoading" class="text-center my-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>

      <div v-if="!hasMoreData && messages.length > 0" class="text-center my-4">
        <span>已经……被榨干了</span>
      </div>

      <div style="height: 5px;"></div>

    </v-sheet>
  </Container>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import Container from '../components/Container.vue'
  import Post from '../components/Post.vue'
  import {user, messagesApi, client} from "@/js/api.js";
  import { showSnackbar, openLoginDialog } from "@/js/userDialog.js";
  import {mdiRefresh, mdiClose, mdiPlus, mdiImageOutline} from "@mdi/js";
  const refreshIcon = ref(null);
  const messages = ref([])
  const activeReply = ref(null)
  const isLoading = ref(false);
  const hasMoreData = ref(true);
  const isAdmin = ref(false)
  let latestMessage = null
  let lastMessage = null
  let isRefreshing = false;

  const fetchMessages = async () => {
    if (isRefreshing) return;
    isRefreshing = true;
    if (refreshIcon.value) refreshIcon.value.classList.add('rotating');
    try {
      let newMessages;
      if (!latestMessage) {
        const resp = await messagesApi.listMessagesMessagesGet(undefined, undefined, 10, undefined)
        newMessages = (Array.isArray(resp.data) ? resp.data : [])
      } else {
        const resp = await messagesApi.listMessagesMessagesGet(latestMessage.created_at, undefined, 10, latestMessage.id)
        newMessages = (Array.isArray(resp.data) ? resp.data : [])
      }

      if (newMessages.length > 0) {
        
        messages.value = [...newMessages, ...messages.value]
        latestMessage = newMessages[0]
        if (!lastMessage) lastMessage = newMessages[newMessages.length - 1]
      }
    } catch (error) {
      console.error('获取消息失败:', error)
    } finally {
      setTimeout(() => {
        if (refreshIcon.value) refreshIcon.value.classList.remove('rotating');
        isRefreshing = false;
      }, 1000);
    }
  }

  const loadMore = async () => {
    isLoading.value = true
    let newMessages;
    try {
      const resp = await messagesApi.listMessagesMessagesGet(undefined, lastMessage.created_at, 10, lastMessage.id)
      newMessages = (Array.isArray(resp.data) ? resp.data : [])
    } catch (error) {
      console.error('获取消息失败:', error)
      isLoading.value = false
      return
    }
    if (newMessages.length > 0) {
      messages.value = [...messages.value, ...newMessages]
      lastMessage = newMessages[newMessages.length - 1]
    }
    if (newMessages.length < 10) hasMoreData.value = false
    isLoading.value = false
  }

  // 发布
  const message = ref("")
  const fileInput = ref(null)
  const uploadPreviews = ref([])
  const uploadFiles = ref([])

  function triggerFileInput() {
    (fileInput.value)?.click()
  }

  function onFilesSelected(e) {
    const input = e.target
    if (!input.files) return
    const remaining = 9 - uploadPreviews.value.length
    const files = Array.from(input.files).slice(0, remaining)
    for (const f of files) {
      uploadFiles.value.push(f)
      uploadPreviews.value.push(URL.createObjectURL(f))
    }
    input.value = ''
  }

  function removeImage(i) {
    URL.revokeObjectURL(uploadPreviews.value[i])
    uploadPreviews.value.splice(i, 1)
    uploadFiles.value.splice(i, 1)
  }

  const pub = () => {
    if (!user.value) { showSnackbar("请先登录"); openLoginDialog(); return }
    if (message.value.trim() === "") return
    const form = new FormData()
    form.append('content', message.value.trim())
    uploadFiles.value.forEach(f => form.append('images', f))
    client.post('/messages', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(() => {
      message.value = ""
      uploadPreviews.value.forEach(u => URL.revokeObjectURL(u))
      uploadPreviews.value = []
      uploadFiles.value = []
      fetchMessages()
      showSnackbar("发布成功")
    }).catch(err => {
      showSnackbar(err.response?.data?.detail || '发布失败')
    })
  }

  const handlePostDeleted = (postId) => {
    const index = messages.value.findIndex(msg => msg.id === postId);
    if (index !== -1) { messages.value.splice(index, 1); showSnackbar("删除成功"); }
  }

  let pollTimer = null

  function onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      if (!hasMoreData.value || isLoading.value) return
      loadMore()
    }
  }

  async function checkAdmin() {
    try {
      const resp = await client.get('/admin/check')
      isAdmin.value = !!resp.data.is_admin
    } catch {
      isAdmin.value = false
    }
  }

  onMounted(() => {
    checkAdmin()
    fetchMessages()
    pollTimer = setInterval(fetchMessages, 15000)
    window.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    if (pollTimer) { clearInterval(pollTimer); pollTimer = null }
    window.removeEventListener('scroll', onScroll)
  })

</script>

<style>
  .card { padding: 10px; }
  .upload-grid { display: flex; flex-wrap: wrap; gap: 6px; }
  .upload-item { position: relative; }
  .upload-remove {
    position: absolute; top: -6px; right: -6px;
    fill: #fff; background: rgba(0,0,0,0.5);
    border-radius: 50%; padding: 2px; cursor: pointer;
  }
  .upload-add {
    width: 80px; height: 80px;
    border: 2px dashed #ccc; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #999;
  }
  .upload-add:hover { border-color: #1976d2; color: #1976d2; }
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .refresh-icon { transition: transform 0.3s ease; cursor: pointer; }
  .refresh-icon.rotating { animation: rotate 1s linear infinite; }
</style>

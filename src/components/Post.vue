<template>
  <v-card class="pa-4 mb-4" elevation="2">
    <v-menu>
      <template v-slot:activator="{ props }">
          <svg viewBox="0 0 24 24" width="16" height="16" v-bind="props" class="post-menu-btn">
            <path :d="mdiDotsVertical"></path>
          </svg>
      </template>
      <v-list density="compact" rounded="lg">
        <v-list-item @click="deletePost" value="delete">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path :d="mdiDelete"></path>
          </svg>
        </v-list-item>
        <v-list-item @click="reportPost" value="report">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path :d="mdiAlert"></path>
          </svg>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-row no-gutters align="start" class="d-flex">
      <v-col cols="auto" class="mr-4">
        <v-menu v-model="menu" :close-on-content-click="false" location="bottom" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-avatar size="48" v-bind="props" color="grey lighten-3">
              <v-img v-if="user.avatar_url" :src="user.avatar_url" alt="err" />
              <span v-else class="white--text" style="font-size: 0.8rem">我很<br/>神秘</span>
            </v-avatar>
          </template>
          <User :user="user"></User>
        </v-menu>
      </v-col>

      <v-col>
        <div class="text-h6" style="color: #494949">{{ user.username }}</div>
        <div class="text-caption" style="color: #9e9e9e">{{ formatTime(post.created_at) }}</div>
        <div class="mt-2" style="white-space: pre-line">{{ post.content }}</div>

        <!-- 图片网格 -->
        <div v-if="images.length > 0" class="image-grid mt-3">
          <div v-for="(img, i) in images" :key="i" class="image-item" @click="openPreview(i)">
            <v-img :src="img" cover aspect-ratio="1" class="rounded" />
          </div>
        </div>
        <Teleport to="body">
          <div v-if="showPreview" class="preview-overlay" @click.self="showPreview = false">
            <div class="preview-inner">
              <svg viewBox="0 0 24 24" width="32" height="32" class="preview-close" @click="showPreview = false">
                <path :d="mdiClose"></path>
              </svg>
              <img :src="images[previewIndex]" class="preview-image" @click.stop />
              <div class="preview-nav" @click.stop>
                <svg viewBox="0 0 24 24" width="32" height="32" class="preview-arrow" @click="navigatePreview(-1)">
                  <path :d="mdiChevronLeft"></path>
                </svg>
                <span class="preview-count">{{ previewIndex + 1 }} / {{ images.length }}</span>
                <svg viewBox="0 0 24 24" width="32" height="32" class="preview-arrow" @click="navigatePreview(1)">
                  <path :d="mdiChevronRight"></path>
                </svg>
              </div>
            </div>
          </div>
        </Teleport>

        <div class="operate">
          <template v-if="isAdmin">
            <svg viewBox="0 0 24 24" width="3.05%" class="like" :class="{ 'liked': liked }" @click="toggleLike">
              <path :d="likePath"></path>
            </svg>
            <span class="info">{{ likes }}</span>
            <svg viewBox="0 0 24 24" width="3.05%" class="dislike" :class="{ 'disliked': disliked }" @click="toggleDislike">
              <path :d="dislikePath"></path>
            </svg>
            <span class="info">{{ dislikes }}</span>
            <span class="reply-link" @click="emit('toggleReply')">{{ props.replyOpen ? '收起' : '回复' }}</span>
          </template>
        </div>

        <div v-if="comments.length > 0 || (isAdmin && props.replyOpen)" class="comments-section">
          <v-divider class="my-3" />
          <div v-for="c in comments" :key="c.id" class="comment-item mb-2">
            <div class="d-flex align-start">
              <v-avatar size="28" class="mr-2" color="grey lighten-3">
                <v-img v-if="c.author_avatar_url" :src="c.author_avatar_url" />
                <span v-else class="text-caption">?</span>
              </v-avatar>
              <div>
                <div class="d-flex align-center" style="gap: 6px">
                  <span class="text-caption">{{ c.author_account }}</span>
                  <span class="text-caption" style="color: #9e9e9e">{{ formatTime(c.created_at) }}</span>
                </div>
                <div class="text-body-2 mt-1">{{ c.content }}</div>
              </div>
            </div>
          </div>
          <div v-if="isAdmin && props.replyOpen" class="mt-2">
            <v-textarea
              v-model="newComment"
              placeholder="写评论..."
              variant="plain"
              density="compact"
              hide-details
              auto-grow
              rows="1"
              class="comment-input"
            />
            <div class="d-flex justify-end mt-1">
              <v-btn variant="text" size="small" @click="addComment" :disabled="!newComment.trim()">
                发送
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mdiThumbUp, mdiThumbUpOutline, mdiThumbDown, mdiThumbDownOutline, mdiDotsVertical, mdiDelete, mdiAlert, mdiClose, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import type {MessagePublic, CommentPublic} from "@/js/server-api";
import {formatTime, messagesApi, user as me} from "@/js/api";
import {showSnackbar, showInputDialog, openLoginDialog} from "@/js/userDialog";
import User from "@/components/User.vue";

const props = defineProps<{
  post: MessagePublic,
  replyOpen: boolean,
  isAdmin: boolean,
}>();

const emit = defineEmits<{
  (e: 'deleted', postId: number): void;
  (e: 'toggleReply'): void;
}>();

const menu = ref(false);
const comments = ref<CommentPublic[]>(props.post.comments || []);
const newComment = ref('');
const previewIndex = ref(0);
const showPreview = ref(false);

const post = ref<MessagePublic>(props.post);
const user = ref({ id: props.post.author_id, username: props.post.author_account, avatar_url: props.post.author_avatar_url });

const images = ref<string[]>(
  (props.post.images || []).map((img: any) => img.url)
);

function openPreview(i: number) {
  previewIndex.value = i;
  showPreview.value = true;
}

function navigatePreview(dir: number) {
  previewIndex.value = (previewIndex.value + dir + images.value.length) % images.value.length;
}

const liked = ref(!!post.value.liked);
const likes = ref(post.value.likes);
const likePath = ref(liked.value ? mdiThumbUp : mdiThumbUpOutline);

const disliked = ref(!!post.value.disliked);
const dislikes = ref(post.value.dislikes || 0);
const dislikePath = ref(disliked.value ? mdiThumbDown : mdiThumbDownOutline);

const toggleDislike = async () => {
  if (!me.value) { openLoginDialog(); return }
  try {
    if (!disliked.value) {
      await messagesApi.dislikeMsgMessagesItemMessageIdDislikePost(post.value.id);
      dislikes.value++;
      if (liked.value) { likes.value = Math.max(0, likes.value - 1); liked.value = false; likePath.value = mdiThumbUpOutline; }
    } else {
      await messagesApi.undislikeMsgMessagesItemMessageIdDislikeDelete(post.value.id);
      dislikes.value--;
    }
    disliked.value = !disliked.value;
    dislikePath.value = disliked.value ? mdiThumbDown : mdiThumbDownOutline;
  } catch (error) {
    showSnackbar(error.response.data.detail)
  }
};

const toggleLike = async () => {
  if (!me.value) { openLoginDialog(); return }
  try {
    if (!liked.value) {
      await messagesApi.likeMessageMessagesItemMessageIdLikePost(post.value.id);
      likes.value++;
      if (disliked.value) { dislikes.value = Math.max(0, dislikes.value - 1); disliked.value = false; dislikePath.value = mdiThumbDownOutline; }
    } else {
      await messagesApi.unlikeMessageMessagesItemMessageIdLikeDelete(post.value.id);
      likes.value--;
    }
    liked.value = !liked.value;
    likePath.value = liked.value ? mdiThumbUp : mdiThumbUpOutline;
  } catch (error) {
    showSnackbar(error.response.data.detail)
  }
};

const addComment = async () => {
  const text = newComment.value.trim()
  if (!text) return
  try {
    const resp = await messagesApi.createCommentHandlerMessagesItemMessageIdCommentsPost(post.value.id, { content: text })
    newComment.value = ''
    comments.value.push(resp.data)
  } catch (err) {
    showSnackbar(err.response?.data?.detail || '评论失败')
  }
};


const deletePost = () => {
  if (!me.value) { openLoginDialog(); return }
  if (me.value.id != post.value.author_id) { showSnackbar('不能删除人家的帖子！'); return }
  messagesApi.deleteMessageMessagesItemMessageIdDelete(post.value.id).then(() => {
    emit('deleted', post.value.id);
  }).catch(error => {
    showSnackbar(error.response.data.detail)
  });
};

const reportPost = async () => {
  if (!me.value) { openLoginDialog(); return }
  if (me.value.id == post.value.author_id) { showSnackbar('不能举报自己的帖子！'); return }
  const reason = await showInputDialog({ title: '举报帖子', text: '请输入举报理由：' });
  if (!reason) return
  messagesApi.reportMessageMessagesItemMessageIdReportPost(post.value.id, { reason }).then(response => {
    showSnackbar('举报成功！id: ' + (response.data.id ?? response.data.report?.id));
  }).catch(error => {
    showSnackbar(error.response.data.detail, 5000)
  })
}
</script>

<style scoped>
.v-card {
  max-width: 100%;
  height: auto;
  margin: 0 12px;
}

.v-avatar img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  max-width: 500px;
}
.image-item {
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
}
.image-item:hover {
  opacity: 0.85;
}
.preview-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.85); z-index: 9999;
  display: flex; align-items: center; justify-content: center;
}
.preview-inner {
  position: relative; display: inline-block; max-width: 90vw; max-height: 90vh;
}
.preview-image {
  display: block; max-width: 90vw; max-height: 85vh; object-fit: contain;
}
.preview-close {
  position: absolute; top: 4px; right: 4px; z-index: 10;
  fill: #fff; background: rgba(0,0,0,0.5);
  border-radius: 50%; padding: 4px; cursor: pointer;
}
.preview-nav {
  display: flex; justify-content: center; align-items: center; gap: 16px;
  padding-top: 8px;
}
.preview-arrow {
  fill: #fff; cursor: pointer;
  background: rgba(255,255,255,0.15); border-radius: 50%; padding: 4px;
}
.preview-count {
  color: #fff; font-size: 0.9rem;
}

.operate {
  padding-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info {
  color: gray;
}

.reply-link {
  color: #9e9e9e;
  font-size: 0.85rem;
  cursor: pointer;
  user-select: none;
}
.reply-link:hover {
  color: #1976d2;
}

.like {
  transition: transform 0.3s ease, fill 0.3s ease;
  cursor: pointer;
}
.like.liked {
  fill: deepskyblue;
}
.like:not(.liked) {
  fill: gray;
}
.like:hover {
  transform: scale(1.2);
}

.dislike {
  transition: transform 0.3s ease, fill 0.3s ease;
  cursor: pointer;
}
.dislike.disliked {
  fill: #e57373;
}
.dislike:not(.disliked) {
  fill: gray;
}
.dislike:hover {
  transform: scale(1.2);
}

.post-menu-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0.7;
}

.comment-input {
  flex: 1;
}

.comment-input :deep(.v-field) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.comment-input :deep(.v-field--focused) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>

<template>
  <div class="cat-board" ref="boardRef"
    @mousedown.prevent="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
  >
    <p v-if="cats.length === 0 && !drawing" class="hint">用鼠标框一个形状，就会获得一张图</p>
    <div v-if="drawing" class="selection-rect" :style="previewStyle"></div>
    <img v-for="cat in cats" :key="cat.id"
      :src="cat.url" :style="{ left: cat.x + 'px', top: cat.y + 'px', width: cat.w + 'px', height: cat.h + 'px' }"
      class="cat-img"
    />
    <div v-if="loading" class="loading-overlay" :style="loadingStyle">喵~</div>
    <div v-if="errorMsg" class="error-overlay" :style="errorStyle">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'

const cats = ref([])
const drawing = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const startPos = reactive({ x: 0, y: 0 })
const currentPos = reactive({ x: 0, y: 0 })
const lastRect = reactive({ x: 0, y: 0, w: 0, h: 0 })
const boardRef = ref(null)
let nextId = 0

const previewStyle = computed(() => {
  const left = Math.min(startPos.x, currentPos.x)
  const top = Math.min(startPos.y, currentPos.y)
  const w = Math.abs(currentPos.x - startPos.x)
  const h = Math.abs(currentPos.y - startPos.y)
  return { left: left + 'px', top: top + 'px', width: w + 'px', height: h + 'px' }
})

const loadingStyle = computed(() => ({
  left: lastRect.x + 'px',
  top: lastRect.y + 'px',
  width: lastRect.w + 'px',
  height: lastRect.h + 'px',
  lineHeight: lastRect.h + 'px',
}))

const errorStyle = computed(() => ({
  left: lastRect.x + 'px',
  top: lastRect.y + 'px',
  width: lastRect.w + 'px',
  height: lastRect.h + 'px',
  lineHeight: lastRect.h + 'px',
}))

function clientToBoard(clientX, clientY) {
  const b = boardRef.value
  if (!b) return { x: 0, y: 0 }
  const r = b.getBoundingClientRect()
  return { x: clientX - r.left, y: clientY - r.top }
}

function onMouseDown(e) {
  const { x, y } = clientToBoard(e.clientX, e.clientY)
  startPos.x = x
  startPos.y = y
  currentPos.x = x
  currentPos.y = y
  drawing.value = true
}

function onMouseMove(e) {
  if (!drawing.value) return
  const { x, y } = clientToBoard(e.clientX, e.clientY)
  currentPos.x = x
  currentPos.y = y
}

async function onMouseUp() {
  if (!drawing.value) return
  drawing.value = false
  const left = Math.min(startPos.x, currentPos.x)
  const top = Math.min(startPos.y, currentPos.y)
  const w = Math.abs(currentPos.x - startPos.x)
  const h = Math.abs(currentPos.y - startPos.y)
  if (w < 10 || h < 10) return

  const rw = Math.round(w)
  const rh = Math.round(h)
  lastRect.x = left
  lastRect.y = top
  lastRect.w = rw
  lastRect.h = rh

  loading.value = true
  const url = `https://placecats.com/${rw}/${rh}`
  const img = new Image()
  img.onload = () => {
    cats.value.push({ id: nextId++, url, x: left, y: top, w: rw, h: rh })
    loading.value = false
  }
  img.onerror = () => {
    loading.value = false
    errorMsg.value = '加载失败'
    setTimeout(() => { errorMsg.value = '' }, 1000)
  }
  img.src = url
}
</script>

<style scoped>
.cat-board {
  position: relative;
  width: 100%;
  min-height: 420px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: crosshair;
  user-select: none;
}
.hint {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
  font-size: 1rem;
  pointer-events: none;
  margin: 0;
}
.selection-rect {
  position: absolute;
  border: 2px dashed #ff6b6b;
  background: rgba(255, 107, 107, 0.08);
  pointer-events: none;
  z-index: 2;
}
.cat-img {
  position: absolute;
  border-radius: 4px;
  z-index: 1;
}
.loading-overlay {
  position: absolute;
  color: #ff6b6b;
  font-size: 1.2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.85);
  z-index: 3;
  pointer-events: none;
}
.error-overlay {
  position: absolute;
  color: #e53935;
  font-size: 1rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.85);
  z-index: 3;
  pointer-events: none;
}
</style>

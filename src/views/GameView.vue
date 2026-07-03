<template>
  <div ref="gameContainer" class="game-page">
    <canvas ref="canvasRef" class="game-canvas" />

    <!-- 弹幕输入 -->
    <div v-if="gameState === 'ready'" class="overlay">
      <div class="modal" style="max-height: 90vh; overflow-y: auto">
        <h2>输入弹幕</h2>
        <div class="bilibili-section" style="border-top: none; padding-top: 0; margin-top: 0;">
          <div class="text-subtitle-2 mb-1" style="color:#fb7299">🎬 输入B站视频BV号</div>
          <v-text-field
            v-model="bvid"
            label="输入B站视频BV号"
            variant="outlined"
            dark
            hide-details
            density="compact"
            placeholder="例: BV1tHLa6GEWw"
            class="mb-2"
          />
        </div>
        <v-btn color="primary" block class="mb-4" :disabled="!bvid.trim()" @click="sendBarrageAndPlay">开始游戏</v-btn>
      </div>
    </div>

    <!-- 游戏结束 + 排名 -->
    <div v-if="gameState === 'gameover'" class="overlay">
      <div class="modal gameover">
        <h2>游戏结束</h2>
        <p class="score">最终得分：{{ finalScore }}</p>
        <v-btn color="primary" class="mr-2" @click="restartGame()">再来一局</v-btn>
        <v-btn variant="tonal" @click="returnToMenu">返回菜单</v-btn>
      </div>
    </div>

    <!-- 操作提示 -->
    <div v-if="gameState === 'playing'" class="hint">
      <span>WASD/方向键 移动 | 空格 射击</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'

// ---- Game State ----
const gameState = ref('idle')
const score = ref(0)
const ammo = ref(30)
const finalScore = ref(0)
const barrageText = ref('')
const GAME_COLORS = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b','#cc5de8','#20c997','#ffffff']
const barrageColor = ref(GAME_COLORS[Math.floor(Math.random() * GAME_COLORS.length)])
const bvid = ref('')
const usingBilibili = ref(false)

// ---- Canvas ----
const canvasRef = ref(null)
const gameContainer = ref(null)
let ctx = null, canvasWidth = 0, canvasHeight = 0
let animFrameId = 0, lastTime = 0, gameTime = 0

// ---- Config ----
const G = {
  PLAYER_SPEED: 300, BULLET_SPEED: 700, BULLET_MAX: 30, BULLET_REFILL_TIME: 0.12, FIRE_INTERVAL: 0.1,
  MAX_ACTIVE_BARRAGES: 10, BARRAGE_SPEED_MIN: 80, BARRAGE_SPEED_MAX: 220, BARRAGE_FONT_MIN: 18, BARRAGE_FONT_MAX: 46,
  STAR_COUNT: 200, PARTICLE_COUNT_MIN: 10, PARTICLE_COUNT_MAX: 20, PARTICLE_SPEED_MIN: 60,
  PARTICLE_SPEED_MAX: 240, PARTICLE_LIFE_MIN: 0.3, PARTICLE_LIFE_MAX: 0.7,
  PLAYER_X: 150,
}

const stars = []
const player = reactive({ x: 150, y: 300, width: 40, height: 30 })
const bullets = []
let lastFireTime = 0, lastRefillTime = 0
const barrages = [], barragePool = []
let barragePoolIndex = 0
let newestTime = null, oldestTime = null

// 排行榜 + 防篡改（已禁用）
const barragesDestroyed = ref(0)
let gameStartTime = 0
const particles = []
const keys = {}

// ---- Init ----
function init() {
  gameState.value = 'ready'
}

// ---- Barrage fetching ----
const POOL_SIZE = 100

async function fetchBilibiliDanmaku(bv) {
  try {
    const resp = await fetch(`http://127.0.0.1:8000/barrages/bilibili?bvid=${bv}`)
    if (!resp.ok) return []
    const data = await resp.json()
    return (data.texts || []).map(t => ({ text: t.text, color: GAME_COLORS[Math.floor(Math.random() * GAME_COLORS.length)] }))
  } catch { return [] }
}

async function sendBarrageAndPlay() {
  if (!bvid.value.trim()) return
  newestTime = null; oldestTime = null
  const biliItems = await fetchBilibiliDanmaku(bvid.value.trim())
  if (biliItems.length > 0) {
    barragePool.length = 0; barragePool.push(...biliItems); barragePoolIndex = 0
    usingBilibili.value = true
  }
  startGame()
}

// ---- Game Control ----
function startGame() {
  score.value = 0; ammo.value = G.BULLET_MAX
  bullets.length = 0; barrages.length = 0; particles.length = 0; gameTime = 0
  lastFireTime = 0; lastRefillTime = 0
  barragesDestroyed.value = 0; gameStartTime = Date.now()
  resizeCanvas(); player.y = canvasHeight / 2; player.x = G.PLAYER_X
  gameState.value = 'playing'; lastTime = performance.now()
}
async function gameOver() {
  gameState.value = 'gameover'; finalScore.value = score.value
}
async function restartGame() {
  barrageColor.value = GAME_COLORS[Math.floor(Math.random() * GAME_COLORS.length)]
  startGame()
}
function returnToMenu() {
  barrageColor.value = GAME_COLORS[Math.floor(Math.random() * GAME_COLORS.length)]
  barrageText.value = ''
  gameState.value = 'ready'
}

// ---- Canvas ----
function initCanvas() {
  const c = canvasRef.value; if (!c) return
  ctx = c.getContext('2d'); resizeCanvas()
}
function resizeCanvas() {
  const c = canvasRef.value
  if (!c) return
  canvasWidth = window.innerWidth
  canvasHeight = window.innerHeight
  c.width = canvasWidth; c.height = canvasHeight
}
function initStars() {
  if (canvasWidth <= 0 || canvasHeight <= 0) return
  stars.length = 0
  for (let i = 0; i < G.STAR_COUNT; i++) stars.push({
    x: Math.random() * canvasWidth, y: Math.random() * canvasHeight,
    radius: Math.random() * 1.5 + 0.5, brightness: Math.random(), speed: Math.random() * 30 + 10,
  })
}

function render() {
  if (!ctx) return; const c = ctx
  c.fillStyle = '#0a0a1a'; c.fillRect(0, 0, canvasWidth, canvasHeight)
  for (const s of stars) {
    const a = 0.3 + 0.7 * Math.sin(gameTime * s.speed * 0.1 + s.brightness * Math.PI * 2)
    c.fillStyle = `rgba(255,255,255,${a * 0.6})`; c.beginPath(); c.arc(s.x, s.y, s.radius, 0, Math.PI * 2); c.fill()
  }
  if (gameState.value === 'playing' || gameState.value === 'gameover') {
    drawPlayer(c)
    for (const b of bullets) { c.fillStyle = '#00ffff'; c.shadowColor = '#00ffff'; c.shadowBlur = 8; c.beginPath(); c.arc(b.x, b.y, b.radius, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0 }
    for (const bg of barrages) {
      const alpha = gameState.value === 'gameover' ? 0.5 : 1
      c.font = `bold ${bg.fontSize}px "Microsoft YaHei","PingFang SC",sans-serif`; c.textBaseline = 'middle'; c.textAlign = 'center'
      c.globalAlpha = alpha; c.fillStyle = bg.color; c.shadowColor = bg.color; c.shadowBlur = 6
      c.fillText(bg.text, bg.x, bg.y); c.shadowBlur = 0
    }
    for (const p of particles) {
      c.globalAlpha = p.life / p.maxLife; c.fillStyle = p.color
      c.beginPath(); c.arc(p.x, p.y, p.size, 0, Math.PI * 2); c.fill()
    }
    c.globalAlpha = 1; c.textAlign = 'left'
    c.fillStyle = '#ffffff'; c.font = 'bold 16px monospace'
    c.fillText(`得分: ${score.value}`, 20, 30); c.fillText(`弹药: ${ammo.value}/${G.BULLET_MAX}`, 20, 52)
  }
  if (gameState.value === 'idle' || gameState.value === 'ready') {
    for (const bg of barrages) {
      c.font = `${bg.fontSize}px "Microsoft YaHei","PingFang SC",sans-serif`; c.textBaseline = 'middle'; c.textAlign = 'center'
      c.globalAlpha = 0.5; c.fillStyle = bg.color; c.fillText(bg.text, bg.x, bg.y)
    }
    c.globalAlpha = 1; c.textAlign = 'left'
  }
}
function drawPlayer(c) {
  const { x, y, width: w, height: h } = player
  c.save(); c.translate(x, y)
  c.fillStyle = '#4488ff'; c.beginPath(); c.moveTo(w/2,0); c.lineTo(-w/2,-h/2); c.lineTo(-w/4,0); c.lineTo(-w/2,h/2); c.closePath(); c.fill()
  c.fillStyle = '#ff8844'; c.beginPath(); c.arc(-w/4-4,0,5,0,Math.PI*2); c.fill(); c.restore()
}

function update(dt) {
  if (gameState.value !== 'playing') return
  const sp = G.PLAYER_SPEED * dt
  if (keys['KeyW']||keys['ArrowUp']) player.y -= sp
  if (keys['KeyS']||keys['ArrowDown']) player.y += sp
  if (keys['KeyA']||keys['ArrowLeft']) player.x -= sp
  if (keys['KeyD']||keys['ArrowRight']) player.x += sp
  player.x = Math.max(player.width/2, Math.min(canvasWidth-player.width/2, player.x))
  player.y = Math.max(player.height/2, Math.min(canvasHeight-player.height/2, player.y))
  if (keys['Space'] && gameTime-lastFireTime > G.FIRE_INTERVAL && ammo.value>0) { fireBullet(); lastFireTime = gameTime }
  if (!keys['Space'] && ammo.value < G.BULLET_MAX && gameTime-lastRefillTime > G.BULLET_REFILL_TIME) { ammo.value++; lastRefillTime = gameTime }
  for (let i=bullets.length-1; i>=0; i--) { bullets[i].x += G.BULLET_SPEED*dt; if (bullets[i].x > canvasWidth+20) bullets.splice(i,1) }
  for (const bg of barrages) bg.x -= bg.speed*dt
  for (let i=barrages.length-1; i>=0; i--) if (barrages[i].x+barrages[i].width<0) barrages.splice(i,1)
  if (barragePool.length > 0) {
    while (barrages.length < G.MAX_ACTIVE_BARRAGES) spawnBarrage()
  }
  for (let bi=bullets.length-1; bi>=0; bi--) {
    const b = bullets[bi]; let hit = false
    for (let gi=barrages.length-1; gi>=0; gi--) {
      const bg = barrages[gi]
      if (b.x+b.radius>bg.x-bg.width/2 && b.x-b.radius<bg.x+bg.width/2 && b.y+b.radius>bg.y-bg.height/2 && b.y-b.radius<bg.y+bg.height/2) {
        spawnExplosion(b.x,b.y,bg.color); score.value += bg.text.length; bullets.splice(bi,1)
        if (bg.text.length>1) { bg.text = bg.text.slice(1); if (ctx) { ctx.font = `bold ${bg.fontSize}px "Microsoft YaHei","PingFang SC",sans-serif`; bg.width = ctx.measureText(bg.text).width } }
        else barrages.splice(gi,1)
        hit = true; break
      }
    }
    if (hit) continue
  }
  const px=player.x,py=player.y,pw=player.width,ph=player.height
  for (const bg of barrages) {
    if (px-pw/2<bg.x+bg.width/2 && px+pw/2>bg.x-bg.width/2 && py-ph/2<bg.y+bg.height/2 && py+ph/2>bg.y-bg.height/2) { spawnExplosion(px,py,'#ff4444'); spawnExplosion(px,py,'#ffaa00'); gameOver(); return }
  }
  for (let i=particles.length-1; i>=0; i--) { const p=particles[i]; p.x+=p.vx*dt; p.y+=p.vy*dt; p.life-=dt; if (p.life<=0) particles.splice(i,1) }
}
function fireBullet() { ammo.value--; lastRefillTime = gameTime; bullets.push({x:player.x+player.width/2, y:player.y, radius:4}) }
function spawnBarrage() {
  if (barragePool.length===0) return
  const d = barragePool[barragePoolIndex%barragePool.length]; barragePoolIndex++
  const fs = G.BARRAGE_FONT_MIN+Math.random()*(G.BARRAGE_FONT_MAX-G.BARRAGE_FONT_MIN)
  if (ctx) { ctx.font = `bold ${fs}px "Microsoft YaHei","PingFang SC",sans-serif`; const m = ctx.measureText(d.text)
  const minY = 50, maxY = Math.max(canvasHeight - 50, minY + 1)
  barrages.push({text:d.text, x:canvasWidth+m.width/2+Math.random()*canvasWidth, y:minY+Math.random()*(maxY-minY), speed:G.BARRAGE_SPEED_MIN+Math.random()*(G.BARRAGE_SPEED_MAX-G.BARRAGE_SPEED_MIN), fontSize:fs, color:d.color, width:m.width, height:fs*1.2}) }
}
function spawnExplosion(x,y,color) {
  barragesDestroyed.value++
  const n = G.PARTICLE_COUNT_MIN+Math.floor(Math.random()*(G.PARTICLE_COUNT_MAX-G.PARTICLE_COUNT_MIN))
  for (let i=0;i<n;i++) { const a=Math.random()*Math.PI*2, sp=G.PARTICLE_SPEED_MIN+Math.random()*(G.PARTICLE_SPEED_MAX-G.PARTICLE_SPEED_MIN)
  const life = G.PARTICLE_LIFE_MIN+Math.random()*(G.PARTICLE_LIFE_MAX-G.PARTICLE_LIFE_MIN)
  particles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life,maxLife:life,color,size:1+Math.random()*3}) }
}
function gameLoop(now) {
  animFrameId = requestAnimationFrame(gameLoop)
  if (stars.length === 0 && canvasWidth > 0 && canvasHeight > 0) initStars()
  const dt = Math.min((now-lastTime)/1000, 0.1); lastTime = now
  gameTime += dt
  if (gameState.value !== 'playing') {
    if (barragePool.length > 0) {
      while (barrages.length < G.MAX_ACTIVE_BARRAGES) spawnBarrage()
    }
    for (const bg of barrages) bg.x -= bg.speed*dt
    for (let i=barrages.length-1; i>=0; i--) if (barrages[i].x+barrages[i].width<-50) barrages.splice(i,1)
  }
  update(dt); render()
}
function onKD(e) { keys[e.code]=true; if (e.code==='Space') e.preventDefault() }
function onKU(e) { keys[e.code]=false }
function onResize() { resizeCanvas(); initStars() }

onMounted(async () => {
  await nextTick()
  initCanvas()
  init()
  lastTime = performance.now()
  animFrameId = requestAnimationFrame(gameLoop)
  window.addEventListener('keydown', onKD)
  window.addEventListener('keyup', onKU)
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  cancelAnimationFrame(animFrameId)
  window.removeEventListener('keydown', onKD)
  window.removeEventListener('keyup', onKU)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.game-page { width: 100%; height: 100%; overflow: hidden; background: #0a0a1a; position: relative; }
.game-canvas { display: block; }
.overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 20; }
.modal { background: #1a1a2e; border: 1px solid #333; border-radius: 12px; padding: 32px; min-width: 380px; text-align: center; color: #e0e0e0; }
.modal h2 { margin: 0 0 20px; font-size: 24px; color: #fff; }
.gameover { border: 2px solid #ff4444; }
.gameover .score { font-size: 28px; color: #ffd93d; font-weight: bold; margin: 12px 0 20px; }
.color-picker { display: flex; align-items: center; gap: 10px; margin: 8px 0; justify-content: center; color: #ccc; }
.color-picker input[type="color"] { width: 36px; height: 36px; padding: 0; border: none; border-radius: 4px; cursor: pointer; }
.hint { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.4); font-family: monospace; font-size: 13px; z-index: 5; pointer-events: none; }

.leaderboard { margin-top: 8px; }
.leaderboard h3 { font-size: 16px; color: #ffd93d; margin-bottom: 8px; }
.lb-row { display: flex; padding: 4px 8px; font-size: 13px; color: #ccc; border-bottom: 1px solid rgba(255,255,255,0.06); }
.lb-header { color: #888; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.12); }
.lb-rank { width: 30px; text-align: center; }
.lb-name { flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lb-score { width: 70px; text-align: right; }
.lb-games { width: 40px; text-align: right; }
.lb-self { background: rgba(77,150,255,0.15); border-radius: 4px; }
.rank-info { color: #ffd93d; font-size: 14px; margin: 4px 0 12px; }
.bilibili-section { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-top: 4px; }
.bilibili-notice { color: #fb7299; font-size: 11px; }
</style>

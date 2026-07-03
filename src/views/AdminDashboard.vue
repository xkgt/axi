<template>
  <Container>
    <v-row>
      <v-col cols="3" v-for="c in cards" :key="c.label">
        <v-card :color="c.color" class="pa-3 text-center" variant="tonal">
          <div class="text-h4 font-weight-bold">{{ c.value }}</div>
          <div class="text-caption">{{ c.label }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="6">
        <v-card class="pa-4" variant="tonal">
          <div class="text-subtitle-2 mb-2">CPU</div>
          <v-progress-linear :model-value="system.cpu_percent" color="blue" height="20" rounded>
            <template #default>{{ system.cpu_percent }}%</template>
          </v-progress-linear>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-4" variant="tonal">
          <div class="text-subtitle-2 mb-2">内存</div>
          <v-progress-linear :model-value="system.memory_percent" color="green" height="20" rounded>
            <template #default>{{ system.memory_percent }}%</template>
          </v-progress-linear>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mt-4 pa-4" variant="tonal">
      <div class="text-subtitle-2 mb-2">30日趋势</div>
      <canvas ref="chartCanvas" style="max-height:220px"></canvas>
    </v-card>
  </Container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Legend, Tooltip } from 'chart.js'
import { client } from "@/js/api.js"

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Legend, Tooltip)

const cards = ref([
  { label: '用户', value: 0, color: 'blue' },
  { label: '帖子', value: 0, color: 'green' },
  { label: '弹幕', value: 0, color: 'orange' },
  { label: '待处理举报', value: 0, color: 'red' },
])
const system = ref({ cpu_percent: 0, memory_percent: 0 })
const chartCanvas = ref(null)
let chart = null

onMounted(async () => {
  try {
    const resp = await client.get('/admin/dashboard')
    const d = resp.data
    cards.value = [
      { label: '用户', value: d.counts.users, color: 'blue' },
      { label: '帖子', value: d.counts.messages, color: 'green' },
      { label: '弹幕', value: d.counts.barrages, color: 'orange' },
      { label: '待处理举报', value: d.counts.reports_pending, color: 'red' },
    ]
    system.value = d.system
    chart = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: d.timeline.barrages.map(p => p.date.slice(5)),
        datasets: [
          { label: '弹幕', data: d.timeline.barrages.map(p => p.count), borderColor: '#ff922b', backgroundColor: 'transparent', tension: 0.3 },
          { label: '帖子', data: d.timeline.messages.map(p => p.count), borderColor: '#4d96ff', backgroundColor: 'transparent', tension: 0.3 },
          { label: '用户', data: d.timeline.users.map(p => p.count), borderColor: '#6bcb77', backgroundColor: 'transparent', tension: 0.3 },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } },
        scales: {
          x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } },
          y: { beginAtZero: true, ticks: { maxTicksLimit: 5 } },
        },
      },
    })
  } catch {}
})
</script>

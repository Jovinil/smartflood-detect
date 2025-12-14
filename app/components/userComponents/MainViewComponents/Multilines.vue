<style scoped>
/* ✅ Kill the filled "area" under the line (prevents black fill in exports) */
.waterlevel-chart :deep(svg path[fill]:not([fill="none"])) {
  fill: none !important;
}

/* ✅ Also kill common area gradients/opacity */
.waterlevel-chart :deep(svg path[fill*="url("]) {
  fill: none !important;
}
.waterlevel-chart :deep(svg [fill-opacity]) {
  fill-opacity: 0 !important;
}
</style>

<script lang="ts" setup>
import { useWaterLevelStore } from '~/app/stores/useWaterLevelStore'

interface AreaChartItem {
  createdAt: string
  waterLevel: number
  id: string
}

const props = defineProps<{
  moduleId?: string
  month?: number
  week?: number
  year?: number
  maxPoints?: number

  includeMonthDay?: boolean // ✅ NEW
}>()

const waterLevelStore = useWaterLevelStore()

let intervalId: ReturnType<typeof setInterval> | null = null

const categories: ComputedRef<Record<string, BulletLegendItemInterface>> =
  computed(() => ({
    waterLevel: {
      name: 'Water Level (cm)',
      color: '#22c55e',
    },
  }))

const MAX_POINTS = 6

// ✅ Fetch function that uses your updated endpoint parameters
const fetchFilteredLogs = async () => {
  await waterLevelStore.fetchWaterLevelLogs({
    moduleId: props.moduleId,
    month: props.month,
    week: props.week,
    year: props.year,
  })
}

// ✅ Refetch whenever dropdown props change
watch(
  () => [props.moduleId, props.month, props.week, props.year],
  async () => {
    console.log(props)
    await fetchFilteredLogs()
  },
  { immediate: true }
)

function formatXAxisLabel(dateStr: string) {
  const d = new Date(dateStr)

  // default: what you do now (time only)
  if (!props.includeMonthDay) {
    return d.toLocaleTimeString()
  }

  // if true: include month + day + time
  return d.toLocaleString(undefined, {
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const AreaChartData = computed<AreaChartItem[]>(() => {
  const mapped = waterLevelStore.waterLevelLogs.map((item) => ({
    id: item.id,
    createdAt: formatXAxisLabel(item.createdAt),
    waterLevel: item.waterLevel,
  }))

  if (props.maxPoints && props.maxPoints > 0) {
    return mapped.slice(-props.maxPoints)
  }

  return mapped
})

const xFormatter = (tick: number): string => {
  if (!AreaChartData.value.length) return ''
  return AreaChartData.value[tick]?.createdAt ?? ''
}

onMounted(() => {
  // ✅ refresh every 3 seconds but keep current filters
  intervalId = setInterval(() => {
    fetchFilteredLogs()
  }, 3000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
<template>
  <UCard class="waterlevel-chart" variant="subtle" :ui="{ root: 'flex flex-col shadow-xl', body: 'flex-1', footer: 'text-end py-2' }">
    <template #header>Water Level Chart</template>

    <div class="flex-1">
      <div v-if="AreaChartData.length === 0" class="text-sm opacity-70 p-3">
        No data for the selected range.
      </div>

<!-- Multilines.vue (your WaterLevelChart component) -->
  <AreaChart
    v-else
    :data="AreaChartData"
    :height="300"
    :categories="categories"
    :x-formatter="xFormatter"
    :curve-type="CurveType.MonotoneX"
    :legend-position="LegendPosition.Top"
    :hide-legend="false"
    :hide-area="true"/>

    </div>
  </UCard>
</template>
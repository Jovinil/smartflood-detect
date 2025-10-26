<script lang="ts" setup>
import { useWaterLevelStore } from '~/app/stores/useWaterLevelStore'
import { useCollection } from 'vuefire'
import { getFirestore, collectionGroup, query, orderBy } from 'firebase/firestore'

interface AreaChartItem {
  createdAt: string
  waterLevel: number
  id: string
}

const waterLevelStore = useWaterLevelStore();
let intervalId: NodeJS.Timeout | null = null;


const categories: ComputedRef<Record<string, BulletLegendItemInterface>> =
  computed(() => ({
    waterLevel: {
      name: 'Water Level (cm)',
      color: '#22c55e',
    }
  }))

 const MAX_POINTS = 6

const AreaChartData = computed(() => {
  const logs = waterLevelStore.waterLevelLogs
    .slice(-MAX_POINTS) // take the last MAX_POINTS entries
    .map(item => ({
      id: item.id,
      createdAt: new Date(item.createdAt).toLocaleTimeString(),
      waterLevel: item.waterLevel,
    }))
  return logs
})



const xFormatter = (tick: number): string => {
  
  return `${AreaChartData.value[tick]?.createdAt ?? ''}`
}


onMounted(() => {
  intervalId = setInterval(() => {
    waterLevelStore.fetchWaterLevelLogs()
  }, 3000)
})


onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
    <UCard variant="subtle" :ui="{ root: 'flex flex-col shadow-xl', body: 'flex-1', footer: 'text-end py-2' }">
        <template #header>
        Water Level Chart
        </template>

        <div class="flex-1">
            <AreaChart
                :data="AreaChartData"
                :height="300"
                :categories="categories"
                :x-formatter="xFormatter"
                :curve-type="CurveType.MonotoneX"
                :legend-position="LegendPosition.Top"
                :hide-legend="false"
            />
        </div>
    </UCard>
  
</template>

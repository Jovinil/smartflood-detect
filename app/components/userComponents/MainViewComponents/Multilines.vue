<script lang="ts" setup>
interface AreaChartItem {
  date: string
  desktop: number
  mobile: number
}

const categories: ComputedRef<Record<string, BulletLegendItemInterface>> =
  computed(() => ({
    desktop: {
      name: 'Device 1',
      color: '#3b82f6',
    },
    mobile: {
      name: 'Device 2',
      color: '#22c55e',
    },
  }))

const AreaChartData: AreaChartItem[] = [
  { date: '2024-04-01', desktop: 222, mobile: 150 },
  { date: '2024-04-02', desktop: 180, mobile: 97 },
  { date: '2024-04-03', desktop: 167, mobile: 120 },
  { date: '2024-04-04', desktop: 260, mobile: 240 },
  { date: '2024-04-05', desktop: 240, mobile: 290 },
]

const xFormatter = (tick: number): string => {
  return `${AreaChartData[tick]?.date}`
}
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

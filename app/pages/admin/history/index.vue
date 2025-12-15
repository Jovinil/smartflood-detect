<template>
  <div class="flex flex-col h-screen px-5 py-6">
    <!-- Fixed Header -->
    <header class="h-8 flex items-center justify-between px-2">
      <UButton icon="i-lucide-arrow-left" size="xl" variant="solid" to="/" />

      <!-- ✅ Download PDF -->
      <UButton
        icon="i-lucide-download"
        label="Download PDF"
        color="primary"
        variant="solid"
        size="sm"
        :loading="isGenerating"
        @click="downloadPdf"
      />
    </header>

    <main class="flex flex-col flex-1 min-h-0">
      <div class="flex-1 overflow-y-auto min-h-0 py-4 space-y-4">
        <!-- ✅ Everything inside this wrapper will be exported -->
        <div ref="pdfRef" class="bg-white text-black p-4 rounded space-y-4">
          <!-- Optional PDF header info -->
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-lg font-semibold">BAHAWATCH Water Level Report</h1>
              <p class="text-sm opacity-70">Device: {{ deviceValue?.deviceName ?? '—' }}</p>
              <p class="text-sm opacity-70">
                Filters: {{ year }}-{{ String(month).padStart(2, '0') }}, Week {{ week }}
              </p>
              <p class="text-xs opacity-60">Generated: {{ new Date().toLocaleString() }}</p>
            </div>
          </div>

          <!-- Filters (excluded from PDF) -->
          <UCard data-pdf-ignore variant="subtle">
            <template #header>Chart Filters</template>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
              <UInputMenu
                icon="i-lucide-search"
                color="neutral"
                variant="outline"
                v-model="deviceValue"
                :items="devices"
                option-attribute="deviceName"
                placeholder="Select device"
              />

              <USelect
                v-model="month"
                :items="monthItems"
                placeholder="Month"
                value-key="value"
                option-attribute="label"
              />

              <USelect
                v-model="week"
                :items="weekItems"
                placeholder="Week"
                value-key="value"
                option-attribute="label"
              />

              <USelect
                v-model="year"
                :items="yearItems"
                placeholder="Year"
                value-key="value"
                option-attribute="label"
              />
            </div>
          </UCard>

          <!-- Chart -->
          <WaterLevelChart
            :module-id="deviceValue?.moduleID"
            :month="month"
            :week="week"
            :year="year"
            :include-month-day="true"
            class="w-150 m-auto"
          />

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import WaterLevelChart from '~/app/components/userComponents/MainViewComponents/Multilines.vue'
import { useLocationStore } from '~/app/stores/useLocationStore'

definePageMeta({ layout: 'empty' })

/* ---------------- DEVICES / FILTERS ---------------- */
const locationStore = useLocationStore()
const devices = computed(() => locationStore.devices)

const deviceValue = computed({
  get: () => locationStore.device,
  set: (val) => locationStore.setDevice(val!)
})

onMounted(async () => {
  if (typeof locationStore.fetchDevicesLazy === 'function') {
    await locationStore.fetchDevicesLazy(false)
  }
})

const now = new Date()
const month = ref<number>(now.getMonth() + 1)
const week = ref<number>(1)
const year = ref<number>(now.getFullYear())

const monthItems = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
]

const weekItems = [
  { label: 'Week 1 (1–7)', value: 1 },
  { label: 'Week 2 (8–14)', value: 2 },
  { label: 'Week 3 (15–21)', value: 3 },
  { label: 'Week 4 (22–28)', value: 4 },
  { label: 'Week 5 (29–end)', value: 5 },
]

const yearItems = Array.from({ length: 5 }, (_, i) => {
  const y = now.getFullYear() - i
  return { label: String(y), value: y }
})

/* ---------------- PDF EXPORT (html2pdf.js) ---------------- */
const pdfRef = ref<HTMLElement | null>(null)
const isGenerating = ref(false)

async function downloadPdf() {
  // ✅ Nuxt-safe client guard
  if (!import.meta.client) return
  if (!pdfRef.value) return

  isGenerating.value = true

  // We'll restore the SVG after export even if something fails
  const modified: Array<{
    el: SVGElement
    fill: string | null
    fillOpacity: string | null
    styleFill: string
    styleFillOpacity: string
  }> = []

  try {
    await nextTick()
    // give the chart a moment to finish painting
    await new Promise((r) => setTimeout(r, 400))

    // ✅ dynamic import to avoid SSR issues
    const { default: html2pdf } = await import('html2pdf.js')

    // ✅ OPTIONAL FIX: remove SVG gradient/area fills before rasterizing
    // (prevents black blobs in some SVG exports)
    const svgTargets = pdfRef.value.querySelectorAll<SVGElement>(
      'svg path, svg polygon, svg rect'
    )

    svgTargets.forEach((node) => {
      const fillAttr = node.getAttribute('fill')
      const strokeAttr = node.getAttribute('stroke')

      const looksLikeBadFill =
        (fillAttr && fillAttr.startsWith('url(')) ||
        (fillAttr && fillAttr !== 'none' && (strokeAttr === null || strokeAttr === 'none'))

      if (!looksLikeBadFill) return

      modified.push({
        el: node,
        fill: fillAttr,
        fillOpacity: node.getAttribute('fill-opacity'),
        styleFill: (node as any).style?.fill ?? '',
        styleFillOpacity: (node as any).style?.fillOpacity ?? '',
      })

      node.setAttribute('fill', 'none')
      node.setAttribute('fill-opacity', '0')
      ;(node as any).style.fill = 'none'
      ;(node as any).style.fillOpacity = '0'
    })

    const filename =
      `generated_report_${deviceValue.value?.deviceName ?? 'device'}_${year.value}-${String(month.value).padStart(2, '0')}_W${week.value}.pdf`

    await html2pdf()
      .set({
        filename,
        margin: 10, // mm
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          backgroundColor: '#fff',
          useCORS: true,
          ignoreElements: (el: Element) => {
            // ✅ Exclude anything with this attribute or class
            return (
              (el as HTMLElement)?.hasAttribute?.('data-pdf-ignore') ||
              (el as HTMLElement)?.classList?.contains?.('pdf-ignore')
            )
          },
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // pagebreak: { mode: ['css', 'legacy'] },
      })
      .from(pdfRef.value)
      .save()
  } finally {
    // ✅ restore SVG back to normal after export
    modified.forEach(({ el, fill, fillOpacity, styleFill, styleFillOpacity }) => {
      if (fill === null) el.removeAttribute('fill')
      else el.setAttribute('fill', fill)

      if (fillOpacity === null) el.removeAttribute('fill-opacity')
      else el.setAttribute('fill-opacity', fillOpacity)

      ;(el as any).style.fill = styleFill
      ;(el as any).style.fillOpacity = styleFillOpacity
    })

    isGenerating.value = false
  }
}
</script>

<style scoped>
/* Optional: if you ever want a class-based ignore too */
.pdf-ignore {
  display: none;
}
</style>

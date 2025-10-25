<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { h, resolveComponent, ref, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { useRecordsStore } from '~/app/stores/useRecordsStore'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

const table = useTemplateRef('table')

const recordsStore = useRecordsStore()

const useRecords = useRecordsStore();

type Message = {
  id: string,
  category: 'message',
  logType: string,
  before: {
    heading: string,
    message: string
  },
  after: {
    heading: string,
    message: string
  },
  createdAt: string
}

type Device = {
  id: string,
  category: 'location',
  logType: string,
  before: {
    deviceName: string,
    deviceStatus: 'active' | 'inactive',
    locationName: string,
    longitude: number,
    latitude: number
  },
  after: {
    deviceName: string,
    deviceStatus: 'active' | 'inactive',
    locationName: string,
    longitude: number,
    latitude: number
  },
  createdAt: string
}

type LogsRow = Device | Message;

const data = ref<LogsRow[]>(recordsStore.actionLogs)

const columns: TableColumn<LogsRow>[] = [
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        icon: 'i-lucide-chevron-down',
        square: true,
        'aria-label': 'Expand',
        ui: {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : ''
          ]
        },
        onClick: () => row.toggleExpanded()
      })
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `${row.original.id}`,
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'logType',
    header: 'Log Type',
  },
   {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
  },
  {
    id: 'after',
    header: 'Data',
    cell: ({ row }) => {
      const item = row.original

      // ✅ Use category again
      if (item.category === 'message') {
        return h('div', { class: 'flex flex-col' }, [
          h('p', { class: 'font-medium' }, "Heading:" + item.after.heading),
          h('p', { class: 'text-sm text-gray-500 whitespace-normal break-words max-w-md' }, "Message: " + item.after.message),
        ])
      }

      if (item.category === 'location') {
        return h('div', { class: 'flex flex-col' }, [
          h('p', { class: 'font-medium' }, "Device Name: " + item.after.deviceName),
          h(
            'p',
            { class: `text-sm ${item.after.deviceStatus === 'active' ? 'text-green-600' : 'text-red-500'}` },
            "Device Status: " + item.after.deviceStatus
          ),
          h('p', { class: 'text-xs text-gray-400' }, "Location Name: " + item.after.locationName),
        ])
      }

      return h('div', '—')
    },
  }
]

// --- Pagination state ---
const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})

definePageMeta({
  layout: 'empty'
})

onMounted(() => {
console.log(data.value.length)
})

const globalFilter = ref('')
</script>

<template>
<div class="flex flex-col h-screen px-5 py-6">
  <!-- Fixed Header -->
  <header class="h-8 flex items-center justify-between px-2">
    <UButton  
            icon="i-lucide-arrow-left" 
            size="xl"
            variant="solid"
            to="/"
        />
    <div>
        <UInput icon="i-lucide-search" size="md" v-model="globalFilter" variant="outline" placeholder="Search..." />
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex flex-col flex-1 min-h-0">
    <!-- Scrollable Table -->
    <div class="flex-1 overflow-y-auto min-h-0">
      <UTable
        ref="table"
        v-model:pagination="pagination"
     
        v-model:global-filter="globalFilter"
        :data="data"
        :columns="columns"
        :ui="{ tr: 'data-[expanded=true]:bg-elevated/50' }"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        class="w-full"
      >
        <template #expanded="{ row }">
          <div class="flex items-center justify-center gap-5">

            <div class="flex flex-col" v-if="row.original.category === 'location'">
              <p>{{ row.original.after.deviceName }}</p>
            
              <p>{{ row.original.after.deviceStatus }}</p>
              
              <p>{{ row.original.after.locationName}}</p>
              
              <p>{{ row.original.after.longitude}}</p>
              
              <p>{{ row.original.after.latitude}}</p>  
            </div>

            <div class="flex flex-col" v-else>
              <p>{{ row.original.after.heading }}</p>

              <p class="text-sm text-gray-500 whitespace-normal break-words max-w-md">{{ row.original.after.message }}</p>
            </div>
          
            <UButton label="See previous Data" @click="recordsStore.visibleContainer" />
            <div class="flex flex-col" v-if="row.original.category === 'location' && recordsStore.seePrevious">
              <!-- <div class="flex flex-col" v-if="row.original.logType === 'CREATE'">
                <p>No previous data. This is a creation log.</p>
              </div v-else> -->
              <p>{{ row.original.before.deviceName }}</p>
            
              <p>{{ row.original.before.deviceStatus }}</p>
              
              <p>{{ row.original.before.locationName}}</p>
              
              <p>{{ row.original.before.longitude}}</p>
              
              <p>{{ row.original.before.latitude}}</p>

            </div>

            <div class="flex flex-col" v-if="row.original.category === 'message' && recordsStore.seePrevious">
              <p>{{ row.original.before.heading }}</p>
              
              <p class="text-sm text-gray-500 whitespace-normal break-words max-w-md">{{ row.original.before.message }}</p>
            </div>
            
          </div>
        </template>
      </UTable>
    </div>

    <!-- Fixed Pagination at Bottom -->
    <div class="shrink-0 border-t border-gray-600 py-2 flex justify-center items-center">
         <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p: any) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </main>
</div>


</template>

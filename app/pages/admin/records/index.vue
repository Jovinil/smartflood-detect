<script setup lang="ts">
import { h, resolveComponent, ref, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  },
  {
    id: '4595',
    date: '2024-03-09T12:20:00',
    status: 'failed',
    email: 'sophia.miller@example.com',
    amount: 482
  },
  {
    id: '4594',
    date: '2024-03-09T09:15:00',
    status: 'paid',
    email: 'liam.jones@example.com',
    amount: 720
  }
])

const columns: TableColumn<Payment>[] = [
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
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }
]

const expanded = ref({ 1: true })

  const devices = ref([
    { id: 1, name: "Device 1" },
    { id: 2, name: "Device 2" },
    { id: 3, name: "Device 3" },
    { id: 4, name: "Device 4" },
    { id: 5, name: "Device 5" },
    { id: 6, name: "Device 6" },
    { id: 7, name: "Device 7" },
    { id: 8, name: "Device 8" },
    { id: 9, name: "Device 9" },
    { id: 10, name: "Device 10" },
    { id: 11, name: "Device 11" },
    { id: 12, name: "Device 12" },
    { id: 13, name: "Device 13" },
    { id: 14, name: "Device 14" },
    { id: 15, name: "Device 15" },
    { id: 16, name: "Device 16" },
    { id: 17, name: "Device 17" },
    { id: 18, name: "Device 18" },
    { id: 19, name: "Device 19" },
    { id: 20, name: "Device 20" },
    { id: 20, name: "Device 20" },
    { id: 20, name: "Device 20" },
    { id: 20, name: "Device 20" },
    { id: 20, name: "Device 20" },
    { id: 20, name: "Device 20" },
    
    // ...
    { id: 100, name: "Device 100" }
    ])


// --- Pagination state ---
const page = ref(1)
const pageSize = ref(5) // rows per page

// slice data for current page
const paginatedData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return data.value.slice(start, start + pageSize.value)
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
        v-model:expanded="expanded"
        v-model:global-filter="globalFilter"
        :data="paginatedData"
        :columns="columns"
        :ui="{ tr: 'data-[expanded=true]:bg-elevated/50' }"
        class="w-full"
      >
        <template #expanded="{ row }">
          <pre>{{ row.original }}</pre>
        </template>
      </UTable>
    </div>

    <!-- Fixed Pagination at Bottom -->
    <div class="shrink-0 border-t border-gray-600 py-2 flex justify-center items-center">
       <UPagination 
          v-model:page="page" 
          size="xl" 
          :total=paginatedData
          :page-count="pageSize" 
        />
    </div>
  </main>
</div>


</template>

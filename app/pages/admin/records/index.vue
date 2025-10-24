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
  },
  {
    id: '4593',
    date: '2024-03-08T14:30:00',
    status: 'refunded',
    email: 'johndoe@gmail.com',
    amount: 410
  },
  {
    id: '4592',
    date: '2024-03-08T11:00:00',
    status: 'paid',
    email: 'johndoe@gmail.com',
    amount: 410
  },
  {
    id: '4591',
    date: '2024-03-07T16:45:00',
    status: 'failed',
    email: 'johndoe@gmail.com',
    amount: 410
  },
  {
    id: '4590',
    date: '2024-03-07T09:20:00',
    status: 'paid',
    email: 'johndoe@gmail.com',
    amount: 410
  },
  {
    id: '4589',
    date: '2024-03-06T13:15:00',
    status: 'refunded',
    email: 'johndoe@gmail.com',
    amount: 410
  },
  {
    id: '4588',
    date: '2024-03-06T10:05:00',
    status: 'paid',
    email: 'johndoe@gmail.com',
    amount: 410
  },  
  {
    id: '4587',
    date: '2024-03-05T15:40:00',
    status: 'failed',
    email: 'johndoe@gmail.com',
    amount: 410
  },  
  {
    id: '4586',
    date: '2024-03-05T12:30:00',
    status: 'paid',
    email: 'johndoe@gmail.com',
    amount: 410
  },  
  {
    id: '4585',
    date: '2024-03-04T14:25:00',
    status: 'refunded',
    email: 'johndoe@gmail.com',
    amount: 410
  },  
  {
    id: '4584',
    date: '2024-03-04T11:15:00',
    status: 'paid',
    email: 'johndoe@gmail.com',
    amount: 410
  },  
  {
    id: '4583',
    date: '2024-03-03T16:50:00',
    status: 'failed',
    email: 'johndoe@gmail.com',
    amount: 410
  },  
  {
    id: '4582',
    date: '2024-03-03T09:30:00',
    status: 'paid',
    email: 'johndoe@gmail.com',
    amount: 410
  },  
  {
    id: '4581',
    date: '2024-03-02T13:20:00',
    status: 'refunded',
    email: 'jjames.anderson@example.com',
    amount: 410
  },  
  {
    id: '4580',
    date: '2024-03-02T10:10:00',
    status: 'paid',
    email: 'johndoe@gmail.com',
    amount: 410
  },
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

            <div class="flex flex-col">
              <p>{{ row.original.id }}</p>
            
              <p>{{ row.original.date }}</p>
              
              <p>{{ row.original.status }}</p>
              
              <p>{{ row.original.email }}</p>
              
              <p>{{ row.original.amount }}</p>  
            </div>
          
            <UButton label="See previous Data" @click="recordsStore.visibleContainer" />

            <div v-if="recordsStore.seePrevious">awda</div>
            
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

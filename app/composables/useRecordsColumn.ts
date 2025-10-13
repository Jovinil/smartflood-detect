import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Payment } from './useRecords'

export const useRecordsColumn = () => {
  const UButton = resolveComponent('UButton')
  const UBadge = resolveComponent('UBadge')

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

  return { columns }
}

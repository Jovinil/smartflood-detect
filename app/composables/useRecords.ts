import { ref } from 'vue'
import { useRecordsStore } from '~/app/stores/useRecordsStore'

export type Payment = {
    id: string
    date: string
    status: 'paid' | 'failed' | 'refunded'
    email: string
    amount: number
}

export const useRecords = () => { 

    const recordsStore = useRecordsStore()

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


    const pagination = ref({
    pageIndex: 0,
    pageSize: 10
    })

    const globalFilter = ref('')


    return {
        recordsStore,
        data,
        pagination,
        globalFilter
    }
}

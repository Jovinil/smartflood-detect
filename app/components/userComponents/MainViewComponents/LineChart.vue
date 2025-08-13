<template>
  <UCard variant="subtle" :ui="{ root: 'flex flex-col shadow-xl', body: 'flex-1', footer: 'text-end py-2' }">
    <template #header>
      <!-- <Placeholder class="h-8" /> -->
      Water Level Chart
    </template>

    <div class="border-2 border-primary rounded-2xl flex-1 p-2">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </UCard>
</template>


<script>
import { defineComponent } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: 'LineChart',
  components: { Line },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Series A',
            data: [10, 20, 30, 40, 50],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: 'Line Chart Example',
          },
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: false  ,
              text: 'Value',
            },
          },
          x: {
            title: {
              display: false,
              text: 'Month',
            },
          },
        },
      },
    };
  },
});
</script>
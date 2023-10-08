<template>
  <div class="flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">{{ data.name }}</h2>
    </header>
    <div class="px-5 py-1">
      <div class="flex flex-wrap">
        <!-- Unique Visitors -->
        <div class="flex items-center py-2">
          <div class="mr-5">
            <div class="flex items-center">
              <div class="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{{ data.total_orders }}</div>
              <div v-if="data.orders_direction === 'less'" class="text-sm font-medium text-red-500">-{{ data.orders_difference }}%</div>
              <div v-if="data.orders_direction === 'more'" class="text-sm font-medium text-emerald-500">+{{ data.orders_difference }}%</div>
            </div>
          </div>
          <!-- <div class="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 mr-5" aria-hidden="true"></div> -->
        </div>
      </div>
    </div>
    <!-- Chart built with Chart.js 3 -->
    <div class="grow">
      <!-- Change the height attribute to adjust the chart height -->
      <LineChart :data="chartData" width="800" height="300" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import LineChart from '../../charts/LineChart03.vue'

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils'

export default {
  name: 'Sales',
  components: {
    LineChart,
  },
  props: {
    data: {
      type: Object,
      default: (() => {})
    }
  },
  setup(props) {
    const chartData = ref({
      labels: props.data.labels,
      datasets: [
        // Indigo line
        {
          label: 'Current',
          data: props.data.data,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.indigo[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,          
          clip: 20,
        },
      ],
    })

    return {
      chartData,
    } 
  }
}
</script>
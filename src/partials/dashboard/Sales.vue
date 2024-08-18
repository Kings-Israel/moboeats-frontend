<template>
  <div
    class="flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700"
  >
    <header
      class="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between"
    >
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">
        {{ data.name }}
      </h2>
      <div>
        <select
          name="categories"
          @change="updateTimeline"
          class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option
            value="past_ten_years"
            :selected="selected_timeline == 'past_ten_years'"
          >
            Past 10 Years
          </option>
          <option
            value="past_five_years"
            :selected="selected_timeline == 'past_five_years'"
          >
            Past 5 Years
          </option>
          <option
            value="past_three_years"
            :selected="selected_timeline == 'past_three_years'"
          >
            Past 3 Years
          </option>
          <option
            value="past_year"
            :selected="
              selected_timeline == '' || selected_timeline == 'past_year'
            "
          >
            Past Year
          </option>
          <option value="past_six_months">Past 6 Months</option>
          <option value="past_three_months">Past 3 Months</option>
        </select>
      </div>
    </header>
    <div class="px-5 py-1">
      <div class="flex flex-wrap">
        <!-- Unique Visitors -->
        <div class="flex items-center py-2">
          <div class="mr-5">
            <div class="flex items-center">
              <div
                class="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2"
              >
                {{ data.total_orders }}
              </div>
              <div
                v-if="data.orders_direction === 'less'"
                class="text-sm font-medium text-red-500"
              >
                -{{ data.orders_difference }}%
              </div>
              <div
                v-if="data.orders_direction === 'more'"
                class="text-sm font-medium text-emerald-500"
              >
                +{{ data.orders_difference }}%
              </div>
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
import { ref, watchEffect } from "vue";
import LineChart from "../../charts/LineChart03.vue";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";

export default {
  name: "Sales",
  components: {
    LineChart,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    method: {
      type: Function,
    },
    timeline: {
      type: String,
    },
  },
  setup(props) {
    const selected_timeline = ref("");
    const chartData = ref({
      labels: props.data.labels,
      datasets: [
        // Indigo line
        {
          label: "Current",
          data: props.data.data,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(
            tailwindConfig().theme.colors.blue[500]
          )}, 0.08)`,
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
    });

    const updateTimeline = (e) => {
      props.method(e.target.value);
      selected_timeline.value = e.target.value;
    };

    selected_timeline.value = props.timeline;

    return {
      chartData,
      selected_timeline,
      updateTimeline,
    };
  },
};
</script>

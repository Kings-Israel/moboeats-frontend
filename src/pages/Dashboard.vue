<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div class="grid grid-cols-4 gap-4">
          <div>
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Users</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ users }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/users">
                    <div class="flex items-center justify-center">
                      <span>View Users</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/restaurants">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Restaurants</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ restaurants }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/restaurants">
                    <div class="flex items-center justify-center">
                      <span>View Restaurants</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/riders">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Riders</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ riders }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/riders">
                    <div class="flex items-center justify-center">
                      <span>View Riders</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Total Orders</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ orders }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/">
                    <div class="flex items-center justify-center">
                      <span>View Orders</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">

          <!-- Cards -->
          <div class="grid grid-cols-12 gap-6">

            <!-- Sales -->
            <Sales v-if="ordersData.labels.length > 0" :data="ordersData" />
            <!-- Payments -->
            <Payments v-if="paymentsData.labels.length > 0" :data="paymentsData" />
            <!-- <DashboardCard01 /> -->
            <!-- Users Registration Rate -->
            <!-- <DashboardCard02 /> -->
            <!-- Restaurant Registration -->
            <!-- <DashboardCard03 /> -->
            <!-- Bar chart (Direct vs Indirect) -->
            <DashboardCard04 />
            <!-- Line chart (Real Time Value) -->
            <DashboardCard05 />
            <!-- Doughnut chart (Top Countries) -->
            <DashboardCard06 />
            <!-- Table (Top Channels) -->
            <TopRestaurants v-if="top_restaurants.length > 0" :restaurants="top_restaurants" />
            <!-- Line chart (Sales Over Time) -->
            <DashboardCard08 />
            <!-- Stacked bar chart (Sales VS Refunds) -->
            <DashboardCard09 />
            <!-- Card (Recent Activity) -->
            <DashboardCard10 />
            <!-- Card (Income/Expenses) -->
            <DashboardCard11 />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import WelcomeBanner from '../partials/dashboard/WelcomeBanner.vue'
import DashboardAvatars from '../partials/dashboard/DashboardAvatars.vue'
import FilterButton from '../components/DropdownFilter.vue'
import Datepicker from '../components/Datepicker.vue'
import DashboardCard03 from '../partials/dashboard/DashboardCard03.vue'
import DashboardCard04 from '../partials/dashboard/DashboardCard04.vue'
import DashboardCard05 from '../partials/dashboard/DashboardCard05.vue'
import DashboardCard06 from '../partials/dashboard/DashboardCard06.vue'
import DashboardCard07 from '../partials/dashboard/DashboardCard07.vue'
import DashboardCard08 from '../partials/dashboard/DashboardCard08.vue'
import DashboardCard09 from '../partials/dashboard/DashboardCard09.vue'
import DashboardCard10 from '../partials/dashboard/DashboardCard10.vue'
import DashboardCard11 from '../partials/dashboard/DashboardCard11.vue'
import Sales from '../partials/dashboard/Sales.vue'
import Payments from '../partials/dashboard/Payments.vue'
import TopRestaurants from '../partials/dashboard/TopRestaurants.vue'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    Header,
    WelcomeBanner,
    DashboardAvatars,
    FilterButton,
    Datepicker,
    DashboardCard03,
    DashboardCard04,
    DashboardCard05,
    DashboardCard06,
    DashboardCard07,
    DashboardCard08,
    DashboardCard09,
    DashboardCard10,
    DashboardCard11,
    Sales,
    Payments,
    TopRestaurants,
  },
  setup() {
    const $http = inject("$http")
    const sidebarOpen = ref(false)
    const users = ref(0)
    const restaurants = ref(0)
    const riders = ref(0)
    const orders = ref(0)
    const top_restaurants = ref([])
    let ordersData = { labels: [], data: [], total_orders: 0, orders_difference: 0, orders_difference: ""}
    let paymentsData = { labels: [], data: [], total_orders: 0, orders_difference: 0, orders_difference: ""}

    onMounted(() => {
      $http.get('/admin/dashboard')
        .then(response => {
          ordersData.name = response.data.data.orders_series.name
          ordersData.labels = response.data.data.orders_series.labels
          ordersData.data = response.data.data.orders_series.data
          ordersData.total_orders = response.data.data.orders_series.total_orders
          ordersData.orders_direction = response.data.data.orders_series.orders_direction
          ordersData.orders_difference = response.data.data.orders_series.orders_difference
          paymentsData.name = response.data.data.payments_series.name
          paymentsData.labels = response.data.data.payments_series.labels
          paymentsData.data = response.data.data.payments_series.data
          paymentsData.total_payments = response.data.data.payments_series.total_payments
          paymentsData.payments_direction = response.data.data.payments_series.payments_direction
          paymentsData.payments_difference = response.data.data.payments_series.payments_difference
          top_restaurants.value = response.data.data.top_restaurants
          users.value = response.data.data.users
          restaurants.value = response.data.data.restaurants
          riders.value = response.data.data.riders
        })
    })

    return {
      sidebarOpen,
      ordersData,
      paymentsData,
      users,
      restaurants,
      riders,
      orders,
      top_restaurants
    }  
  }
}
</script>
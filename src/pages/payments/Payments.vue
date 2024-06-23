<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div class="grid grid-cols-4 gap-4 border-2 border-slate-200 rounded-md p-2 bg-slate-300" v-for="(data, index) in region_data" :key="index">
            <div class="col-span-4">
              <h2 class="text-xl font-extrabold">{{ index }}</h2>
            </div>
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
                        <h2 class="text-xl leading-snug justify-center font-semibold">Total Amount</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.total_amount, index) }}</span></div>
                    </header>
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
                        <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                          <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                            <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                          </svg>
                        </div>
                      </div>
                      <div class="text-center">
                        <h2 class="text-xl leading-snug justify-center font-semibold">Paid Out Amount</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.paid_amount, index) }}</span></div>
                    </header>
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
                        <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                          <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                            <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                          </svg>
                        </div>
                      </div>
                      <div class="text-center">
                        <h2 class="text-xl leading-snug justify-center font-semibold">Unpaid Amount</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.unpaid_amount, index) }}</span></div>
                    </header>
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
                        <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                          <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                            <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                          </svg>
                        </div>
                      </div>
                      <div class="text-center">
                        <h2 class="text-xl leading-snug justify-center font-semibold">Restaurants Earnings</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.restaurant_earnings, index) }} ({{ formatValue(data.restaurant_amount_paid_out, index) + ' Paid Out' }})</span></div>
                    </header>
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
                        <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                          <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                            <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                          </svg>
                        </div>
                      </div>
                      <div class="text-center">
                        <h2 class="text-xl leading-snug justify-center font-semibold">Rider Earnings</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.rider_earnings, index) }} ({{ formatValue(data.rider_amount_paid_out, index) + ' Paid Out' }})</span></div>
                    </header>
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
                        <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                          <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                            <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                          </svg>
                        </div>
                      </div>
                      <div class="text-center">
                        <h2 class="text-xl leading-snug justify-center font-semibold">Total Service Charges</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.total_service_charges, index) }}</span></div>
                    </header>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Payments ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

              <form class="relative">
                <label for="action-search" class="sr-only">Search</label>
                <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800" type="search" v-model="search" placeholder="Search Payments" />
                <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                  <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                  </svg>
                </button>
              </form> 

            </div>

          </div>

          <!-- Table -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <header class="px-5 py-4">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Payments <span class="text-slate-400 dark:text-slate-500 font-medium">{{ payments.length }}</span></h2>
            </header>
            <div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                  <!-- Table header -->
                  <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">User</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Payment For</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Partner</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Amount</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Transaction ID</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Paid Date</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                    <tr v-for="payment in payments.data" :key="payment.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{payment.orderable.user.name}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{getPaymentType(payment.orderable_type)}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left" v-if="payment.orderable.restaurant">{{payment.orderable.restaurant.name}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left font-medium text-sky-500">{{ formatValue(payment.amount, payment.orderable.user.country) }}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left font-medium text-emerald-500">{{payment.transaction_id}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{moment(payment.created_at).format('Do MMMM Y')}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <router-link :to="{ name: 'payment-details', params: { id: payment.uuid }}" class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm">View</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-8">
            <PaginationClassic @change-page="changePage" :next_page="nextPageUrl" :prev_page="prevPageUrl" :from="from" :to="to" :total_items="totalItems" />
          </div>          
        </div>
      </main>
    </div> 
  </div>
</template>

<script>
import moment from 'moment';
import { ref, onMounted, inject, watch } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import CustomersTable from '../../partials/customers/CustomersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import { formatValue } from '../../utils/Utils'

export default {
  name: 'Orders',
  components: {
    Sidebar,
    Header,
    DeleteButton,
    DateSelect,
    FilterButton,
    CustomersTable,
    PaginationClassic,
  },
  setup() {
    const $http = inject("$http")
    const sidebarOpen = ref(false)
    const selectedItems = ref([])
    const nextPageUrl = ref('')
    const lastPageUrl = ref('')
    const prevPageUrl = ref('')
    const pagesLinks = ref([])
    const from = ref(0)
    const to = ref(0)
    const totalItems = ref(0)
    const total_amount = ref(0)
    const total_paid_out = ref(0)
    const total_unpaid_out = ref(0)
    const restaurant_earnings = ref(0)
    const restaurant_earnings_paid_out = ref(0)
    const rider_earnings = ref(0)
    const rider_earnings_paid_out = ref(0)
    const total_service_charges = ref(0)
    const region_data = ref([])

    let search = ref('')

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const payments = ref([])

    const getLatestOrder = (order) => {
      return order.uuid.split('-')[0]
    }

    onMounted(() => {
      $http.get('/admin/payments')
        .then(response => {
          total_amount.value = response.data.data.total_amount
          total_paid_out.value = response.data.data.paid_out_amount
          total_unpaid_out.value = response.data.data.unpaid_amount
          restaurant_earnings.value = response.data.data.restaurant_earnings,
          restaurant_earnings_paid_out.value = response.data.data.restaurant_amount_paid_out
          rider_earnings.value = response.data.data.rider_earnings
          rider_earnings_paid_out.value = response.data.data.rider_amount_paid_out
          total_service_charges.value = response.data.data.total_service_charges
          nextPageUrl.value = response.data.data.payments.next_page_url
          lastPageUrl.value = response.data.data.payments.last_page_url
          prevPageUrl.value = response.data.data.payments.prev_page_url
          totalItems.value = response.data.data.payments.total
          from.value = response.data.data.payments.from
          to.value = response.data.data.payments.to
          payments.value = response.data.data.payments
          region_data.value = response.data.data.region_data
        })
    })

    function changePage(page) {
      $http.get(page)
        .then(response => {
          nextPageUrl.value = response.data.data.payments.next_page_url
          lastPageUrl.value = response.data.data.payments.last_page_url
          prevPageUrl.value = response.data.data.payments.prev_page_url
          totalItems.value = response.data.data.payments.total
          from.value = response.data.data.payments.from
          to.value = response.data.data.payments.to
          payments.value = response.data.data.payments
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/admin/payments?search='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.data.payments.next_page_url
          lastPageUrl.value = response.data.data.payments.last_page_url
          prevPageUrl.value = response.data.data.payments.prev_page_url
          totalItems.value = response.data.data.payments.total
          from.value = response.data.data.payments.from
          to.value = response.data.data.payments.to
          payments.value = response.data.data.payments
        })
    })

    const getPaymentType = (type) => {
      switch (type) {
        case 'App\\Models\\Order':
          return 'Order'
          break;
        case 'App\\Models\\SupplementOrder':
          return 'Supplement Order'
          break;
        case 'App\\Models\\DietSubscription':
          return 'Diet Subscription'
          break;
        default:
          break;
      }
    }

    return {
      moment,
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      getPaymentType,
      payments,
      nextPageUrl,
      prevPageUrl,
      lastPageUrl,
      totalItems,
      from,
      to,
      region_data,
      changePage,
      search,
      total_amount,
      total_paid_out,
      total_unpaid_out,
      restaurant_earnings,
      restaurant_earnings_paid_out,
      rider_earnings,
      rider_earnings_paid_out,
      total_service_charges,
      formatValue
    }  
  }
}
</script>
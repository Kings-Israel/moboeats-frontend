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

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Orders ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

              <form class="relative">
                <label for="action-search" class="sr-only">Search</label>
                <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800" type="search" v-model="search" placeholder="Search Orders" />
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
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Orders <span class="text-slate-400 dark:text-slate-500 font-medium">{{ orders.length }}</span></h2>
            </header>
            <div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                  <!-- Table header -->
                  <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Order ID</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">User</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Restaurant</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Amount</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Delivery Status</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Location</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Ordered On</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                    <tr v-for="order in orders" :key="order.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{order.orderId}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{order.name}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left font-medium text-sky-500">{{order.restaurant.name}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left font-medium text-emerald-500">{{order.total_amount}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{order.delivery_status}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{order.location}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{moment(order.created_at).format('Do MMMM Y')}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm">View</button>
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

    let search = ref('')

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const orders = ref([])

    const getLatestOrder = (order) => {
      return order.uuid.split('-')[0]
    }

    onMounted(() => {
      $http.get('/admin/orders')
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          response.data.data.data.forEach(order => {
            orders.value.push({
              id: order.id,
              name: order.user.name,
              email: order.user.email,
              restaurant: order.restaurant,
              total_amount: order.total_amount,
              delivery_status: order.status,
              orderId: getLatestOrder(order),
              created_at: order.created_at,
              location: order.delivery_address,
            })
          })
        })
    })

    function changePage(page) {
      $http.get(page)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          orders.value = []
          response.data.data.data.forEach(order => {
            orders.value.push({
              id: order.id,
              name: order.user.name,
              email: order.user.email,
              restaurant: order.restaurant,
              total_amount: order.total_amount,
              delivery_status: order.delivery_status,
              orderId: getLatestOrder(order),
              created_at: order.created_at,
              location: order.delivery_address,
            })
          })
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/admin/orders?search='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          orders.value = []
          response.data.data.data.forEach(order => {
            orders.value.push({
              id: order.id,
              name: order.user.name,
              email: order.user.email,
              restaurant: order.restaurant,
              total_amount: order.total_amount,
              delivery_status: order.delivery_status,
              orderId: getLatestOrder(order),
              created_at: order.created_at,
              location: order.delivery_address,
            })
          })
        })
    })

    return {
      moment,
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      orders,
      nextPageUrl,
      prevPageUrl,
      lastPageUrl,
      totalItems,
      from,
      to,
      changePage,
      search,
    }  
  }
}
</script>
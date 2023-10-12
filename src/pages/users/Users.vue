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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Customers ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <form class="relative">
                <label for="action-search" class="sr-only">Search</label>
                <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800" type="search" v-model="search" placeholder="Search Customers" />
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
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Customers <span class="text-slate-400 dark:text-slate-500 font-medium">{{ customers.length }}</span></h2>
            </header>
            <div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                  <!-- Table header -->
                  <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">User Name</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Email</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Location</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold">Orders</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Last order</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Total spent</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold">Refunds</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <span class="sr-only">Menu</span>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                    <tr v-for="customer in customers" :key="customer.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img class="rounded-full" :src="customer.image" width="40" height="40" :alt="customer.name" />
                          </div>
                          <div class="font-medium text-slate-800 dark:text-slate-100">{{customer.name}}</div>
                        </div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{customer.email}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{customer.location}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-center">{{customer.orders}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left font-medium text-sky-500">{{customer.lastOrder}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left font-medium text-emerald-500">{{customer.spent}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-center">{{customer.refunds}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm" :to="{ name: 'user-details', 'params': { id: customer.id }}">View</router-link>
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
            <!-- <PaginationNumeric @change-page="changePage" :next_page="nextPageUrl" :prev_page="prevPageUrl" :from="from" :to="to" :total_items="totalItems" :links="pagesLinks" /> -->
          </div>          

        </div>
      </main>

    </div> 

  </div>
</template>

<script>
import { ref, onMounted, inject, watch } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import CustomersTable from '../../partials/customers/CustomersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import Image01 from '../../images/user-40-01.jpg'
import Image02 from '../../images/user-40-02.jpg'
import Image03 from '../../images/user-40-03.jpg'
import Image04 from '../../images/user-40-04.jpg'
import Image05 from '../../images/user-40-05.jpg'
import Image06 from '../../images/user-40-06.jpg'
import Image07 from '../../images/user-40-07.jpg'
import Image08 from '../../images/user-40-08.jpg'
import Image09 from '../../images/user-40-09.jpg'
import Image10 from '../../images/user-40-10.jpg'

export default {
  name: 'Users',
  components: {
    Sidebar,
    Header,
    DeleteButton,
    DateSelect,
    FilterButton,
    CustomersTable,
    PaginationClassic,
    PaginationNumeric,
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

    const customers = ref([])

    onMounted(() => {
      $http.get('/admin/users/orderer')
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          response.data.data.links.forEach(link => {
            pagesLinks.value.push(link)
          })
          response.data.data.data.forEach(user => {
            customers.value.push({
              id: user.id,
              image: Image01,
              name: user.name,
              email: user.email,
              location: '🇬🇧 London, UK',
              orders: user.orders.length,
              lastOrder: '#123567',
              spent: '$2,890.66',
              refunds: '-',
              fav: true
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
          customers.value = []
          response.data.data.data.forEach(user => {
            customers.value.push({
              id: user.id,
              image: Image01,
              name: user.name,
              email: user.email,
              location: '🇬🇧 London, UK',
              orders: user.orders.length,
              lastOrder: '#123567',
              spent: '$2,890.66',
              refunds: '-',
              fav: true
            })
          })
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/admin/users/orderer?search='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          customers.value = []
          response.data.data.data.forEach(restaurant => {
            customers.value.push({
              id: restaurant.id,
              image: Image01,
              name: restaurant.name,
              user: restaurant.user,
              location: '🇬🇧 London, UK',
              orders: restaurant.orders.length,
              lastOrder: '#123567',
            })
          })
        })
    })

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      customers,
      nextPageUrl,
      prevPageUrl,
      lastPageUrl,
      totalItems,
      from,
      to,
      pagesLinks,
      changePage,
      search,
    }  
  }
}
</script>
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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Partners ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <button class="bg-emerald-600 px-3 py-1 col-span-1 text-slate-50 font-semibold rounded-full justify-end" @click="exportRestaurants()">Export Partners</button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-4 mb-2 gap-4">
            <form class="relative">
              <label for="action-search" class="sr-only">Search</label>
              <input id="action-search" class="form-input w-full pl-9 bg-white border border-slate-500 dark:bg-slate-800" type="search" v-model="search" placeholder="Search Restaurants" />
              <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
            <form class="relative w-full">
              <label for="action-search" class="sr-only">Search Status</label>
              <select class="form-select p-2 w-full border border-slate-500" v-model="status">
                <option value="">All</option>
                <option value="2">Approved</option>
                <option value="1">Pending</option>
                <option value="3">Denied</option>
              </select>
            </form>
            <form class="relative w-full">
              <label for="action-search" class="sr-only">Search Type</label>
              <select class="form-select p-2 w-full border border-slate-500" v-model="type">
                <option value="both">Restaurants and Grocery Shops</option>
                <option value="restaurant">Restaurants</option>
                <option value="grocery shop">Grocery Shops</option>
              </select>
            </form>
            <button class="bg-red-500 text-white rounded-full col-span-1 h-fit py-1 my-auto justify-self-end w-52" @click="search = '', status = '', type = 'both'">Clear Search Fields</button>
          </div>

          <!-- Table -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <header class="px-5 py-4">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Partners <span class="text-slate-400 dark:text-slate-500 font-medium">{{ totalItems }}</span></h2>
            </header>
            <div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                  <!-- Table header -->
                  <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Name</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Status</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Admin</div>
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
                        <span class="sr-only">Menu</span>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                    <tr v-for="restaurant in restaurants" :key="restaurant.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3">
                        <div class="flex items-center">
                          <div class="hidden md:block shrink-0 mr-2 sm:mr-3">
                            <img class="w-10 h-10 object-cover rounded-full" :src="restaurant.logo" :alt="restaurant.name" />
                          </div>
                          <div class="font-medium text-slate-800 dark:text-slate-100">{{restaurant.name}}</div>
                        </div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div :class="'text-center rounded-xl '+resolveRestaurantStatus(restaurant.status)">{{ restaurant.status }}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{ restaurant.user.name }} {{restaurant.user.email}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{restaurant.location}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-center">{{restaurant.orders}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left font-medium text-sky-500">{{restaurant.lastOrder}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <!-- Menu button -->
                        <router-link class="btn bg-[#2E5945] hover:bg-[#16251d] transition duration-200 ease-in-out text-white btn-sm" :to="{ name: 'restaurant-details', params: { id: restaurant.uuid } }">
                          View
                        </router-link>
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
import { ref, onMounted, inject, watch } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import CustomersTable from '../../partials/customers/CustomersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'

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

    let status = ref('')
    let type = ref('both')

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const restaurants = ref([])

    onMounted(() => {
      $http.get('/admin/restaurants')
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          response.data.data.data.forEach(restaurant => {
            restaurants.value.push({
              id: restaurant.id,
              status: restaurant.status,
              uuid: restaurant.uuid,
              logo: restaurant.logo,
              name: restaurant.name,
              user: restaurant.user,
              location: restaurant.address,
              orders: restaurant.orders.length,
              lastOrder: restaurant.orders.length > 0 ? getOrderId(restaurant.orders[restaurant.orders.length - 1].uuid) : '-',
            })
          })
        })
    })

    const getOrderId = (uuid) => {
      return uuid.split("-")[0].toUpperCase()
    }

    function changePage(page) {
      $http.get(page)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          restaurants.value = []
          response.data.data.data.forEach(restaurant => {
            restaurants.value.push({
              id: restaurant.id,
              status: restaurant.status,
              uuid: restaurant.uuid,
              logo: restaurant.logo,
              name: restaurant.name,
              user: restaurant.user,
              location: restaurant.address,
              orders: restaurant.orders.length,
              lastOrder: restaurant.orders.length > 0 ? getOrderId(restaurant.orders[restaurant.orders.length - 1].uuid) : '-',
            })
          })
        })
    }

    const resolveRestaurantStatus = (status) => {
      switch (status) {
        case 'Pending':
          return 'text-gray-100 bg-gray-500 px-2'
          break;
        case 'Denied':
          return 'text-gray-100 bg-red-500 px-2'
          break;
        case 'Approved':
          return 'text-green-100 bg-green-500 px-2'
          break;
        default:
          return 'text-gray-100 bg-gray-500 px-2'
          break;
      }
    }

    const exportRestaurants = () => {
      $http.get('/restaurant/restaurants/export/data?search='+search.value+'&status='+status.value,
          {
            responseType: 'arraybuffer',
            method: 'GET'
          }
      )
        .then(response => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]))
          const fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute(
            'download',
            `Restaurants.xlsx`,
          )
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(err => {
          console.log(err)
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/admin/restaurants?search='+newSearch+'&status='+status.value+'&type='+type.value)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          restaurants.value = []
          response.data.data.data.forEach(restaurant => {
            restaurants.value.push({
              id: restaurant.id,
              status: restaurant.status,
              uuid: restaurant.uuid,
              logo: restaurant.logo,
              name: restaurant.name,
              user: restaurant.user,
              location: restaurant.address,
              orders: restaurant.orders.length,
              lastOrder: restaurant.orders.length > 0 ? getOrderId(restaurant.orders[restaurant.orders.length - 1].uuid) : '-',
            })
          })
        })
    })

    watch(status, async (newStatus, oldQuestion) => {
      $http.get('/admin/restaurants?search='+search.value+'&status='+newStatus+'&type='+type.value)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          restaurants.value = []
          response.data.data.data.forEach(restaurant => {
            restaurants.value.push({
              id: restaurant.id,
              status: restaurant.status,
              uuid: restaurant.uuid,
              logo: restaurant.logo,
              name: restaurant.name,
              user: restaurant.user,
              location: restaurant.address,
              orders: restaurant.orders.length,
              lastOrder: restaurant.orders.length > 0 ? getOrderId(restaurant.orders[restaurant.orders.length - 1].uuid) : '-',
            })
          })
        })
    })

    watch(type, async (newType, oldQuestion) => {
      $http.get('/admin/restaurants?search='+search.value+'&status='+status.value+'&type='+newType)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          restaurants.value = []
          response.data.data.data.forEach(restaurant => {
            restaurants.value.push({
              id: restaurant.id,
              status: restaurant.status,
              uuid: restaurant.uuid,
              logo: restaurant.logo,
              name: restaurant.name,
              user: restaurant.user,
              location: restaurant.address,
              orders: restaurant.orders.length,
              lastOrder: restaurant.orders.length > 0 ? getOrderId(restaurant.orders[restaurant.orders.length - 1].uuid) : '-',
            })
          })
        })
    })

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      restaurants,
      nextPageUrl,
      prevPageUrl,
      lastPageUrl,
      totalItems,
      from,
      to,
      changePage,
      search,
      status,
      type,
      resolveRestaurantStatus,
      exportRestaurants
    }  
  }
}
</script>
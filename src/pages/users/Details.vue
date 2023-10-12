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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{{ user.name }} ✨</h1>
            </div>
            <div class="flex gap-2">
              <span v-for="(role, index) in user.roles" :key="role">
                <span v-if="index == user.roles.length - 1" class="uppercase font-semibold">{{ role.name }}</span>
                <span v-else class="uppercase font-semibold">{{ role.name }},</span>
              </span>
            </div>
          </div>  
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
              <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Info</h2>
              </header>
              <div class="flex flex-col space-y-2 p-3">
                <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Email:</span><strong>{{ user.email }}</strong></h1>
                <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Phone Number:</span><strong>{{ user.phone_number }}</strong></h1>
                <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Registered On:</span><strong>{{ moment(user.created_at).format('Do MMMM Y') }}</strong></h1>
                <h1 v-if="user_roles.includes('orderer')" class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Total Orders:</span><strong>{{ user.orders_count }}</strong></h1>
                <h1 v-if="user_roles.includes('restaurant')" class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Total Restaurants:</span><strong>{{ user.restaurants_count }}</strong></h1>
              </div>
            </div>
            <div v-if="user_roles.includes('orderer')" class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Orders</h2>
              </header>
              <div class="p-3">
                <!-- Table -->
                <div class="overflow-x-auto">
                  <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Restaurant</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Order ID</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Status</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Created On</div>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="order in orders" :key="order.id">
                        <td class="p-2">
                          <div class="">
                            <!-- TODO:Add Link to View Order -->
                            <div class="text-slate-800 dark:text-slate-100">{{ order.restaurant.name }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <div class="text-center text-emerald-500">{{ getOrderId(order) }}</div>
                        </td>
                        <td class="p-2">
                          <div :class="'text-center '+resolveOrderStatus(order.status)">{{ order.status }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-center">{{ moment(order.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2 flex justify-center">
                          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <div class="mt-8">
                    <PaginationClassic @change-page="changeOrdersPage" :next_page="nextOrdersPageUrl" :prev_page="prevOrdersPageUrl" :from="ordersFrom" :to="ordersTo" :total_items="ordersTotalItems" />
                    <!-- <PaginationNumeric @change-page="changePage" :next_page="nextOrdersPageUrl" :prev_page="prevOrdersPageUrl" :from="from" :to="to" :total_items="totalItems" :links="ordersPagesLinks" /> -->
                  </div> 
                </div>
              </div>
            </div>
            <div v-if="user_roles.includes('restaurant')" class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Restaurants</h2>
              </header>
              <div class="p-3">
                <!-- Table -->
                <div class="overflow-x-auto">
                  <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Restaurant</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Created On</div>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="restaurant in restaurants" :key="restaurant.id">
                        <td class="p-2">
                          <div class="">
                            <!-- TODO:Add Link to View Restaurant -->
                            <div class="text-slate-800 dark:text-slate-100">{{ restaurant.name }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <div class="text-center">{{ moment(restaurant.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2 flex justify-center">
                          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <div class="mt-8">
                    <PaginationClassic @change-page="changeRestaurantsPage" :next_page="nextRestaurantsPageUrl" :prev_page="prevRestaurantsPageUrl" :from="restaurantsFrom" :to="restaurantsTo" :total_items="restaurantsTotalItems" />
                    <!-- <PaginationNumeric @change-page="changePage" :next_page="nextOrdersPageUrl" :prev_page="prevOrdersPageUrl" :from="from" :to="to" :total_items="totalItems" :links="ordersPagesLinks" /> -->
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div> 
  </div>
</template>

<script>
import { ref, onMounted, inject, } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import CustomersTable from '../../partials/customers/CustomersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import { useRoute } from 'vue-router'
import moment from 'moment';
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
  name: 'User',
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
    const router = useRoute()
    const sidebarOpen = ref(false)

    // Orders Pagination
    const nextOrdersPageUrl = ref('')
    const lastOrdersPageUrl = ref('')
    const prevOrdersPageUrl = ref('')
    const ordersPagesLinks = ref([])
    const ordersFrom = ref(0)
    const ordersTo = ref(0)
    const ordersTotalItems = ref(0)

    // Restaurants Pagination
    const nextRestaurantsPageUrl = ref('')
    const lastRestaurantsPageUrl = ref('')
    const prevRestaurantsPageUrl = ref('')
    const restaurantsPagesLinks = ref([])
    const restaurantsFrom = ref(0)
    const restaurantsTo = ref(0)
    const restaurantsTotalItems = ref(0)

    const user = ref({})
    const orders = ref([])
    const restaurants = ref([])
    const user_roles = ref([])

    const getOrderId = (order) => {
      return order.uuid.split('-')[0]
    }

    const resolveOrderStatus = (status) => {
      switch (status) {
        case 'Pending':
          return 'text-gray-500'
          break;
        case 'In Progress':
          return 'text-blue-500'
          break;
        case 'Delivered':
          return 'text-green-500'
          break;
        case 'Awating Pick Up':
          return 'text-emarald-500'
          break;
        case 'On Delivery':
          return 'text-slate-500'
          break;
        case 'Denied':
          return 'text-red-500'
          break;
        default:
          return 'text-gray-500'
          break;
      }
    }

    function changeRestaurantsPage(page) {
      console.log(page+'&user=restaurants')
      $http.get(page+'&user=restaurants')
        .then(response => {
          nextRestaurantsPageUrl.value = response.data.data.restaurants.next_page_url
          lastRestaurantsPageUrl.value = response.data.data.restaurants.last_page_url
          prevRestaurantsPageUrl.value = response.data.data.restaurants.prev_page_url
          restaurantsTotalItems.value = response.data.data.restaurants.total
          restaurantsFrom.value = response.data.data.restaurants.from
          restaurantsTo.value = response.data.data.restaurants.to
          restaurants.value = []
          restaurants.value = response.data.data.restaurants.data
        })
    }

    function changeOrdersPage(page) {
      $http.get(page+'&user=orderer')
        .then(response => {
          nextOrdersPageUrl.value = response.data.data.orders.next_page_url
          lastOrdersPageUrl.value = response.data.data.orders.last_page_url
          prevOrdersPageUrl.value = response.data.data.orders.prev_page_url
          ordersTotalItems.value = response.data.data.orders.total
          ordersFrom.value = response.data.data.orders.from
          ordersTo.value = response.data.data.orders.to
          orders.value = []
          orders.value = response.data.data.orders.data
        })
    }

    onMounted(() => {
      $http.get('/admin/users/'+router.params.id+'/details')
        .then(response => {
          console.log(response.data.data)
          user.value = response.data.data.user
          if (user.value) {
            user.value.roles.forEach(role => {
              user_roles.value.push(role.name)
            })
          }

          if (user_roles.value.includes('restaurant')) {
            nextRestaurantsPageUrl.value = response.data.data.restaurants.next_page_url
            lastRestaurantsPageUrl.value = response.data.data.restaurants.last_page_url
            prevRestaurantsPageUrl.value = response.data.data.restaurants.prev_page_url
            restaurantsTotalItems.value = response.data.data.restaurants.total
            restaurantsFrom.value = response.data.data.restaurants.from
            restaurantsTo.value = response.data.data.restaurants.to
            restaurants.value = response.data.data.restaurants.data
            response.data.data.restaurants.links.forEach(link => {
              restaurantsPagesLinks.value.push(link)
            })
          }
          
          if (user_roles.value.includes('orderer')) {
            orders.value = response.data.data.orders.data
            nextOrdersPageUrl.value = response.data.data.orders.next_page_url
            lastOrdersPageUrl.value = response.data.data.orders.last_page_url
            prevOrdersPageUrl.value = response.data.data.orders.prev_page_url
            ordersTotalItems.value = response.data.data.orders.total
            ordersFrom.value = response.data.data.orders.from
            ordersTo.value = response.data.data.orders.to
            response.data.data.orders.links.forEach(link => {
              ordersPagesLinks.value.push(link)
            })            
          }
        })
    })

    return {
      moment,
      sidebarOpen,
      user,
      user_roles,

      // Orders
      orders,
      nextOrdersPageUrl,
      prevOrdersPageUrl,
      lastOrdersPageUrl,
      ordersTotalItems,
      ordersFrom,
      ordersTo,
      ordersPagesLinks,
      changeOrdersPage,

      // Restaurant Admins
      nextRestaurantsPageUrl,
      lastRestaurantsPageUrl,
      prevRestaurantsPageUrl,
      restaurantsTotalItems,
      restaurantsFrom,
      restaurantsTo,
      restaurantsPagesLinks,
      restaurants,
      changeRestaurantsPage,
      
      getOrderId,
      resolveOrderStatus,
    }  
  }
}
</script>
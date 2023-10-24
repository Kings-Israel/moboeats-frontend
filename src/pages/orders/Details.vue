<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow" v-if="order != null">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{{ getOrderId(order) }} ✨</h1>
            </div>
            <div class="flex gap-2">
              <button v-if="order.status === 'Pending'" class="btn btn-md bg-teal-300 hover:bg-teal-500 text-black text-lg" @click="updateOrder(order, '2')">Accept</button>
              <button v-if="order.status === 'Pending'" class="btn btn-md bg-red-700 hover:bg-red-500 text-black text-lg" @click="updateOrder(order, '0')">Reject</button>
            </div>
          </div>  
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-full xl:col-span-4">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit hover:shadow-2xl transition duration-150 ease-in-out">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">User Info</h2>
                </header>
                <router-link :to="{ name: 'user-details', 'params': { id: order.user.id, type: 'user' }}" class="flex flex-col space-y-2 p-3">
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Name:</span><strong>{{ order.user.name }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Email:</span><strong>{{ order.user.email }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Phone Number:</span><strong>{{ order.user.phone_number }}</strong></h1>
                </router-link>
              </div>
              
            </div>
            <div class="col-span-full xl:col-span-4">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit hover:shadow-2xl transition duration-150 ease-in-out">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Restaurant Info</h2>
                </header>
                <router-link :to="{ name: 'restaurant-details', params: { id: order.restaurant.uuid } }" class="flex flex-col space-y-2 p-3">
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Name:</span><strong>{{ order.restaurant.name }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Email:</span><strong>{{ order.restaurant.email }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Phone Number:</span><strong>{{ order.restaurant.phone_no }}</strong></h1>
                </router-link>
              </div>
            </div>
            <div class="col-span-full xl:col-span-4">
              <div v-if="order.rider" class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit hover:shadow-2xl transition duration-150 ease-in-out">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Rider Info</h2>
                </header>
                <router-link :to="{ name: 'user-details', 'params': { id: order.rider.id, type: 'rider' }}" class="flex flex-col space-y-2 p-3">
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Name:</span><strong>{{ order.rider.name }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Email:</span><strong>{{ order.rider.email }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Phone Number:</span><strong>{{ order.rider.phone_number }}</strong></h1>
                </router-link>
              </div>
              <div v-else class="flex flex-col justify-center">
                <button v-if="order.status == 'Pending' || order.status == 'In Progress'" class="btn w-full bg-red-800 text-white">Rider not assigned</button>
                <button v-if="order.status == 'Denied'" class="btn btn-lg w-full bg-red-600 text-white font-bold text-lg">Order Rejected</button>
              </div>
            </div>
          </div>
          <br>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-full xl:col-span-2">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Order Info</h2>
                  <button :class="'btn btn-sm '+resolveOrderStatus(order.status)">{{ order.status }}</button>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>ID:</span><strong>{{ getOrderId(order) }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Amount:</span><strong>{{ formatValue(order.total_amount) }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Ordered On:</span><strong>{{ moment(order.created_at).format('Do MMM Y') }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Order Items:</span><strong v-for="(item, index) in order.order_items" :key="item.id">{{ item.menu.title }}<span v-if="index != Object.keys(order.order_items).length - 1">, </span></strong></h1>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="w-full">
            <GMapMap
              ref="mapRef"
              :center="center"
              :zoom="zoom"
              :options="{fullscreenControl: false}"
              map-type-id="terrain"
              style="width: 78vw; height: 320px"
            >
            </GMapMap>
          </div>
        </div>
      </main>
    </div> 
  </div>
</template>

<script>
import { ref, onMounted, inject, nextTick } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import { useRoute } from 'vue-router'
import moment from 'moment';
import { formatValue } from '../../utils/Utils'
import { useToast } from 'vue-toastification'

export default {
  name: 'OrderDetails',
  components: {
    Sidebar,
    Header,
    PaginationClassic,
    PaginationNumeric,
  },
  setup() {
    const $http = inject("$http")
    const router = useRoute()
    const sidebarOpen = ref(false)
    const center = ref({lat: -1.2882878, lng: 36.8274323})
    const marker = ref([])
    const zoom = ref(11)
    const mapRef = ref(null)
    const toast = useToast()

    const order = ref(null)

    const restaurant_lat = ref(0)
    const restaurant_lng = ref(0)

    const orderer_lat = ref(0)
    const orderer_lng = ref(0)

    const path = ref([])

    const directionsService = ref(null)
    const directionsDisplay = ref(null)

    const getOrderDetails = () => {
      order.value = null
      $http.get('/admin/orders/'+router.params.id+'/details')
        .then(response => {
          console.log(response.data.data)
          order.value = response.data.data
          restaurant_lat.value = order.value.restaurant.latitude
          restaurant_lng.value = order.value.restaurant.longitude
          orderer_lat.value = order.value.user.latitude
          orderer_lng.value = order.value.user.longitude
          path.value = [
            {lat: Number(restaurant_lat.value), lng: Number(restaurant_lng.value)},
            {lat: Number(orderer_lat.value), lng: Number(orderer_lng.value)},
          ]
          // console.log(path.value)
          nextTick().then(() => {
            mapRef.value.$gmapApiPromiseLazy().then(() => {
              directionsService.value = new google.maps.DirectionsService()
              directionsDisplay.value = new google.maps.DirectionsRenderer()
              directionsDisplay.value.setMap(mapRef.value.$mapObject)
            })

            getDirection(path.value[1], path.value[0])
          })
        })
    }

    onMounted(() => {
      getOrderDetails()
    })

    const getOrderId = (order) => {
      return order.uuid.split('-')[0].toUpperCase()
    }

    const resolveOrderStatus = (status) => {
      switch (status) {
        case 'Pending':
          return 'text-gray-100 bg-gray-500'
          break;
        case 'In Progress':
          return 'text-blue-100 bg-blue-500'
          break;
        case 'Delivered':
          return 'text-green-100 bg-green-500'
          break;
        case 'Awating Pick Up':
          return 'text-emarald-100 bg-emarald-500'
          break;
        case 'On Delivery':
          return 'text-gray-900 bg-yellow-200'
          break;
        case 'Denied':
          return 'text-red-100 bg-red-500'
          break;
        default:
          return 'text-gray-100 bg-gray-500'
          break;
      }
    }

    const getDirection = (orderer, restaurant) => {
      mapRef.value.$gmapApiPromiseLazy().then(() => {
        directionsDisplay.value.set('directions', null)
        directionsService.value.route(
          {
            origin: restaurant,
            destination: orderer,
            travelMode: 'DRIVING'
          },
          (result, status) => {
            if (status === 'OK') {
              directionsDisplay.value.setDirections(result)
            }
          }
        )
      })
    }

    return {
      moment,
      sidebarOpen,
      order,

      center,

      mapRef,
      zoom,
      marker,
      
      getOrderId,
      resolveOrderStatus,
      formatValue,

      path,
    }  
  }
}
</script>
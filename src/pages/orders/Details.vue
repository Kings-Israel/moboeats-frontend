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
            <div class="mb-4 sm:mb-0 flex">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{{ getOrderId(order) }} ✨</h1>
              <button v-if="!order.delivery" class="bg-green-700 text-gray-200 font-bold p-1 rounded-lg mx-2">Dine In Order</button>
            </div>
            <div class="flex gap-2">
              <button v-if="order.status === 'Pending'" class="btn btn-md bg-teal-300 hover:bg-teal-500 text-black text-lg" @click="updateOrder(order, '2')">Accept</button>
              <button v-if="order.status === 'Pending'" class="btn btn-md bg-red-700 hover:bg-red-500 text-black text-lg" @click="updateOrder(order, '0')">Reject</button>
            </div>
          </div>  
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-full" :class="order.delivery ? 'xl:col-span-4' : 'xl:col-span-6'">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">User Info</h2>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Name:</span><strong>{{ order.user.name }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Email:</span><strong>{{ order.user.email }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Phone Number:</span><strong>{{ order.user.phone_number }}</strong></h1>
                </div>
              </div>
              
            </div>
            <div class="col-span-full" :class="order.delivery ? 'xl:col-span-4' : 'xl:col-span-6'">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Restaurant Info</h2>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Name:</span><strong>{{ order.restaurant.name }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Email:</span><strong>{{ order.restaurant.email }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Phone Number:</span><strong>{{ order.restaurant.phone_no }}</strong></h1>
                </div>
              </div>
            </div>
            <div v-if="order.delivery" class="col-span-full xl:col-span-4">
              <div v-if="order.rider" class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Rider Info</h2>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Name:</span><strong>{{ order.rider.name }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Email:</span><strong>{{ order.rider.email }}</strong></h1>
                  <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Phone Number:</span><strong>{{ order.rider.phone_number }}</strong></h1>
                </div>
              </div>
              <div class="flex flex-col justify-center">
                <button v-if="!order.rider && (order.status == 'Pending' || order.status == 'In Progress')" class="btn w-full bg-red-800 text-white">Rider not assigned</button>
                <form @submit.prevent="assignRider" v-if="!order.rider && (order.status == 'Pending' || order.status == 'In Progress')">
                  <label for="riders">Select Rider</label>
                  <select name="assign_rider" id="" v-model="assign_rider_id" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="rider in riders" :key="rider.id" :value="rider.id">{{ rider.name }}</option>
                  </select>
                  <div class="flex justify-end mt-3">
                    <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                  </div>
                </form>
                <button v-if="order.status == 'Denied'" class="btn btn-lg w-full bg-red-600 text-white font-bold text-lg">Order Rejected</button>
              </div>
            </div>
          </div>
          <br>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-full xl:col-span-2" :class="order.delivery ? 'xl:col-span-2' : 'xl:col-span-3'">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Order Info</h2>
                  <div class="flex gap-2">
                    <button
                      class="btn bg-red-300 text-slate-900"
                      @click="assignTablesModal = true"
                      v-if="!order.delivery && order.reservation.status == 'pending'"
                    >
                      Assign To Tables
                    </button>
                    <button
                      class="btn bg-red-300 text-slate-900"
                      @click="updateDeliveryStatusModal = true"
                      v-if="!order.delivery && (order.reservation.status == 'pending' || order.reservation.status == 'in progress')"
                    >
                      Update Status
                    </button>
                    <button :class="'btn btn-sm '+resolveOrderStatus(order.status)">{{ order.status }}</button>
                  </div>
                </header>
                <modal-action v-if="!order.delivery" :id="'assignTablesModal'" :add-class="'max-w-lg'" :modal-open="assignTablesModal" @close-modal="assignTablesModal = false">
                  <h1 class="text-lg text-slate-800 dark:text-slate-200">Select Tables</h1>
                  <select name="tables" multiple size="5" v-model="tables" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="table in restaurant_tables" :key="table.id" :value="table.id">{{ table.name }} - (Capacity - {{ table.seat_number }})</option>
                  </select>
                  <div class="flex justify-end mt-2">
                    <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click="assignTables">Submit</button>
                  </div>
                </modal-action>
                <modal-action :id="'updateDeliveryStatusModal'" :add-class="'max-w-lg'" :modal-open="updateDeliveryStatusModal" @close-modal="updateDeliveryStatusModal = false">
                  <h1 class="text-lg text-slate-800 dark:text-slate-200">Update Status</h1>
                  <select name="status" v-model="updateStatus" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="completed">Completed</option>
                    <option value="no show">No Show</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div class="flex justify-end mt-2">
                    <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click="updateDineStatus(order)">Submit</button>
                  </div>
                </modal-action>
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex flex-col space-y-2 p-3">
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">ID:</span><strong>{{ getOrderId(order) }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Amount:</span><strong>{{ formatValue(order.total_amount - order.delivery_fee, order.country) }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Ordered On:</span><strong>{{ moment(order.created_at).format('Do MMM Y') }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100" v-if="order.delivery"><span class="font-semibold">Preparation Time:</span><strong>{{ order.preparation_time }} mins</strong></h1>
                    <!-- <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Order Items:</span><strong v-for="(item, index) in order.order_items" :key="item.id">{{ item.menu.title }}<span v-if="index != Object.keys(order.order_items).length - 1">, </span></strong></h1> -->
                  </div>
                  <div class="flex flex-col space-y-2 p-3" v-if="!order.delivery">
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Number of reserved seats:</span><strong>{{ order.reservation.seat_number }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span class="font-semibold">Reservation Date:</span><strong>{{ moment(order.booking_time).format('Do MMM Y H:m a') }}</strong></h1>
                    <div class="flex flex-col p-3">
                      <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100" v-if="order.order_tables.length > 0"><span class="font-semibold">Assigned Tables:</span><strong v-for="(item, index) in order.order_tables" :key="item.id">{{ item.restaurant_table.name }}<span v-if="index != Object.keys(order.order_items).length - 1">, </span></strong></h1>
                      <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100" v-else><span class="font-semibold">Assigned Tables:</span><strong class="text-red-500 underline">Table(s) Not Assigned</strong></h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div v-if="order.delivery" class="w-full">
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
import { ref, onMounted, watch, inject, nextTick } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import { useRoute } from 'vue-router'
import moment from 'moment';
import { formatValue } from '../../utils/Utils'
import { useToast } from 'vue-toastification'
import ModalAction from '../../components/ModalAction.vue'

export default {
  name: 'OrderDetails',
  components: {
    Sidebar,
    Header,
    PaginationClassic,
    PaginationNumeric,
    ModalAction,
  },
  setup() {
    const echo = inject('echo')
    const $http = inject("$http")
    const router = useRoute()
    const sidebarOpen = ref(false)
    const center = ref({lat: -1.2882878, lng: 36.8274323})
    const marker = ref([])
    const zoom = ref(11)
    const mapRef = ref(null)
    const toast = useToast()

    const order = ref(null)
    const riders = ref([])
    const assign_rider_id = ref('')

    const restaurant_lat = ref(0)
    const restaurant_lng = ref(0)

    const orderer_lat = ref(0)
    const orderer_lng = ref(0)

    const path = ref([])

    const directionsService = ref(null)
    const directionsDisplay = ref(null)

    const rider_location = ref([])
    const restaurant_tables = ref([])

    const updateDeliveryStatusModal = ref(false)
    const assignTablesModal = ref(false)

    const tables = ref([])

    const updateStatus = ref('')

    const getOrderDetails = () => {
      order.value = null
      $http.get('/admin/orders/'+router.params.id+'/details')
        .then(response => {
          order.value = response.data.data
          restaurant_lat.value = order.value.restaurant.latitude
          restaurant_lng.value = order.value.restaurant.longitude
          orderer_lat.value = order.value.delivery_location_lat
          orderer_lng.value = order.value.delivery_location_lng
          restaurant_tables.value = response.data.data.restaurant_tables

          path.value = [
            {lat: Number(restaurant_lat.value), lng: Number(restaurant_lng.value)},
            {lat: Number(orderer_lat.value), lng: Number(orderer_lng.value)},
          ]
          riders.value = response.data.data.riders
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

    watch(router, (newRoute, oldRoute) => {
      getOrderDetails()
    })

    const assignRider = () => {
      $http.post('restaurant/orders/assign', {
        order_id: router.params.id,
        rider_id: assign_rider_id.value
      })
        .then(() => {
          getOrderDetails()
          toast.success('Rider assigned successfully')
        })
        .catch(err => {
          console.error(err)
          toast.error(err.response.data.message)
        })
    }

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

    const updateOrder = (order, status) => {
      $http.post('/restaurant/orders/' + order.uuid + '/update', {
        status: status
      })
      .then(() => {
        getOrderDetails()
        toast.success('Order status updated successfully')
      })
    }

    const updateDineStatus = (order) => {
      $http.post('/restaurant/orders/reservation/' + order.uuid + '/status/update', {
        status: updateStatus.value
      })
      .then(() => {
        getOrderDetails()
        toast.success('Order status updated successfully')
        updateDeliveryStatusModal.value = false
      })
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

    const assignTables = () => {
      const formData = new FormData
      formData.append('restaurant_table_ids', tables.value)
      $http.post('restaurant/orders/reservation/'+router.params.id+'/assign', formData)
        .then(() => {
          getOrderDetails()
          assignTablesModal.value = false
          toast.success('Tables successfully assigned')
        })
        .catch(() => {
          toast.error('An error occurred while assigning the tables')
        })
    }

    return {
      moment,
      sidebarOpen,
      order,
      riders,

      center,

      mapRef,
      zoom,
      marker,

      rider_location,
      
      getOrderId,
      resolveOrderStatus,
      formatValue,
      assignRider,
      assign_rider_id,

      path,
      updateOrder,

      updateDeliveryStatusModal,
      assignTablesModal,

      tables,
      assignTables,
      restaurant_tables,

      updateStatus,
      updateDineStatus,
    }  
  }
}
</script>
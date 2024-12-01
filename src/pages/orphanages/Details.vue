<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow" v-if="orphanage != null">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0 flex gap-2">
              <img :src="orphanage.logo ? orphanage.logo : '../../src/images/icon-01.svg'" width="60" height="60" :alt="orphanage.name" class="rounded-full h-fit" />
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold my-auto">{{ orphanage.name }} ✨</h1>
            </div>
          </div>  
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-full xl:col-span-4">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Orphanage Info</h2>
                </header>
                <div class="flex gap-2 p-3">
                  <div class="flex flex-col space-y-2 w-[98%]">
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Email:</span><strong class="text-ellipsis overflow-hidden">{{ orphanage.email }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Phone Number:</span><strong class="text-ellipsis overflow-hidden">{{ orphanage.phone_no }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Created On:</span><strong class="text-ellipsis overflow-hidden">{{ moment(orphanage.created_at).format('Do MMM Y') }}</strong></h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full xl:col-span-4">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Orphanage Contact User Info</h2>
                </header>
                <div class="flex gap-3 p-3">
                  <div class="flex flex-col space-y-2 w-[98%]">
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Name:</span><strong class="text-ellipsis overflow-hidden">{{ orphanage.contact_user_name }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Email:</span><strong class="text-ellipsis overflow-hidden">{{ orphanage.contact_user_email }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Phone Number:</span><strong class="text-ellipsis overflow-hidden">{{ orphanage.contact_user_phone_number }}</strong></h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div class="w-full" v-if="orphanage.latitude && orphanage.longitude">
            <header class="py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Location</h2>
            </header>
            <GMapMap
              ref="mapRef"
              :center="center"
              :zoom="zoom"
              :options="{
                fullscreenControl: false,
              }"
              map-type-id="terrain"
              style="width: 78vw; height: 320px"
            >
              <GMapMarker
                v-for="(m, index) in marker"
                :key="index"
                :position="m.position"
              />
            </GMapMap>
          </div>
        </div>
      </main>
    </div> 
  </div>
</template>

<script>
import { ref, onMounted, inject, watch, onUnmounted } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import { useRoute } from 'vue-router'
import moment from 'moment';
import { formatValue, userPermissions } from '../../utils/Utils'
import { useToast } from 'vue-toastification'
import ModalAction from '../../components/ModalAction.vue'

export default {
  name: 'RestaurantDetails',
  components: {
    Sidebar,
    Header,
    PaginationClassic,
    PaginationNumeric,
    ModalAction,
  },
  setup() {
    const $http = inject("$http")
    const toast = useToast()
    const router = useRoute()
    const sidebarOpen = ref(false)
    const center = ref({lat: 51.093048, lng: 6.842120})
    const marker = ref([])
    const zoom = ref(16)
    const mapRef = ref(null)

    const orphanage = ref(null)

    const getRestaurant = () => {
      $http.get('/orphanages/'+router.params.id+'/show')
        .then(response => {
          orphanage.value = response.data.data
          center.value = {lat: Number(orphanage.value.location_lat), lng: Number(orphanage.value.location_long)}
          marker.value.push({ position: { lat: Number(orphanage.value.location_lat), lng: Number(orphanage.value.location_long) } })
        })
    }

    onMounted(() => {
      getRestaurant()
    })

    const resolveStatus = (status) => {
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
          return 'text-slate-100 bg-slate-500'
          break;
        case 'Denied':
          return 'text-red-100 bg-red-500'
          break;
        default:
          return 'text-gray-100 bg-gray-500'
          break;
      }
    }

    const updateStatus = (status) => {
      $http.post(`/admin/restaurants/${router.params.id}/status/update`, {
        status: status,
        reason: statusReason.value
      })
      .then((res) => {
        getRestaurant()
        toast.success('Restaurant updated successfully')
        if (modalOpen.value) {
          modalOpen.value = false
          statusReason.value = ''
        }
      })
      .catch(err => {
        if (err.response.status == 422) {
          toast.error('Please enter rejection reason')
        }
      })
    }

    return {
      userPermissions,
      moment,
      sidebarOpen,
      orphanage,

      center,

      mapRef,
      zoom,
      marker,

      updateStatus,
      resolveStatus,
    }  
  }
}
</script>
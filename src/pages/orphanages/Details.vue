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
            <div class="mb-4 sm:mb-0 flex justify-between gap-2 w-full">
              <div class="flex gap-2">
                <img :src="orphanage.logo ? orphanage.logo : '../../src/images/icon-01.svg'" width="60" height="60" :alt="orphanage.name" class="rounded-full h-fit" />
                <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold my-auto">{{ orphanage.name }} ✨</h1>
              </div>
              <div class="flex h-fit my-auto">
                <button type="button" class="bg-emerald-400 text-white font-bold rounded-md p-2 mx-2" @click="updateStatus('approved')" v-if="orphanage.status == 'Pending' && userPermissions('edit orphanages')">Approve</button>
                <button class="bg-red-400 text-white font-bold rounded-md p-2" type="button" @click="rejectOrphanage = true" v-if="orphanage.status == 'Pending' && userPermissions('edit orphanages')">Reject</button>
                <modal-action :id="'addMenu'" :modal-open="rejectOrphanage" @close-modal="rejectOrphanage = false" :add-class="'max-w-lg'">
                  <span class="text-xl font-bold px-4">Reject Orphanage</span>
                  <!-- Add/Edit Menu -->
                  <form class="flex flex-col justify-around p-4" @submit.prevent="updateStatus('rejected')">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Enter Reason For Rejection</label>
                      <textarea class="form-input w-full rounded-lg" cols="8" v-model="rejection_reason"></textarea>
                    </div>
                    <div class="flex justify-end bottom-2 mt-2">
                      <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                    </div>
                  </form>
                </modal-action>
                <button class="bg-emerald-500 text-white font-bold rounded-md p-2" v-if="orphanage.status == 'Approved'">Approved</button>
                <button class="bg-red-500 text-white font-bold rounded-md p-2" v-if="orphanage.status == 'Rejected'">Rejected</button>
              </div>
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

    const rejection_reason = ref('')
    const rejectOrphanage = ref(false)

    const getRestaurant = () => {
      $http.get('/orphanages/'+router.params.id+'/show')
        .then(response => {
          orphanage.value = response.data.data
          center.value = {lat: Number(orphanage.value.latitude), lng: Number(orphanage.value.longitude)}
          marker.value.push({ position: { lat: Number(orphanage.value.latitude), lng: Number(orphanage.value.longitude) } })
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
      $http.post(`/admin/orphanages/${router.params.id}/status/update`, {
        status: status,
        reason: rejection_reason.value
      })
      .then((res) => {
        getRestaurant()
        toast.success('Orphanage updated successfully')
        if (rejectOrphanage.value) {
          rejectOrphanage.value = false
          rejection_reason.value = ''
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
      rejection_reason,

      center,

      mapRef,
      zoom,
      marker,

      rejectOrphanage,

      updateStatus,
      resolveStatus,
    }  
  }
}
</script>
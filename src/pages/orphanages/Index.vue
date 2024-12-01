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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Orphanages ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="flex gap-2">
              <button class="bg-indigo-700 hover:bg-indigo-500 p-2 text-white font-semibold rounded-full px-3" @click="addOrphanage = true">Add Orphanage</button>
              <modal-action :id="'addMenu'" :modal-open="addOrphanage" @close-modal="addOrphanage = false" :add-class="'max-w-4xl'">
                <span class="text-xl font-bold px-4">Add Orphanage</span>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around p-4" @submit.prevent="createOrphanage">
                  <div class="grid grid-cols-2 gap-2">
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Name</label>
                        <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addOrphanageName" />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Email</label>
                        <input id="title" class="form-input w-full rounded-lg" type="email" v-model="addOrphanageEmail" />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Phone Number</label>
                        <input id="title" class="form-input w-full rounded-lg" type="tel" v-model="addOrphanagePhoneNumber" />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="profile_picture">Logo</label>
                        <input id="profile_picture" accept=".jpg,.png,.jpeg" v-on:change="onFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" autoComplete="on" />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Contact Person's Name</label>
                        <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addOrphanageContactName" />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Contact Person's Email</label>
                        <input id="title" class="form-input w-full rounded-lg" type="email" v-model="addOrphanageContactEmail" />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Contact Person's Phone Number</label>
                        <input id="title" class="form-input w-full rounded-lg" type="tel" v-model="addOrphanageContactPhoneNumber" />
                      </div>
                    </div>
                    <div class="px-2 col-span-2">
                      <label class="block text-sm font-medium mb-1" for="name">Location <span class="text-rose-500">*</span></label>
                      <GMapAutocomplete
                        class="w-full border-2 border-slate-400 py-2 my-1 px-2 rounded-md text-slate-900"
                        placeholder="Search Location"
                        @place_changed="setPlace"
                      >
                      </GMapAutocomplete>
                      <GMapMap
                        ref="mapRef"
                        :center="center"
                        :zoom="zoom"
                        @click="setPlace"
                        :options="{
                          fullscreenControl: false,
                        }"
                        map-type-id="terrain"
                      >
                        <GMapMarker
                          v-for="(m, index) in marker"
                          :key="index"
                          :position="m.position"
                        />
                      </GMapMap>
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 mt-2">
                    <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                  </div>
                </form>
              </modal-action>
              <button class="bg-emerald-600 px-3 py-1 col-span-1 text-slate-50 font-semibold rounded-full justify-end" @click="exportRestaurants()">Export Orphanages</button>
            </div>
          </div>

          <div class="grid grid-cols-3 mb-2 gap-4">
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
            <button class="bg-red-500 text-white rounded-full col-span-1 h-fit py-1 my-auto justify-self-end w-52" @click="search = '', status = ''">Clear Search Fields</button>
          </div>

          <!-- Table -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <header class="px-5 py-4">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Orphanages <span class="text-slate-400 dark:text-slate-500 font-medium">{{ totalItems }}</span></h2>
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
                        <div class="font-semibold text-left">Contact</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Location</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody v-if="orphanages.length > 0" class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                    <tr v-for="orphanage in orphanages" :key="orphanage.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="shrink-0 mr-2 sm:mr-3">
                            <img class="w-10 h-10 object-cover rounded-full" :src="orphanage.logo" :alt="orphanage.name" />
                          </div>
                          <div class="font-medium text-slate-800 dark:text-slate-100">{{orphanage.name}}</div>
                        </div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div :class="'text-center rounded-xl '+resolveRestaurantStatus(orphanage.status)">{{ orphanage.status }}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{ orphanage.contact_user_name }} ({{orphanage.contact_user_email}})</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{orphanage.location}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <router-link class="btn bg-[#2E5945] hover:bg-[#16251d] transition duration-200 ease-in-out text-white btn-sm" :to="{ name: 'orphanages-details', params: { id: orphanage.id } }">
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
import { useToast } from 'vue-toastification'
import ModalAction from '../../components/ModalAction.vue'

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
    ModalAction,
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
    const toast = useToast()

    let search = ref('')

    let status = ref('')

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const orphanages = ref([])

    const addOrphanage = ref(false)

    const addOrphanageName = ref('')
    const addOrphanageEmail = ref('')
    const addOrphanageContactName = ref('')
    const addOrphanageContactEmail = ref('')
    const addOrphanagePhoneNumber = ref('')
    const addOrphanageContactPhoneNumber = ref('')
    const addOrphanageLocation = ref('')
    const addOrphanageLocationLat = ref('')
    const addOrphanageLocationLong = ref('')
    const addOrphanageLogo = ref('')

    const zoom = ref(7)
    const center = ref({lat: 51.093048, lng: 6.842120})
    const marker = ref([])
    const place_id = ref('')

    onMounted(() => {
      $http.get('/orphanages')
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          orphanages.value = response.data.data.data
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
          restaurants.value = []
          orphanages.value = response.data.data.data
        })
    }

    const createOrphanage = () => {
      const formData = new FormData
      formData.append('name', addOrphanageName.value)
      formData.append('phone_number', addOrphanagePhoneNumber.value)
      formData.append('email', addOrphanageEmail.value)
      formData.append('phone_number', addOrphanagePhoneNumber.value)
      formData.append('contact_name', addOrphanageContactName.value)
      formData.append('contact_email', addOrphanageContactEmail.value)
      formData.append('contact_phone_number', addOrphanageContactPhoneNumber.value)
      formData.append('location', addOrphanageLocation.value)
      formData.append('location_lat', addOrphanageLocationLat.value)
      formData.append('location_long', addOrphanageLocationLong.value)
      formData.append('logo', addOrphanageLogo.value)

      $http.post('/orphanages/store', formData)
        .then(() => {
          toast.success('Orphanage added successfully')
          addOrphanage.value = false
          addOrphanageName.value = ''
          addOrphanageEmail.value = ''
          addOrphanagePhoneNumber.value = ''
          addOrphanageContactName.value = ''
          addOrphanageContactPhoneNumber.value = ''
          addOrphanageContactEmail.value = ''
          addOrphanageLocation.value = ''
          addOrphanageLocationLat.value = ''
          addOrphanageLocationLong.value = ''
          addOrphanageLogo.value = null
          $http.get('/orphanages')
            .then(response => {
              nextPageUrl.value = response.data.data.next_page_url
              lastPageUrl.value = response.data.data.last_page_url
              prevPageUrl.value = response.data.data.prev_page_url
              totalItems.value = response.data.data.total
              from.value = response.data.data.from
              to.value = response.data.data.to
              orphanages.value = response.data.data.data
            })
        })
      .catch(err => {
        console.log(err)
        toast.error('An error occured while adding the orphanage')
      })
    }

    const onFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      addOrphanageLogo.value = files[0];
    }

    const setPlace = (e) => {
      addOrphanageLocationLat.value = e.geometry.location.lat()
      addOrphanageLocationLong.value = e.geometry.location.lng()
      place_id.value = e.place_id
      addOrphanageLocation.value = e.formatted_address
      zoom.value = 18
      center.value = {lat: e.geometry.location.lat(), lng: e.geometry.location.lng()}
      marker.value = []
      marker.value.push({ position: { lat: e.geometry.location.lat(), lng: e.geometry.location.lng() } })
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
      $http.get('/orphanages/export/data?search='+search.value+'&status='+status.value,
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
      $http.get('/orphanages?search='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          restaurants.value = []
          orphanages.value = response.data.data
        })
    })

    watch(status, async (newStatus, oldQuestion) => {
      $http.get('/orphanages?status='+newStatus)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          restaurants.value = []
          orphanages.value = response.data.data
        })
    })

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      orphanages,
      nextPageUrl,
      prevPageUrl,
      lastPageUrl,
      totalItems,
      from,
      to,
      changePage,
      search,
      status,
      resolveRestaurantStatus,
      exportRestaurants,
      createOrphanage,
      addOrphanageName,
      addOrphanageEmail,
      addOrphanagePhoneNumber,
      addOrphanageContactName,
      addOrphanageContactEmail,
      addOrphanageContactPhoneNumber,
      addOrphanageLocation,
      addOrphanageLocationLat,
      addOrphanageLocationLong,
      zoom,
      place_id,
      marker,
      center,
      addOrphanage,
      onFileChange,
      setPlace,
    }  
  }
}
</script>
<style scoped>
.vue-map-container {
  height: 320px;
}
</style>
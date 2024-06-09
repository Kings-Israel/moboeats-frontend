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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Supplement Suppliers ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button class="bg-[#1c2e2a] hover:bg-[#6a6d2b] p-2 text-white font-semibold rounded-full px-3" @click="addSupplierModal = true">Add Supplier</button>
              <modal-action :id="'addSupplier'" :modal-open="addSupplierModal" @close-modal="addSupplierModal = false" :add-class="'max-w-4xl'">
                <p class="text-xl font-bold text-white">Add Supplier</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="storeSupplier">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Name</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="supplierName" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Description</label>
                      <textarea id="description" class="form-input w-full rounded-lg" type="text" v-model="supplierDescription" placeholder="Type of products, expertise...."></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Location</label>
                      <GMapAutocomplete
                        class="w-full border-2 border-slate-400 py-2 my-1 px-2 rounded-md text-slate-900"
                        placeholder="Search Location"
                        @place_changed="setPlace"
                      >
                      </GMapAutocomplete>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Supplier Logo</label>
                      <input id="image" class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" accept=".jpg,.png" type="file" @change="selectImage" />
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 mt-2">
                    <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
                  </div>
                </form>
              </modal-action>
            </div>
          </div>

          <div class="flex justify-between gap-2 mb-2">
            <form class="relative w-[40%]">
              <label for="action-search" class="">Search</label>
              <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full" type="search" v-model="supplierSearch" placeholder="Search Menus" />
              <button class="absolute inset-0 top-6 right-auto group" type="submit" aria-label="Search">
                <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
            <button class="bg-red-500 text-white rounded-full h-fit w-[30%] py-1 my-auto" @click="search = ''">Clear Fields</button>
          </div>

          <!-- Table -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <div class="">
              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Name</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Location</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Products</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Orders</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Created On</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium bg-slate-50 divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="supplier in suppliers.data" :key="supplier.id" class='bg-slate-100 transition duration-200 ease-in-out'>
                        <td class="p-2">
                          <div class="flex items-center">
                            <ul class="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
                              <li>
                                <img class="w-9 h-9 rounded-full" :src="supplier.image" width="36" height="36" alt="menu" />
                              </li>
                            </ul>
                            <div class="text-sky-700 font-semibold mx-2">{{ supplier.name }}</div>
                          </div>
                          <!-- <div class="text-sky-700 font-semibold">{{ supplier.name }}</div> -->
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ supplier.location }}</div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ supplier.supplements.length }}</div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ supplier.orders_count }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold">{{ moment(supplier.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td>
                          <a href="#" class="bg-[#6a6d2b] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md">View</a>
                          <a v-if="supplier.status == 'active'" href="#" @click="updateStatus(supplier.id)" class="bg-[#3d1919] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md mx-1">Deactivate</a>
                          <a v-else href="#" @click="updateStatus(supplier.id)" class="bg-[#1b3715] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md mx-1">Activate</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- Pagination -->
            <div class="my-4" v-if="suppliers.data">
              <PaginationClassic @change-page="changePage" :next_page="suppliers.links.next" :prev_page="suppliers.links.prev" :from="suppliers.meta.from" :to="suppliers.meta.to" :total_items="suppliers.meta.total" />
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
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import { useRoute } from 'vue-router'
import moment from 'moment';
import { formatValue } from '../../utils/Utils'
import { useToast } from 'vue-toastification'
import ModalAction from '../../components/ModalAction.vue'

export default {
  name: 'Discounts',
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

    const per_page = ref(10)

    const suppliers = ref([])

    const supplierSearch = ref('')

    const supplierName = ref('')
    const supplierDescription = ref('')
    const supplierLocation = ref('')
    const supplierImage = ref(null)

    const addSupplierModal = ref(false)

    const getSuppliers = () => {
      $http.get(`/admin/supplements/suppliers`, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          suppliers.value = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    const storeSupplier = () => {
      const formData = new FormData
      formData.append('name', supplierName.value)
      formData.append('description', supplierDescription.value)
      formData.append('location', supplierLocation.value)
      formData.append('image', supplierImage.value)
      $http.post('/admin/supplements/suppliers/store', formData)
      .then(() => {
        getSuppliers()
        supplierName.value = ''
        supplierDescription.value = ''
        supplierLocation.value = ''
        supplierImage.value = null
        addSupplierModal.value = false
        toast.success('Supplier added successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while adding the supplier')
      })
    }

    const updateStatus = supplier => {
      $http.get(`/admin/supplements/suppliers/${supplier}/status/update`)
      .then(() => {
        getSuppliers()
        toast.success('Supplier updated successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while updating the supplier')
      })
    }

    const exportPromocodes = () => {
      $http.get('/admin/suppliers/export?search='+supplierSearch.value,
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
            `Suppliers.xlsx`,
          )
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(err => {
          console.log(err)
        })
    }

    const setPlace = (e) => {
      supplierLocation.value = e.formatted_address
      // latitude.value = e.geometry.location.lat()
      // longitude.value = e.geometry.location.lng()
      // place_id.value = e.place_id
      // map_location.value = e.url
      // zoom.value = 18
      // center.value = {lat: e.geometry.location.lat(), lng: e.geometry.location.lng()}
      // marker.value = []
      // marker.value.push({ position: { lat: e.geometry.location.lat(), lng: e.geometry.location.lng() } })
    }

    const selectImage = (e) => {
      for (let index = 0; index < 1; index++) {
        if (e.target.files[index]) {
          supplierImage.value = e.target.files[index]
        }
      }
    }

    onMounted(() => {
      getSuppliers()
    })

    watch(supplierSearch, async (newSearch, oldSearch) => {
      $http.get('/admin/supplements/supliers', {
        params: {
          per_page: per_page.value,
          search: newSearch
        }
      })
        .then(response => {
          suppliers.value = response.data.data
        })
    })

    function changePage(page) {
      $http.get(page, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          suppliers.value = response.data.data
        })
    }

    return {
      moment,
      sidebarOpen,
      per_page,
      suppliers,
      supplierSearch,
      supplierName,
      supplierDescription,
      supplierLocation,
      supplierImage,
      addSupplierModal,
      storeSupplier,
      setPlace,
      updateStatus,
      selectImage,
      changePage,
      exportPromocodes,
    }
  }
}
</script>
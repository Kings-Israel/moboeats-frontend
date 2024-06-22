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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Diet Plan Packages ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button class="bg-[#1c2e2a] hover:bg-[#6a6d2b] p-2 text-white font-semibold rounded-full px-3" @click="addPackageModal = true">Add Diet Plan Package</button>
              <modal-action :id="'addPackage'" :modal-open="addPackageModal" @close-modal="addPackageModal = false" :add-class="'max-w-4xl'">
                <p class="text-xl font-bold text-white">Add Package</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="storePackage">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Name</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="packageName" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Tag Line</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="packageTagLine" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Description</label>
                      <textarea id="description" class="form-input w-full rounded-lg" type="text" v-model="packageDescription" placeholder="Type of products, expertise...."></textarea>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Price Currency</label>
                        <select name="supplier" v-model="packageCurrency" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="">Select Price Currency</option>
                          <option value="gbp">British Pounds</option>
                          <option value="kes">Kenyan Shilling</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Price</label>
                        <input id="title" class="form-input w-full rounded-lg" type="number" min="1" v-model="packagePrice" />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Package Duration</label>
                      <select name="supplier" v-model="packageDuration" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select Subscription Renewal Duration</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="half annually">Half Annually</option>
                        <option value="annually">Annually</option>
                      </select>
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
              <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full" type="search" v-model="packageSearch" placeholder="Search Packages" />
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
                          <div class="font-semibold text-left">Price</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Tag Line</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">No. of Subscribers</div>
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
                      <tr v-for="diet_package in packages.data" :key="diet_package.id" class='bg-slate-100 transition duration-200 ease-in-out'>
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold">{{ diet_package.name }}</div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ diet_package.price }}</div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ diet_package.tag_line }}</div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ diet_package.subscriptions.length }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold">{{ moment(diet_package.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td>
                          <a href="#" class="bg-[#6a6d2b] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md">View</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- Pagination -->
            <div class="my-4" v-if="packages.data">
              <PaginationClassic @change-page="changePage" :next_page="packages.links.next" :prev_page="packages.links.prev" :from="packages.meta.from" :to="packages.meta.to" :total_items="packages.meta.total" />
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
  name: 'DietSettings',
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

    const packages = ref([])

    const packageSearch = ref('')

    const packageName = ref('')
    const packageTagLine = ref('')
    const packageDescription = ref('')
    const packagePrice = ref('')
    const packageCurrency = ref('')
    const packageDuration = ref('')

    const addPackageModal = ref(false)

    const getPackage = () => {
      $http.get(`/admin/diet/packages`, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          packages.value = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    const storePackage = () => {
      const formData = new FormData
      formData.append('name', packageName.value)
      formData.append('tag_line', packageTagLine.value)
      formData.append('description', packageDescription.value)
      formData.append('price', packagePrice.value)
      formData.append('currency', packageCurrency.value)
      formData.append('duration', packageDuration.value)
      $http.post('/admin/diet/packages/store', formData)
      .then(() => {
        getPackage()
        packageName.value = ''
        packageTagLine.value = ''
        packageDescription.value = ''
        packagePrice.value = ''
        packageCurrency.value = ''
        packageDuration.value = null
        addPackageModal.value = false
        toast.success('Package added successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while adding the package')
      })
    }

    const exportPromocodes = () => {
      $http.get('/admin/suppliers/export?search='+packageSearch.value,
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

    onMounted(() => {
      getPackage()
    })

    watch(packageSearch, async (newSearch, oldSearch) => {
      $http.get('/admin/diet/packages', {
        params: {
          per_page: per_page.value,
          search: newSearch
        }
      })
        .then(response => {
          packages.value = response.data.data
        })
    })

    function changePage(page) {
      $http.get(page, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          packages.value = response.data.data
        })
    }

    return {
      moment,
      sidebarOpen,
      per_page,
      packages,
      packageSearch,
      packageName,
      packageTagLine,
      packageDescription,
      packageCurrency,
      packagePrice,
      packageDuration,
      addPackageModal,
      storePackage,
      changePage,
      exportPromocodes,
    }
  }
}
</script>
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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Partners Payouts ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button v-if="userPermissions('upload payouts')" class="bg-[#1c2e2a] hover:bg-[#6a6d2b] p-2 text-white font-semibold rounded-full px-3" @click="uploadPayoutModal = true">Upload Payout</button>
              <modal-action :id="'addSupplier'" :modal-open="uploadPayoutModal" @close-modal="uploadPayoutModal = false" :add-class="'max-w-4xl'">
                <p class="text-xl font-bold text-white">Upload Payout</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="upload">
                  <div class="space-y-4">
                    <div>
                      <input id="dropzone-file" type="file" class="w-full border-2 rounded-lg" accept=".xlsx" v-on:change="selectFile" />
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 mt-2">
                    <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
                  </div>
                </form>
              </modal-action>
              <form class="relative">
                <label for="action-search" class="sr-only">Search</label>
                <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800" type="search" v-model="search" placeholder="Search Riders" />
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
                        <div class="font-semibold text-left">Email</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Amount</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                    <tr v-for="payout in payouts.data" :key="payout.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-10 h-10 shrink-0 mr-2 sm:mr-3" v-if="payout.payable && payout.payable.logo">
                            <img class="rounded-full" :src="payout.payable.logo" width="40" height="40" :alt="payout.payable.name" />
                          </div>
                          <div class="font-medium text-slate-800 dark:text-slate-100" v-if="payout.payable">{{payout.payable.name}}</div>
                        </div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left" v-if="payout.payable">{{payout.payable.email}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left font-medium flex w-fit px-2 py-1 rounded-md text-green-500" v-if="payout.payable">{{formatValue(payout.amount, payout.payable.country)}}</div>
                      </td>
                      <td class="px-2 py-3 whitespace-nowrap w-px flex gap-1" v-if="payout.payable">
                        <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm" :to="{ name: 'restaurant-details', 'params': { id: payout.payable.id }}">View</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-8">
            <PaginationClassic @change-page="changePage" :next_page="payouts.next_page_url" :prev_page="payouts.prev_page_url" :from="payouts.from" :to="payouts.to" :total_items="payouts.total" />
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
import ModalAction from '../../components/ModalAction.vue'
import { useToast } from 'vue-toastification'
import { formatValue, userPermissions } from '../../utils/Utils'

export default {
  name: 'RidersPayout',
  components: {
    Sidebar,
    Header,
    DeleteButton,
    DateSelect,
    FilterButton,
    CustomersTable,
    PaginationClassic,
    PaginationNumeric,
    ModalAction,
  },
  setup() {
    const toast = useToast()
    const $http = inject("$http")
    const sidebarOpen = ref(false)

    const file = ref('')
    const uploadPayoutModal = ref(false)

    let search = ref('')

    const payouts = ref([])

    const selectFile = (e) => {
      file.value = e.target.files[0]
    }

    onMounted(() => {
      $http.get('/admin/payouts/partners')
        .then(response => {
          payouts.value = response.data.data.payouts
        })
    })

    const upload = () => {
      const formData = new FormData
      formData.append('file', file.value)
      $http.post('admin/payouts/upload', formData)
      .then(res => {
        uploadPayoutModal.value = false
        toast.success('Uploaded successfully');
        file.value = null
        $http.get('admin/payouts/partners')
        .then(response => {
          payouts.value = response.data.data.payouts
        })
      })
      .catch(err => {
        console.log(err)
        toast.error('An error occurred');
      })
    }

    function changePage(page) {
      $http.get(page)
        .then(response => {
          payouts.value = response.data.data.payouts
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/admin/payouts/partners?search='+newSearch)
        .then(response => {
          payouts.value = response.data.data.payouts
        })
    })

    return {
      userPermissions,
      sidebarOpen,
      payouts,
      changePage,
      upload,
      selectFile,
      formatValue,
      search,
      uploadPayoutModal,
    }  
  }
}
</script>
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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Diet Plan Subscribers ✨</h1>
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
                        <div class="font-semibold text-left">User Name</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Email</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Phone Number</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Subscription Status</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Diet Plans</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                    <tr v-for="customer in customers.data" :key="customer.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img class="rounded-full" :src="customer.image" width="40" height="40" :alt="customer.name" />
                          </div>
                          <div class="font-medium text-slate-800 dark:text-slate-100">{{customer.name}}</div>
                        </div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{customer.email}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{customer.phone_number}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left w-fit m_title" :class="customer.diet_subscriptions[0].status == 'pending' ? 'bg-red-600 text-white px-2 py-1 rounded-md' : 'bg-emerald-400 text-white px-2 py-1 rounded-md'">{{customer.diet_subscriptions[0].status}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{customer.diet_plans.length}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <router-link class="btn bg-[#2E5945] hover:bg-[#16251d] transition duration-200 ease-in-out text-white btn-sm" :to="{ name: 'diet-subscriber', params: { id: customer.uuid } }">
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
            <PaginationClassic @change-page="changePage" :next_page="customers.next_page" :prev_page="customers.prev_page" :from="customers.from" :to="customers.to" :total_items="customers.total" />
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
  name: 'DietSubscribers',
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
    const toast = useToast()
    const $http = inject("$http")
    const sidebarOpen = ref(false)
    const selectedItems = ref([])
    const name = ref('')
    const email = ref('')
    const phone_number = ref('')
    const role = ref('')
    const addUserModal = ref(false)

    let search = ref('')

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const customers = ref([])

    onMounted(() => {
      $http.get('/admin/diet/plans/subscribers')
        .then(response => {
          customers.value = response.data.data
        })
    })

    function changePage(page) {
      $http.get(page)
        .then(response => {
          customers.value = response.data.data
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/admin/diet/plans/subscribers?search='+newSearch)
        .then(response => {
          customers.value = response.data
        })
    })

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      customers,
      changePage,
      search,
      name,
      email,
      phone_number,
      role,
      addUserModal,
    }  
  }
}
</script>
<style scoped>
.m_title::first-letter {
  text-transform: capitalize;
}
</style>
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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Supplements Administrators ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button class="bg-[#1c2e2a] hover:bg-[#6a6d2b] p-2 text-white font-semibold rounded-full px-3" @click="addUserModal = true">Add Admin</button>
              <modal-action :id="'addAdmin'" :modal-open="addUserModal" @close-modal="addUserModal = false" :add-class="'max-w-4xl'">
                <p class="text-xl font-bold text-white">Add Admin</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="storeUser">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Name</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="name" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Email</label>
                      <input id="title" class="form-input w-full rounded-lg" type="email" v-model="email" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Phone Number</label>
                      <input id="title" class="form-input w-full rounded-lg" type="number" v-model="phone_number" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Role</label>
                      <select name="role" v-model="role" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="supplements-admin">Supplements Admin</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 mt-2">
                    <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
                  </div>
                </form>
              </modal-action>

              <form class="relative">
                <label for="action-search" class="sr-only">Search</label>
                <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800" type="search" v-model="search" placeholder="Search Restaurants" />
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
            <header class="px-5 py-4">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Supplements Admins <span class="text-slate-400 dark:text-slate-500 font-medium">{{ customers.length }}</span></h2>
            </header>
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
  name: 'RestaurantAdmins',
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
      $http.get('/admin/users/supplements-admin')
        .then(response => {
          customers.value = response.data.data
        })
    })

    const storeUser = () => {
      $http.post('/admin/users/store', {
        name: name.value,
        email: email.value,
        phone_number: phone_number.value,
        role: role.value,
      })
      .then(() => {
        $http.get('/admin/users/supplements-admin')
          .then(response => {
            customers.value = response.data.data
          })
        name.value = ''
        email.value = ''
        phone_number.value = ''
        role.value = ''
        addUserModal.value = false
        toast.success('User added successfully')
      })
      .catch(err => {
        console.log(err)
        toast.error('Error while adding user')
      })
    }

    function changePage(page) {
      $http.get(page)
        .then(response => {
          customers.value = response.data.data
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/admin/users/supplements-admin?search='+newSearch)
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
      storeUser,
      addUserModal,
    }  
  }
}
</script>
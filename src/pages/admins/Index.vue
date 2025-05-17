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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Administrators ✨</h1>
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
                      <select name="role" v-model="userRole" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select Role</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                      </select>
                    </div>
                    <div class="flex flex-col gap-2">
                      <div class="grid grid-cols-3 gap-2">
                        <div v-for="country in activeCountries" :key="country.id" class="flex gap-1">
                          <input type="checkbox" name="" id="" @change="updateSelected(country.id)" class="border-primary rounded-md p-2 my-auto" :checked="userCountries.includes(country.id)">
                          <label for="" class="text-primary font-semibold">{{ country.name }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 mt-2">
                    <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
                  </div>
                </form>
              </modal-action>

              <form class="relative">
                <label for="action-search" class="sr-only">Search</label>
                <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800" type="search" v-model="search" placeholder="Search Admins" />
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
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Admins</h2>
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
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Roles</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                    <tr v-for="admin in admins.data" :key="admin.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img class="rounded-full" :src="admin.image" width="40" height="40" :alt="admin.name" />
                          </div>
                          <div class="font-medium text-slate-800 dark:text-slate-100">{{admin.name}}</div>
                        </div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{admin.email}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left">{{admin.phone_number}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3">
                        <div class="m_title" v-for="role in admin.roles" :key="role.id">
                          <span class="bg-slate-200 text-slate-800 p-1 rounded-lg px-3">{{ role.name }}</span>
                        </div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <a href="#" class="bg-[#6a6d2b] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md" @click="editUser(admin)">Edit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <modal-action :id="'addAdmin'" :modal-open="editUserModal" @close-modal="editUserModal = false" :add-class="'max-w-4xl'">
                <p class="text-xl font-bold text-white">Update Role</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="updateUser">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Name</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="name" readonly />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Email</label>
                      <input id="title" class="form-input w-full rounded-lg" type="email" v-model="email" readonly />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Phone Number</label>
                      <input id="title" class="form-input w-full rounded-lg" type="number" v-model="phone_number" readonly />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Role</label>
                      <select name="role" v-model="userRole" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select Role</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                      </select>
                    </div>
                    <div class="flex flex-col gap-2">
                      <div class="grid grid-cols-3 gap-2">
                        <div v-for="country in activeCountries" :key="country.id" class="flex gap-1">
                          <input type="checkbox" name="" id="" @change="updateSelected(country.id)" class="border-primary rounded-md p-2 my-auto" :checked="userCountries.includes(country.id)">
                          <label for="" class="text-primary font-semibold">{{ country.name }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 mt-2">
                    <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
                  </div>
                </form>
              </modal-action>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-8">
            <PaginationClassic @change-page="changePage" :next_page="admins.next_page" :prev_page="admins.prev_page" :from="admins.from" :to="admins.to" :total_items="admins.total" />
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
    const userId = ref('')
    const name = ref('')
    const email = ref('')
    const phone_number = ref('')
    const userRole = ref('')
    const userCountries = ref([])
    const addUserModal = ref(false)
    const editUserModal = ref(false)

    const activeCountries = ref([])

    let search = ref('')

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const admins = ref([])
    const roles = ref([])

    onMounted(() => {
      getCountries()
      $http.get('/admin/admins')
        .then(response => {
          admins.value = response.data.data.users
          roles.value = response.data.data.roles
        })
    })

    const getCountries = () => {
      $http.get(`/admin/countries`, {
        params: {
          status: 'active'
        }
      })
        .then(response => {
          activeCountries.value = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    const storeUser = () => {
      $http.post('/admin/users/store', {
        name: name.value,
        email: email.value,
        phone_number: phone_number.value,
        role: userRole.value,
        user_countries: userCountries.value
      })
      .then(() => {
        $http.get('/admin/admins')
          .then(response => {
            admins.value = response.data.data.users
          })
        name.value = ''
        email.value = ''
        phone_number.value = ''
        userRole.value = ''
        userCountries.value = []
        addUserModal.value = false
        toast.success('User added successfully')
      })
      .catch(err => {
        console.log(err)
        toast.error('Error while adding user')
      })
    }

    const editUser = (user) => {
      userId.value = user.id
      name.value = user.name
      email.value = user.email
      phone_number.value = user.phone_number
      user.countries.forEach(country => {
        userCountries.value.push(country.id)
      });
      userRole.value = user.roles.length > 0  ? user.roles[0].id : ''
      editUserModal.value = true
    }

    const updateUser = () => {
      $http.post('/admin/admins/update', {
        user_id: userId.value,
        role_id: userRole.value,
        user_countries: userCountries.value
      })
      .then(() => {
        $http.get('/admin/admins')
          .then(response => {
            admins.value = response.data.data.users
          })
        userId.value = ''
        name.value = ''
        email.value = ''
        phone_number.value = ''
        userRole.value = ''
        userCountries.value = []
        editUserModal.value = false
        toast.success('User added successfully')
      })
      .catch(err => {
        console.log(err)
        toast.error('Error while adding user')
      })
    }

    const updateSelected = (id) => {
      if (userCountries.value.includes(id)) {
        const index = userCountries.value.indexOf(id)
        userCountries.value.splice(index, 1)
      } else {
        userCountries.value.push(id)
      }
    }

    function changePage(page) {
      $http.get(page)
        .then(response => {
          admins.value = response.data.data.users
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/admin/admins?search='+newSearch)
        .then(response => {
          admins.value = response.data.data.admins
        })
    })

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      admins,
      roles,
      changePage,
      search,
      userId,
      name,
      email,
      phone_number,
      userRole,
      userCountries,
      activeCountries,
      updateSelected,
      storeUser,
      updateUser,
      editUser,
      editUserModal,
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
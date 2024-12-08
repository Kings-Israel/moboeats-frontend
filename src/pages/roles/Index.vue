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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">System Roles ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button class="bg-[#1c2e2a] hover:bg-[#6a6d2b] p-2 text-white font-semibold rounded-full px-3" @click="addRoleModal = true">Add Role</button>
              <modal-action :id="'addSupplier'" :modal-open="addRoleModal" @close-modal="addRoleModal = false" :add-class="'max-w-6xl'">
                <p class="text-xl font-bold text-slate-700 dark:text-white">Add Role</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="storeRole">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Name</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="roleName" required />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Description</label>
                      <textarea id="description" class="form-input w-full rounded-lg" type="text" v-model="roleDescription" placeholder=""></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="permissions">
                        Permissions
                      </label>
                      <div class="flex flex-col gap-2">
                        <div v-for="group in permissions" :key="group.id">
                          <p v-if="group.permissions.length > 0" class="font-bold text-xl py-1 m_title">{{ group.name }}</p>
                          <div class="grid grid-cols-3 gap-2">
                            <div v-for="permission in group.permissions" :key="permission.id" class="flex gap-1">
                              <input type="checkbox" name="" id="" v-model="rolePermissions[permission.id]" class="border-primary rounded-md p-2 my-auto">
                              <label for="" class="text-primary font-semibold">{{ permission.display_name }}</label>
                            </div>
                          </div>
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

          <div class="justify-between gap-2 mb-2 hidden">
            <form class="relative flex gap-2 w-full">
              <div>
                <label for="action-search" class="mb-1">Search</label>
                <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full mt-1" type="search" v-model="rolesSearch" placeholder="Search Roles" />
                <button class="absolute inset-0 top-6 right-auto group" type="submit" aria-label="Search">
                  <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                  </svg>
                </button>
              </div>
            </form>
            <button class="bg-red-500 text-white rounded-full h-fit w-[10%] py-1 my-auto" @click="search = ''">Clear Fields</button>
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
                        <div class="font-semibold text-left">Description</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Permissions</div>
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
                    <tr v-for="role in roles.data" :key="role.id" class='bg-slate-100 transition duration-200 ease-in-out'>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold ml-1">{{ role.name }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ role.description }}</div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semobold'>{{ role.permissions.length }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ moment(role.created_at).format('Do MMM Y') }}</div>
                      </td>
                      <td>
                        <a href="#" class="bg-[#6a6d2b] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md" @click="editRole(role)">Edit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Edit Role -->
          <modal-action :id="'addSupplier'" :modal-open="editRoleModal" @close-modal="editRoleModal = false" :add-class="'max-w-6xl'">
            <p class="text-xl font-bold text-slate-700 dark:text-white">Edit Role</p>
            <!-- Add/Edit Menu -->
            <form class="flex flex-col justify-around" @submit.prevent="updateRole">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Name</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="roleName" required />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Description</label>
                  <textarea id="description" class="form-input w-full rounded-lg" type="text" v-model="roleDescription" placeholder=""></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="permissions">
                    Permissions
                  </label>
                  <div class="flex flex-col gap-2">
                    <div v-for="group in permissions" :key="group.id">
                      <p class="font-bold text-xl py-1 m_title">{{ group.name }}</p>
                      <div class="grid grid-cols-3 gap-2">
                        <div v-for="permission in group.permissions" :key="permission.id" class="flex gap-1">
                          <input type="checkbox" name="" id="" @change="updateSelected(permission.id)" class="border-primary rounded-md p-2 my-auto" :checked="rolePermissions.includes(permission.id)">
                          <label for="" class="text-primary font-semibold">{{ permission.display_name }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end bottom-2 mt-2">
                <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
              </div>
            </form>
          </modal-action>
          <!-- Pagination -->
          <div class="my-4" v-if="roles.data">
            <PaginationClassic @change-page="changePage" :next_page="roles.links.next" :prev_page="roles.links.prev" :from="roles.from" :to="roles.to" :total_items="roles.total" />
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

    const roles = ref([])
    const permissions = ref([])

    const rolesSearch = ref('')

    const roleName = ref('')
    const roleDescription = ref('')
    const rolePermissions = ref([])

    const addRoleModal = ref(false)
    const editRoleModal = ref(false)

    const roleId = ref('')

    const getRoles = () => {
      $http.get(`/admin/roles`, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          roles.value = response.data.data.roles
          permissions.value = response.data.data.permissions
        })
        .catch(error => {
          console.log(error)
        })
    }

    const storeRole = () => {
      const formData = new FormData
      formData.append('name', roleName.value)
      formData.append('description', roleDescription.value)
      let count = 0
      rolePermissions.value.forEach((permission, key) => {
        formData.append('permissions['+count+']', key)
        count += 1
      });
      $http.post('/admin/roles', formData)
      .then(() => {
        getRoles()
        roleName.value = ''
        roleDescription.value = ''
        rolePermissions.value = []
        roleId.value = ''
        addRoleModal.value = false
        toast.success('Role added successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while adding the role')
      })
    }

    const editRole = (role) => {
      roleId.value = role.id
      roleName.value = role.name
      roleDescription.value = role.description
      role.permissions.forEach(permission => {
        rolePermissions.value.push(permission.id)
      })
      editRoleModal.value = true
    }

    const updateRole = () => {
      const formData = new FormData
      formData.append('role_id', roleId.value)
      formData.append('name', roleName.value)
      formData.append('description', roleDescription.value)
      rolePermissions.value.forEach((permission, key) => {
        formData.append('permissions['+key+']', permission)
      });
      $http.post('/admin/roles/update', formData)
      .then(() => {
        getRoles()
        roleId.value = ''
        roleName.value = ''
        roleDescription.value = ''
        rolePermissions.value = []
        roleId.value = ''
        editRoleModal.value = false
        toast.success('Role added successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while adding the role')
      })
    }

    const updateSelected = (id) => {
      if (rolePermissions.value.includes(id)) {
        const index = rolePermissions.value.indexOf(id)
        rolePermissions.value.splice(index, 1)
      } else {
        rolePermissions.value.push(id)
      }
    }

    onMounted(() => {
      getRoles()
    })

    watch([rolesSearch], async ([newSearch]) => {
      $http.get('/admin/supplements', {
        params: {
          per_page: per_page.value,
          search: newSearch,
        }
      })
        .then(response => {
          roles.value = response.data.data.roles
        })
    })

    function changePage(page) {
      $http.get(page, {
        params: {
          per_page: per_page.value,
          search: rolesSearch.value,
        }
      })
        .then(response => {
          roles.value = response.data.data.roles
        })
    }

    return {
      moment,
      sidebarOpen,
      per_page,
      roles,
      permissions,
      rolesSearch,
      roleId,
      roleName,
      roleDescription,
      rolePermissions,
      addRoleModal,
      editRoleModal,
      editRole,
      storeRole,
      updateRole,
      changePage,
      updateSelected,
    }
  }
}
</script>
<style scoped>
.m_title::first-letter {
  text-transform: uppercase;
}
</style>
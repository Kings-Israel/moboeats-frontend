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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Countries Management ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button v-if="hasPermission('create countries')" class="bg-[#1c2e2a] hover:bg-[#6a6d2b] p-2 text-white font-semibold rounded-full px-3" @click="addRoleModal = true">Add Country</button>
              <modal-action v-if="hasPermission('create countries')" :id="'addSupplier'" :modal-open="addRoleModal" @close-modal="addRoleModal = false" :add-class="'max-w-6xl'">
                <p class="text-xl font-bold text-slate-700 dark:text-white">Add Country</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="storeRole">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Name</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryName" required />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">ISO 2</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryIso2" required />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">ISO 3</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryIso3" required />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Numeric Code</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryNumericCode" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Phone Code</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryPhoneCode" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Latitude</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryLatitude" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Longitude</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryLongitude" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Region</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryRegion" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Sub Region</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countrySubregion" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Area in KM2</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryArea" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Population</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryPopulation" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Status</label>
                      <select class="form-input w-full rounded-lg" v-model="countryStatus" required>
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
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
                        <div class="font-semibold text-left">ISO 2</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">ISO 3</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Phone Code</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Numeric Code</div>
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
                        <div class="text-sky-700 font-semibold">{{ role.iso2 }}</div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semobold'>{{ role.iso3 }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ role.phone_code }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ role.numeric_code }}</div>
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
            <p class="text-xl font-bold text-slate-700 dark:text-white">Edit Country</p>
            <!-- Add/Edit Menu -->
            <form class="flex flex-col justify-around" @submit.prevent="updateRole">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Name</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryName" required />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">ISO 2</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryIso2" required />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">ISO 3</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryIso3" required />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Numeric Code</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryNumericCode" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Phone Code</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryPhoneCode" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Latitude</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryLatitude" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Longitude</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryLongitude" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Region</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryRegion" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Sub Region</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countrySubregion" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Area in KM2</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryArea" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Population</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="countryPopulation" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Status</label>
                  <select class="form-input w-full rounded-lg" v-model="countryStatus" required>
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-end bottom-2 mt-2">
                <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
              </div>
            </form>
          </modal-action>
          <!-- Pagination -->
          <div class="my-4" v-if="roles.data">
            <PaginationClassic @change-page="changePage" :next_page="roles.links.next" :prev_page="roles.links.prev" :from="roles.meta.from" :to="roles.meta.to" :total_items="roles.meta.total" />
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
import { formatValue, hasPermission } from '../../utils/Utils'
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

    const rolePermissions = ref([])

    const countryName = ref('')
    const countryIso2 = ref('')
    const countryIso3 = ref('')
    const countryNumericCode = ref('')
    const countryPhoneCode = ref('')
    const countryRegion = ref('')
    const countrySubregion = ref('')
    const countryLatitude = ref('')
    const countryLongitude = ref('')
    const countryPopulation = ref('')
    const countryArea = ref('')
    const countryStatus = ref('')

    const addRoleModal = ref(false)
    const editRoleModal = ref(false)

    const countryId = ref('')

    const getRoles = () => {
      $http.get(`/admin/countries`, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          roles.value = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    const storeRole = () => {
      const formData = new FormData
      formData.append('name', countryName.value)
      formData.append('iso2', countryIso2.value)
      formData.append('iso3', countryIso3.value)
      formData.append('numeric_code', countryNumericCode.value)
      formData.append('phone_code', countryPhoneCode.value)
      formData.append('region', countryRegion.value)
      formData.append('subregion', countrySubregion.value)
      formData.append('latitude', countryLatitude.value)
      formData.append('longitude', countryLongitude.value)
      formData.append('population', countryPopulation.value)
      formData.append('area_km2', countryArea.value)
      formData.append('status', countryStatus.value)

      $http.post('/admin/countries', formData)
      .then(() => {
        getRoles()
        countryName.value = ''
        countryIso2.value = ''
        countryIso3.value = ''
        countryNumericCode.value = ''
        countryPhoneCode.value = ''
        countryRegion.value = ''
        countrySubregion.value = ''
        countryLatitude.value = ''
        countryLongitude.value = ''
        countryPopulation.value = ''
        countryArea.value = ''
        countryStatus.value = ''
        addRoleModal.value = false
        toast.success('Country added successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while adding the country')
      })
    }

    const editRole = (country) => {
      countryId.value = country.id
      countryName.value = country.name
      countryIso2.value = country.iso2
      countryIso3.value = country.iso3
      countryNumericCode.value = country.numeric_code
      countryPhoneCode.value = country.phone_code
      countryRegion.value = country.region
      countrySubregion.value = country.subregion
      countryLatitude.value = country.latitude
      countryLongitude.value = country.longitude
      countryPopulation.value = country.population
      countryArea.value = country.area_km2
      countryStatus.value = country.status
      editRoleModal.value = true
    }

    const updateRole = () => {
      const formData = new FormData
      formData.append('name', countryName.value)
      formData.append('iso2', countryIso2.value)
      formData.append('iso3', countryIso3.value)
      formData.append('numeric_code', countryNumericCode.value)
      formData.append('phone_code', countryPhoneCode.value)
      formData.append('region', countryRegion.value)
      formData.append('subregion', countrySubregion.value)
      formData.append('latitude', countryLatitude.value)
      formData.append('longitude', countryLongitude.value)
      formData.append('population', countryPopulation.value)
      formData.append('area_km2', countryArea.value)
      formData.append('status', countryStatus.value)
      $http.post('/admin/countries/'+countryId.value+'/update', formData)
      .then(() => {
        getRoles()
        countryName.value = ''
        countryIso2.value = ''
        countryIso3.value = ''
        countryNumericCode.value = ''
        countryPhoneCode.value = ''
        countryRegion.value = ''
        countrySubregion.value = ''
        countryLatitude.value = ''
        countryLatitude.value = ''
        countryPopulation.value = ''
        countryArea.value = ''
        countryStatus.value = ''
        countryId.value = ''
        editRoleModal.value = false
        toast.success('Country added successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while adding the country')
      })
    }

    onMounted(() => {
      getRoles()
    })

    function changePage(page) {
      $http.get(page, {
        params: {
          per_page: per_page.value,
        }
      })
        .then(response => {
          roles.value = response.data.data
        })
    }

    return {
      moment,
      sidebarOpen,
      per_page,
      roles,
      permissions,
      rolesSearch,
      countryName,
      countryIso2,
      countryIso3,
      countryNumericCode,
      countryPhoneCode,
      countryRegion,
      countrySubregion,
      countryLatitude,
      countryLongitude,
      countryPopulation,
      countryArea,
      countryStatus,
      countryId,
      addRoleModal,
      editRoleModal,
      editRole,
      storeRole,
      updateRole,
      changePage,
      hasPermission,
    }
  }
}
</script>
<style scoped>
.m_title::first-letter {
  text-transform: uppercase;
}
</style>
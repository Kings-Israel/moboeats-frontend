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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Motorbikes Management ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button class="bg-[#1c2e2a] hover:bg-[#6a6d2b] p-2 text-white font-semibold rounded-full px-3" @click="addMotorbikeModal = true">Add Motorbike</button>
              <modal-action :id="'addSupplier'" :modal-open="addMotorbikeModal" @close-modal="addMotorbikeModal = false" :add-class="'max-w-2xl'">
                <p class="text-xl font-bold text-slate-700 dark:text-white">Add Motorbike</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="storeMotorbike">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Make</label>
                      <input id="make" class="form-input w-full rounded-lg" type="text" v-model="make" required />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Model</label>
                      <input id="model" class="form-input w-full rounded-lg" type="text" v-model="model" required />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Registration Number</label>
                      <input id="registration_number" class="form-input w-full rounded-lg" type="text" v-model="registrationNumber" required />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Insurer</label>
                      <input id="insurer" class="form-input w-full rounded-lg" type="text" v-model="insurer" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Insurance Number</label>
                      <input id="insurance_number" class="form-input w-full rounded-lg" type="text" v-model="insuranceNumber" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Next Service Date</label>
                      <input id="next_service_date" class="form-input w-full rounded-lg" type="date" v-model="nextServiceDate" required />
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
                <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full mt-1" type="search" v-model="motorbikesSearch" placeholder="Search Roles" />
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
                        <div class="font-semibold text-left">Make</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Model</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Registration Number</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Current Rider</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Assigned Branches</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Added On</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm font-medium bg-slate-50 divide-y divide-slate-100 dark:divide-slate-700">
                    <!-- Row -->
                    <tr v-for="motorbike in motorbikes.data" :key="motorbike.id" class='bg-slate-100 transition duration-200 ease-in-out'>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold ml-1">{{ motorbike.make }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ motorbike.model }}</div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semibold'>{{ motorbike.registration_number }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ motorbike.current_rider ? motorbike.current_rider.name : 'N/A' }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ motorbike.restaurants.length }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ moment(motorbike.created_at).format('Do MMM Y') }}</div>
                      </td>
                      <td>
                        <a href="#" class="bg-[#6a6d2b] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md" @click="editMotorbike(motorbike)">Edit</a>
                        <a v-if="!motorbike.current_rider" href="#" class="bg-[#393c02] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md ml-2" @click="assignMotorbikeToRider(motorbike)">Assign to Rider</a>
                        <a v-if="motorbike.current_rider" href="#" class="bg-[#393c02] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md ml-2" @click="assignMotorbikeToRider(motorbike)">Reassign Rider</a>
                        <a href="#" class="bg-[#393c02] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md ml-2" @click="assignMotorbikeToRestaurant(motorbike)">Assign to Branch</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Assign Motorbike to Rider -->
          <modal-action :id="'assignToRider'" :modal-open="assignToRiderModal" @close-modal="assignToRiderModal = false" :add-class="'max-w-xl'">
            <p class="text-xl font-bold text-slate-700 dark:text-white">Assign Motorbike to Rider</p>
            <form class="flex flex-col justify-around" @submit.prevent="assignToRider">
              <div class="space-y-4">
                <!-- Motorbike Details -->
                <div class="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
                  <div class="text-slate-700 dark:text-white font-semibold">{{ selectedMotorbike ? selectedMotorbike.make + ' - ' + selectedMotorbike.model : '' }}</div>
                  {{ selectedMotorbike ? 'Registration Number: ' + selectedMotorbike.registration_number : '' }}
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="rider">Select Rider</label>
                  <select id="rider" class="form-input w-full rounded-lg" v-model="selectedRider" required>
                    <option value="">Select a rider</option>
                    <option v-for="rider in riders" :key="rider.id" :value="rider.id" :selected="selectedMotorbike?.user_id === rider.id">{{ rider.name }}</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-end bottom-2 mt-2">
                <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
              </div>
            </form>
          </modal-action>
          
          <!-- Assign Motorbike to Restaurant -->
          <modal-action :id="'assignToRestaurant'" :modal-open="assignToRestaurantModal" @close-modal="assignToRestaurantModal = false" :add-class="'max-w-xl'">
            <p class="text-xl font-bold text-slate-700 dark:text-white">Assign Motorbike to Branch</p>
            <form class="flex flex-col justify-around" @submit.prevent="assignToRestaurant">
              <div class="space-y-4">
                <!-- Motorbike Details -->
                <div class="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
                  <div class="text-slate-700 dark:text-white font-semibold">{{ selectedMotorbike ? selectedMotorbike.make + ' - ' + selectedMotorbike.model : '' }}</div>
                  {{ selectedMotorbike ? 'Registration Number: ' + selectedMotorbike.registration_number : '' }}
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="restaurant">Select Branch</label>
                  <select id="restaurant" class="form-input w-full rounded-lg" v-model="selectedRestaurant" required>
                    <option value="">Select a branch</option>
                    <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.id">{{ restaurant.name }}</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-end bottom-2 mt-2">
                <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
              </div>
            </form>
          </modal-action>

          <!-- Edit Motorbike -->
          <modal-action :id="'editMotorbike'" :modal-open="editMotorbikeModal" @close-modal="editMotorbikeModal = false" :add-class="'max-w-6xl'">
            <p class="text-xl font-bold text-slate-700 dark:text-white">Edit Motorbike</p>
            <!-- Add/Edit Menu -->
            <form class="flex flex-col justify-around" @submit.prevent="updateMotorbike">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Make</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="make" required />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Model</label>
                  <input id="model" class="form-input w-full rounded-lg" type="text" v-model="model" required />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Registration Number</label>
                  <input id="registration_number" class="form-input w-full rounded-lg" type="text" v-model="registrationNumber" required />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Insurer</label>
                  <input id="insurer" class="form-input w-full rounded-lg" type="text" v-model="insurer" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="price">Insurance Number</label>
                  <input id="insurance_number" class="form-input w-full rounded-lg" type="text" v-model="insuranceNumber" />
                </div>
              </div>
              <div class="flex justify-end bottom-2 mt-2">
                <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
              </div>
            </form>
          </modal-action>
          <!-- Pagination -->
          <div class="my-4" v-if="motorbikes.data">
            <PaginationClassic @change-page="changePage" :next_page="motorbikes.links.next" :prev_page="motorbikes.links.prev" :from="motorbikes.from" :to="motorbikes.to" :total_items="motorbikes.total" />
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
  name: 'Motorbikes',
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

    const motorbikes = ref([])
    const permissions = ref([])

    const motorbikesSearch = ref('')

    const make = ref('')
    const model = ref('')
    const registrationNumber = ref('')
    const insurer = ref('')
    const insuranceNumber = ref('')
    const nextServiceDate = ref('')

    const addMotorbikeModal = ref(false)
    const editMotorbikeModal = ref(false)
    const assignToRiderModal = ref(false)
    const selectedRider = ref(null)
    const assignToRestaurantModal = ref(false)
    const selectedRestaurant = ref(null)

    const motorbikeId = ref('')

    const selectedMotorbike = ref(null)

    const riders = ref([])
    const restaurants = ref([])

    const getMotorbikes = () => {
      $http.get(`/admin/motorbikes`, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          motorbikes.value = response.data.motorbikes
          riders.value = response.data.riders
          restaurants.value = response.data.restaurants
        })
        .catch(error => {
          console.log(error)
        })
    }

    const storeMotorbike = () => {
      const formData = new FormData
      formData.append('make', make.value)
      formData.append('model', model.value)
      formData.append('registration_number', registrationNumber.value)
      formData.append('insurer', insurer.value)
      formData.append('insurance_number', insuranceNumber.value)
      $http.post('/admin/motorbikes', formData)
        .then(() => {
          getMotorbikes()
          make.value = ''
          model.value = ''
          registrationNumber.value = ''
          insurer.value = ''
          insuranceNumber.value = ''
        })
        .catch(error => {
          console.log(error)
        })
    }

    const editMotorbike = (motorbike) => {
      motorbikeId.value = motorbike.id
      make.value = motorbike.make
      model.value = motorbike.model
      registrationNumber.value = motorbike.registration_number
      insurer.value = motorbike.insurer
      insuranceNumber.value = motorbike.insurance_number
      nextServiceDate.value = motorbike.next_service_date

      editMotorbikeModal.value = true
    }

    const updateMotorbike = () => {
      const formData = new FormData
      formData.append('motorbike_id', motorbikeId.value)
      formData.append('make', make.value)
      formData.append('model', model.value)
      formData.append('registration_number', registrationNumber.value)
      formData.append('insurer', insurer.value)
      formData.append('insurance_number', insuranceNumber.value)
      formData.append('next_service_date', nextServiceDate.value)

      $http.patch('/admin/motorbikes/' + motorbikeId.value, formData)
      .then(() => {
        getMotorbikes()
        motorbikeId.value = ''
        make.value = ''
        model.value = ''
        registrationNumber.value = ''
        insurer.value = ''
        insuranceNumber.value = ''
        nextServiceDate.value = ''
        editMotorbikeModal.value = false
        toast.success('Motorbike updated successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while updating the motorbike')
      })
    }

    const assignMotorbikeToRider = (motorbike) => {
      selectedMotorbike.value = motorbike
      motorbikeId.value = motorbike.id
      assignToRiderModal.value = true
    }

    const assignToRider = () => {
      const formData = new FormData
      formData.append('rider_id', selectedRider.value)

      $http.post('/admin/motorbikes/' + motorbikeId.value + '/assign-to-rider', formData)
        .then(() => {
          getMotorbikes()
          motorbikeId.value = ''
          selectedRider.value = null
          assignToRiderModal.value = false
          toast.success('Motorbike assigned to rider successfully')
        })
        .catch(err => {
          console.log(err.response);
          // toast.error('An error occurred while assigning the motorbike to the rider')
          toast.error(err.response.data.message || 'An error occurred while assigning the motorbike to the rider')
        })
    }

    const assignMotorbikeToRestaurant = (motorbike) => {
      selectedMotorbike.value = motorbike
      motorbikeId.value = motorbike.id
      assignToRestaurantModal.value = true
    }

    const assignToRestaurant = () => {
      const formData = new FormData
      formData.append('restaurant_id', selectedRestaurant.value)

      $http.post('/admin/motorbikes/' + motorbikeId.value + '/assign-to-restaurant', formData)
        .then(() => {
          getMotorbikes()
          motorbikeId.value = ''
          selectedRestaurant.value = null
          assignToRestaurantModal.value = false
          toast.success('Motorbike assigned to restaurant successfully')
        })
        .catch(err => {
          toast.error(err.response.data.message || 'An error occurred while assigning the motorbike to the restaurant')
        })
    }

    onMounted(() => {
      getMotorbikes()
    })

    watch([motorbikesSearch], async ([newSearch]) => {
      $http.get('/admin/motorbikes', {
        params: {
          per_page: per_page.value,
          search: newSearch,
        }
      })
        .then(response => {
          motorbikes.value = response.data.motorbikes
        })
    })

    function changePage(page) {
      $http.get(page, {
        params: {
          per_page: per_page.value,
          search: motorbikesSearch.value,
        }
      })
        .then(response => {
          motorbikes.value = response.data.motorbikes
        })
    }

    return {
      moment,
      sidebarOpen,
      per_page,
      motorbikes,
      permissions,
      motorbikesSearch,
      motorbikeId,
      make,
      model,
      registrationNumber,
      insurer,
      insuranceNumber,
      nextServiceDate,
      addMotorbikeModal,
      editMotorbikeModal,
      editMotorbike,
      storeMotorbike,
      updateMotorbike,
      changePage,
      riders,
      assignToRiderModal,
      selectedRider,
      assignMotorbikeToRider,
      assignToRider,
      selectedMotorbike,
      assignToRestaurantModal,
      assignMotorbikeToRestaurant,
      restaurants,
      selectedRestaurant,
      assignToRestaurant,
    }
  }
}
</script>
<style scoped>
.m_title::first-letter {
  text-transform: uppercase;
}
</style>
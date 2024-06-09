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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Supplements ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button class="bg-[#1c2e2a] hover:bg-[#6a6d2b] p-2 text-white font-semibold rounded-full px-3" @click="addSupplementModal = true">Add Supplement</button>
              <modal-action :id="'addSupplier'" :modal-open="addSupplementModal" @close-modal="addSupplementModal = false" :add-class="'max-w-4xl'">
                <p class="text-xl font-bold text-white">Add Supplement</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="storeSupplement">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="categories">
                        Supplier
                      </label>
                      <select name="supplier" v-model="supplierId" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select Supplier</option>
                        <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Name</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="supplementName" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1" for="price">Category</label>
                        <select name="supplier" v-model="supplementCategory" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="">Select Category</option>
                          <option value="adult">Adult</option>
                          <option value="child">Child</option>
                          <option value="fitness">Fitness</option>
                          <option value="pregnancy">Pregnancy</option>
                        </select>
                      </div>
                    <div class="grid grid-cols-2 gap-2">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Price Per Quantity</label>
                        <input id="price" class="form-input w-full rounded-lg" type="number" min="1" v-model="supplementPrice" required />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Measurement Unit</label>
                        <select name="supplier" v-model="supplementMeasuringUnit" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="">Select Measurement Unit</option>
                          <option value="kilograms">Kilograms</option>
                          <option value="pounds">Pounds</option>
                          <option value="litres">Litres</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Description</label>
                      <textarea id="description" class="form-input w-full rounded-lg" type="text" v-model="supplementDescription" placeholder=""></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Prescription</label>
                      <textarea id="description" class="form-input w-full rounded-lg" type="text" v-model="supplementPrescription" placeholder=""></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Supplement Images</label>
                      <label for="dropzone-file" class="flex w-full h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex">
                          <p v-if="supplementImages.length == 0" class="mb-2 text-sm px-6 my-5 text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span> or drag and drop(Max 3 Files)
                          </p>
                          <div v-else class="flex flex-col flex-wrap">
                            <p v-for="image in supplementImages" :key="image" class="text-sm ml-2 whitespace-pre-wrap text-gray-500 dark:text-gray-400"><span class="font-semibold">{{ image.name }}</span></p>
                          </div>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" multiple accept=".jpg,.png" v-on:change="selectImages" />
                      </label>
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
            <form class="relative flex gap-2 w-full">
              <div>
                <label for="action-search" class="mb-1">Search</label>
                <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full mt-1" type="search" v-model="supplementSearch" placeholder="Search Supplements" />
                <button class="absolute inset-0 top-6 right-auto group" type="submit" aria-label="Search">
                  <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                  </svg>
                </button>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="categories">
                  Supplier
                </label>
                <select name="supplier" v-model="supplierSearch" class="rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Select Supplier</option>
                  <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
                </select>
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
                        <div class="font-semibold text-left">Price</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Orders</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Supplier</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Status</div>
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
                    <tr v-for="supplement in supplements.data" :key="supplement.id" class='bg-slate-100 transition duration-200 ease-in-out'>
                      <td class="p-2">
                        <div class="flex items-center">
                          <ul class="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
                            <li v-for="image in supplement.images" :key="image.id">
                              <img class="w-9 h-9 rounded-full object-cover border border-emerald-300" :src="image.image" alt="menu" />
                            </li>
                          </ul>
                          <div class="text-sky-700 font-semibold ml-1">{{ supplement.name }}</div>
                        </div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semobold'>{{ supplement.currency }} {{ supplement.price }}/{{ supplement.measuring_unit }}</div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semobold'>{{ supplement.orders_count }}</div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semobold'>{{ supplement.supplier.name }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-green-700 font-semobold" v-if="supplement.is_available">In Stock</div>
                        <div class="text-red-700 font-semobold" v-if="!supplement.is_available">Out of Stock</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ moment(supplement.created_at).format('Do MMM Y') }}</div>
                      </td>
                      <td>
                        <!-- <a href="#" class="bg-[#6a6d2b] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md">View</a> -->
                        <a v-if="supplement.is_available" href="#" @click="updateStatus(supplement.id)" class="bg-[#3d1919] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md mx-1">Out of Stock</a>
                        <a v-else href="#" @click="updateStatus(supplement.id)" class="bg-[#1b3715] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md mx-1">In Stock</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Pagination -->
          <div class="my-4" v-if="supplements.data">
            <PaginationClassic @change-page="changePage" :next_page="supplements.links.next" :prev_page="supplements.links.prev" :from="supplements.meta.from" :to="supplements.meta.to" :total_items="supplements.meta.total" />
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

    const supplements = ref([])

    const suppliers = ref([])

    const supplementSearch = ref('')
    const supplierSearch = ref('')
    const statusSearch = ref('')

    const supplementName = ref('')
    const supplementDescription = ref('')
    const supplementPrescription = ref('')
    const supplementCategory = ref('')
    const supplierId = ref('')
    const supplementPrice = ref(0)
    const supplementMeasuringUnit = ref('')
    const supplementImages = ref([])

    const addSupplementModal = ref(false)

    const getSupplements = () => {
      $http.get(`/admin/supplements`, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          supplements.value = response.data.data.supplements
          suppliers.value = response.data.data.suppliers
        })
        .catch(error => {
          console.log(error)
        })
    }

    const storeSupplement = () => {
      const formData = new FormData
      formData.append('name', supplementName.value)
      formData.append('category', supplementCategory.value)
      formData.append('description', supplementDescription.value)
      formData.append('prescription', supplementPrescription.value)
      formData.append('supplier_id', supplierId.value)
      formData.append('price', supplementPrice.value)
      formData.append('measuring_unit', supplementMeasuringUnit.value)
      supplementImages.value.forEach((image, key) => {
        formData.append('images['+key+']', image)
      });
      $http.post('/admin/supplements/store', formData)
      .then(() => {
        getSupplements()
        supplementName.value = ''
        supplementCategory.value = ''
        supplementDescription.value = ''
        supplementPrescription.value = ''
        supplierId.value = ''
        addSupplementModal.value = false
        toast.success('Supplement added successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while adding the supplement')
      })
    }

    const updateStatus = supplement => {
      $http.get(`/admin/supplements/${supplement}/status/update`)
      .then(() => {
        getSupplements()
        toast.success('Supplement updated successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while updating the supplement')
      })
    }

    const selectImages = (e) => {
      for (let index = 0; index < 3; index++) {
        if (e.target.files[index]) {
          supplementImages.value.push(e.target.files[index])
        }
      }
    }

    const exportSupplements = () => {
      $http.get('/admin/supplements/export?search='+supplementSearch.value,
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
            `Supplements.xlsx`,
          )
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(err => {
          console.log(err)
        })
    }

    onMounted(() => {
      getSupplements()
    })

    watch([supplementSearch, supplierSearch, statusSearch], async ([newSearch, supplierSearch, statusSearch], [oldSearch, oldSupplierSearch, oldStatusSearch]) => {
      $http.get('/admin/supplements', {
        params: {
          per_page: per_page.value,
          search: newSearch,
          supplier: supplierSearch,
        }
      })
        .then(response => {
          supplements.value = response.data.data.supplements
        })
    })

    function changePage(page) {
      $http.get(page, {
        params: {
          per_page: per_page.value,
          search: supplementSearch.value,
          supplier: supplierSearch.value,
        }
      })
        .then(response => {
          supplements.value = response.data.data.supplements
        })
    }

    return {
      moment,
      sidebarOpen,
      per_page,
      supplements,
      suppliers,
      supplementSearch,
      supplierSearch,
      statusSearch,
      supplierId,
      supplementName,
      supplementCategory,
      supplementDescription,
      supplementPrescription,
      supplementPrice,
      supplementMeasuringUnit,
      supplementImages,
      addSupplementModal,
      storeSupplement,
      selectImages,
      updateStatus,
      changePage,
      exportSupplements,
    }
  }
}
</script>
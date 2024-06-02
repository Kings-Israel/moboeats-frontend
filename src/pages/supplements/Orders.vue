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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Supplement Orders ✨</h1>
            </div>
          </div>

          <div class="flex justify-between gap-2 mb-2">
            <form class="relative w-[40%]">
              <label for="action-search" class="">Search</label>
              <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full" type="search" v-model="ordersSearch" placeholder="Search orders" />
              <button class="absolute inset-0 top-6 right-auto group" type="submit" aria-label="Search">
                <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
            <button class="bg-red-500 text-white rounded-full h-fit w-[30%] py-1 my-auto" @click="ordersSearch = ''">Clear Fields</button>
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
                        <div class="font-semibold text-left">User</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Price</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Quantity</div>
                      </th>
                      <th class="p-2">
                        <div class="font-semibold text-left">Amount</div>
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
                    <tr v-for="order in orders.data" :key="order.id" class='bg-slate-100 transition duration-200 ease-in-out'>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ order.user.name }}</div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semobold'>{{ order.supplement.currency }} {{ order.supplement.price }}/{{ order.supplement.measuring_unit }}</div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semobold'>{{ order.quantity }}</div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semobold'>{{ order.supplement.currency }} {{ order.amount }}</div>
                      </td>
                      <td class="p-2">
                        <div class='text-green-700 font-semobold'>{{ order.supplement.supplier.name }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-slate-700 font-semobold">{{ order.status }}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-sky-700 font-semibold">{{ moment(order.created_at).format('Do MMM Y') }}</div>
                      </td>
                      <td>
                        <a href="#" class="bg-[#6a6d2b] hover:bg-[#1c2e2a] text-white font-semibold p-1 px-2 rounded-md" @click="editOrder(order)">Update Status</a>
                      </td>
                      <modal-action :id="'edit-'+order.id" :modal-open="updateOrderModal" @close-modal="updateOrderModal = false" :add-class="'max-w-4xl'">
                        <p class="text-xl font-bold text-white">Update Order</p>
                        <!-- Add/Edit Menu -->
                        <form class="flex flex-col justify-around" @submit.prevent="updateOrder">
                          <div class="grid grid-cols-2 gap-2 space-y-4">
                            <div>
                              <label class="block text-sm font-medium mb-1" for="categories">
                                Supplier
                              </label>
                              <div class='text-green-700 font-semobold'>{{ orderSupplier }}</div>
                            </div>
                            <div>
                              <label class="block text-sm font-medium mb-1" for="price">Name</label>
                              <div class="text-sky-700 font-semibold">{{ orderUser.name }}</div>
                            </div>
                            <div>
                              <label class="block text-sm font-medium mb-1" for="price">Price</label>
                              <div class='text-green-700 font-semobold'>{{ orderPrice }}</div>
                            </div>
                            <div>
                              <label class="block text-sm font-medium mb-1" for="price">Total Amount</label>
                              <div class='text-green-700 font-semobold'>{{ orderAmount }}</div>
                            </div>
                            <div class="col-span-2">
                              <label class="block text-sm font-medium mb-1" for="price">Update Order Status</label>
                              <select name="supplier" v-model="orderStatus" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Select Status</option>
                                <option value="on delivery">On Delivery</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </div>
                            <div class="col-span-2" v-show="orderStatus == 'on delivery' || orderStatus == 'paid' || orderStatus == 'delivered'">
                              <label class="block text-sm font-medium mb-1" for="price">Courier Name</label>
                              <input id="courier-name" class="form-input w-full rounded-lg" type="text" v-model="orderCourierName" />
                            </div>
                            <div class="col-span-2" v-show="orderStatus == 'on delivery' || orderStatus == 'paid' || orderStatus == 'delivered'">
                              <label class="block text-sm font-medium mb-1" for="price">Courier Email</label>
                              <input id="courier-name" class="form-input w-full rounded-lg" type="email" v-model="orderCourierEmail" />
                            </div>
                            <div class="col-span-2" v-show="orderStatus == 'on delivery' || orderStatus == 'paid' || orderStatus == 'delivered'">
                              <label class="block text-sm font-medium mb-1" for="price">Courier Tel</label>
                              <input id="courier-name" class="form-input w-full rounded-lg" type="text" v-model="orderCourierMobile" />
                            </div>
                          </div>
                          <div class="flex justify-end bottom-2 mt-2">
                            <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
                          </div>
                        </form>
                      </modal-action>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Pagination -->
          <div class="my-4" v-if="orders.data">
            <PaginationClassic @change-page="changePage" :next_page="orders.links.next" :prev_page="orders.links.prev" :from="orders.meta.from" :to="orders.meta.to" :total_items="orders.meta.total" />
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

    const orders = ref([])

    const ordersSearch = ref('')

    const orderId = ref('')
    const orderUser = ref('')
    const orderPrice = ref('')
    const orderAmount = ref('')
    const orderQuantity = ref('')
    const orderSupplement = ref('')
    const orderSupplier = ref('')
    const orderCourierName = ref('')
    const orderCourierEmail = ref('')
    const orderCourierMobile = ref('')
    const orderDeliveryDate = ref('')
    const orderStatus = ref('')
    const updateOrderModal = ref(false)

    const getOrders = () => {
      $http.get(`/admin/supplements/orders`, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          orders.value = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    const editOrder = (order) => {
      orderId.value = order.id
      orderUser.value = order.user
      orderQuantity.value = order.quantity
      orderPrice.value = order.supplement.currency+' '+order.supplement.price+'/'+order.supplement.measuring_unit
      orderAmount.value = order.amount
      orderSupplement.value = order.supplement.name
      orderSupplier.value = order.supplement.supplier.name
      orderCourierName.value = order.courier_name
      orderCourierEmail.value = order.courier_email
      orderCourierMobile.value = order.courier_mobile
      orderDeliveryDate.value = order.expected_delivery_date
      updateOrderModal.value = true
    }

    const updateOrder = () => {
      $http.post(`/admin/supplements/order/${orderId.value}/status/update`, {
        courier_name: orderCourierName.value,
        courier_email: orderCourierEmail.value,
        courier_phone: orderCourierMobile.value,
        status: orderStatus.value,
        expected_delivery_date: orderDeliveryDate.value
      })
      .then(() => {
        getOrders()
        orderStatus.value = ''
        orderCourierName.value = ''
        orderCourierEmail.value = ''
        orderCourierMobile.value = ''
        orderDeliveryDate.value = ''
        updateOrderModal.value = false
        toast.success('Order updated successfully')
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while adding the order')
      })
    }

    onMounted(() => {
      getOrders()
    })

    watch(ordersSearch, async (newSearch, oldSearch) => {
      $http.get('/supplements/orders', {
        params: {
          per_page: per_page.value,
          search: newSearch
        }
      })
        .then(response => {
          orders.value = response.data.data
        })
    })

    function changePage(page) {
      $http.get(page, {
        params: {
          per_page: per_page.value
        }
      })
        .then(response => {
          orders.value = response.data.data
        })
    }

    return {
      moment,
      sidebarOpen,
      per_page,
      orders,
      orderId,
      orderUser,
      orderPrice,
      orderAmount,
      orderQuantity,
      orderSupplement,
      orderSupplier,
      orderCourierName,
      orderCourierEmail,
      orderCourierMobile,
      orderStatus,
      orderDeliveryDate,
      orderStatus,
      ordersSearch,
      updateOrderModal,
      editOrder,
      updateOrder,
      changePage,
    }
  }
}
</script>
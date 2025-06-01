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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{{ user.name }} ✨</h1>
            </div>
            <div class="flex gap-2">
              <span v-for="(role, index) in user.roles" :key="role">
                <span v-if="index == user.roles.length - 1" class="uppercase font-semibold">{{ role.name }}</span>
                <span v-else class="uppercase font-semibold">{{ role.name }},</span>
              </span>
            </div>
          </div>  
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-full xl:col-span-4">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Info</h2>
                  <button v-if="user_roles.includes('restaurant') || user_roles.includes('restaurant employee')" class="bg-[#F7C410] hover:bg-[#4f441e] p-1 text-white font-semibold rounded-md px-3 transition duration-150 ease-in-out" @click="editPartnerAdmin = true">Edit User</button>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <h1 class="flex gap-2 font-semibold text-slate-800 dark:text-slate-100"><span>Email:</span><strong>{{ user.email }}</strong></h1>
                  <h1 class="flex gap-2 font-semibold text-slate-800 dark:text-slate-100"><span>Phone Number:</span><strong>{{ user.phone_number }}</strong></h1>
                  <h1 class="flex gap-2 font-semibold text-slate-800 dark:text-slate-100"><span>Registered On:</span><strong>{{ moment(user.created_at).format('Do MMMM Y') }}</strong></h1>
                  <h1 v-if="user_roles.includes('orderer')" class="flex gap-2 font-semibold text-slate-800 dark:text-slate-100"><span>Total Orders:</span><strong>{{ user.orders_count }}</strong></h1>
                  <h1 v-if="user_roles.includes('restaurant')" class="flex gap-2 font-semibold text-slate-800 dark:text-slate-100"><span>Total Branches:</span><strong>{{ user.restaurants_count }}</strong></h1>
                  <h1 v-if="user_roles.includes('restaurant')" class="flex gap-2 font-semibold text-slate-800 dark:text-slate-100"><span>Partner Type:</span><strong>{{ user.type == 'both' ? 'Grocery Shop and Restaurant' : user.type == 'restaurant' ? 'Store' : 'Grocery Shop' }}</strong></h1>
                </div>
                <div v-if="user_roles.includes('restaurant') || user_roles.includes('restaurant employee')">
                  <modal-action :id="'addMenu'" :modal-open="editPartnerAdmin" @close-modal="editPartnerAdmin = false" :add-class="'max-w-4xl'">
                    <h3 class="font-bold text-lg text-slate-800">Edit Restaurant Admin</h3>
                    <form @submit.prevent="updatePartnerAdmin()" class="flex flex-col justify-evenly">
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium mb-1" for="first name">First Name</label>
                          <input id="first_name" class="form-input w-full rounded-lg" type="text" v-model="editEmployeeFirstName" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium mb-1" for="last name">Last Name</label>
                          <input id="last_name" class="form-input w-full rounded-lg" type="text" v-model="editEmployeeLastName" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium mb-1" for="email">Email</label>
                          <input id="email" class="form-input w-full rounded-lg" type="email" v-model="editEmployeeEmail" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium mb-1" for="phone number">Phone Number</label>
                          <input id="phone_number" class="form-input w-full rounded-lg" type="tel" v-model="editEmployeePhoneNumber" />
                        </div>
                        <div>
                          <label for="Image">Avatar</label>
                          <input type="file" name="addAvatar" v-on:change="selectEmployeeAvatar" id="" class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                        </div>
                        <div class="block md:flex mt-4">
                          <label class="my-auto block text-sm font-medium mb-1" for="profile_picture">Change Partner Type to:</label>
                          <div class="flex-none md:flex my-auto">
                            <div class="px-3">
                              <!-- Start -->
                              <label class="flex items-center">
                                <input type="radio" name="menu-active" v-model="editEmployeeType" value="both" class="form-radio" />
                                <span class="text-sm font-bold ml-2">Restaurant and Grocery Shop</span>
                              </label>
                              <!-- End -->
                            </div>
            
                            <div class="px-3">
                              <!-- Start -->
                              <label class="flex items-center">
                                <input type="radio" name="menu-active" v-model="editEmployeeType" value="restaurant" class="form-radio" />
                                <span class="text-sm font-bold ml-2">Restaurant</span>
                              </label>
                              <!-- End -->
                            </div>
            
                            <div class="px-3">
                              <!-- Start -->
                              <label class="flex items-center">
                                <input type="radio" name="menu-active" v-model="editEmployeeType" value="grocery shop" class="form-radio" />
                                <span class="text-sm font-bold ml-2">Grocery Shop</span>
                              </label>
                              <!-- End -->
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-end mt-6">
                        <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Submit</button>
                      </div>
                    </form>
                  </modal-action>
                </div>
              </div>
              <div v-if="user_roles.includes('rider') && rider_profile" class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Rider Profile</h2>
                </header>
                <div class="flex justify-between gap-1">
                  <div class="flex flex-col space-y-2 p-2">
                    <h1 class="flex gap-1 font-semibold text-slate-800 dark:text-slate-100"><span>Vehicle Type:</span><strong>{{ rider_profile.vehicle_type }}</strong></h1>
                    <h1 class="flex gap-1 font-semibold text-slate-800 dark:text-slate-100"><span>License Plate:</span><strong>{{ rider_profile.vehicle_license_plate }}</strong></h1>
                    <h1 class="flex gap-1 font-semibold text-slate-800 dark:text-slate-100"><span>Registered On:</span><strong>{{ moment(rider_profile.created_at).format('Do MMMM Y') }}</strong></h1>
                  </div>
                  <img :src="rider_profile.profile_picture" alt="" class="w-20 h-20 rounded-full object-cover mx-1">
                </div>
                <div class="p-2 flex justify-between">
                  <h1 class="flex gap-1 font-semibold text-slate-800 dark:text-slate-100"><span>Status: </span><strong :class="'p-1 px-2 rounded-md '+resolveRiderStatus(rider_profile.status)">{{ rider_profile.status }}</strong></h1>
                  <div class="flex gap-1">
                    <form @submit.prevent="updateRiderStatus(rider_profile.uuid, 'approved')" v-if="rider_profile.status == 'Pending' || rider_profile.status == 'Denied'">
                      <button class="bg-green-500 text-white rounded-md px-2 py-1" type="submit">Approve</button>
                    </form>
                    <button v-if="rider_profile.status == 'Pending'" class="bg-red-500 text-white rounded-md px-2" @click="updateRiderStatusModal = true">Reject</button>
                    <modal-action v-if="rider_profile.status == 'Pending'" :id="'udpateRiderStatus'" :modal-open="updateRiderStatusModal" @close-modal="updateRiderStatusModal = false" :add-class="'max-w-4xl'">
                      <!-- Add/Edit Menu -->
                      <form class="flex flex-col justify-around" @submit.prevent="updateRiderStatus(rider_profile.uuid, 'denied')">
                        <div>
                          <label class="block text-sm font-medium mb-1" for="title">Rejection Reason</label>
                          <textarea id="" class="form-input w-full min-h-full rounded-lg border-2 border-slate-400" rows="4" v-model="rejection_reason" placeholder="Enter Rejection Reason"></textarea>
                        </div>
                        <div class="flex justify-end bottom-2 ">
                          <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                        </div>
                      </form>
                    </modal-action>
                  </div>
                </div>
                <h1 class="flex gap-1 font-semibold text-slate-800 dark:text-slate-100 p-2" v-if="rider_profile.status == 'Denied'"><span>Rejection Reason: </span><strong>{{ rider_profile.rejection_reason }}</strong></h1>
              </div>
              <div v-if="user_roles.includes('rider') && !rider_profile" class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-red-800 dark:text-red-500 text-center">Rider Profile Not Created</h2>
                </header>
              </div>
            </div>
            <div v-if="user_roles.includes('orderer')" class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Orders</h2>
              </header>
              <div class="p-3">
                <!-- Table -->
                <div class="overflow-x-auto">
                  <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Restaurant</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Order ID</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Status</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Created On</div>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="order in orders" :key="order.id">
                        <td class="p-2">
                          <div class="">
                            <!-- TODO:Add Link to View Order -->
                            <div class="text-slate-800 dark:text-slate-100">{{ order.restaurant.name }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <div class="text-center text-emerald-500">{{ getOrderId(order) }}</div>
                        </td>
                        <td class="p-2">
                          <div :class="'text-center '+resolveOrderStatus(order.status)">{{ order.status }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-center">{{ moment(order.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2 flex justify-center">
                          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <div class="mt-8">
                    <PaginationClassic @change-page="changeOrdersPage" :next_page="nextOrdersPageUrl" :prev_page="prevOrdersPageUrl" :from="ordersFrom" :to="ordersTo" :total_items="ordersTotalItems" />
                    <!-- <PaginationNumeric @change-page="changePage" :next_page="nextOrdersPageUrl" :prev_page="prevOrdersPageUrl" :from="from" :to="to" :total_items="totalItems" :links="ordersPagesLinks" /> -->
                  </div> 
                </div>
              </div>
            </div>
            <div v-if="user_roles.includes('restaurant')" class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Restaurants</h2>
              </header>
              <div class="p-3">
                <!-- Table -->
                <div class="overflow-x-auto">
                  <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Restaurant</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Created On</div>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="restaurant in restaurants" :key="restaurant.id">
                        <td class="p-2">
                          <div class="">
                            <!-- TODO:Add Link to View Restaurant -->
                            <div class="text-slate-800 dark:text-slate-100">{{ restaurant.name }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <div class="text-center">{{ moment(restaurant.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2 flex justify-center">
                          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <div class="mt-8">
                    <PaginationClassic @change-page="changeRestaurantsPage" :next_page="nextRestaurantsPageUrl" :prev_page="prevRestaurantsPageUrl" :from="restaurantsFrom" :to="restaurantsTo" :total_items="restaurantsTotalItems" />
                    <!-- <PaginationNumeric @change-page="changePage" :next_page="nextOrdersPageUrl" :prev_page="prevOrdersPageUrl" :from="from" :to="to" :total_items="totalItems" :links="ordersPagesLinks" /> -->
                  </div> 
                </div>
              </div>
            </div>
            <div v-if="user_roles.includes('rider')" class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Deliveries</h2>
              </header>
              <div class="p-3">
                <!-- Table -->
                <div class="overflow-x-auto">
                  <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Order ID</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Status</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Created On</div>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="delivery in deliveries" :key="delivery.id">
                        <td class="p-2">
                          <div class="">
                            <!-- TODO:Add Link to View Order -->
                            <div class="text-slate-800 dark:text-slate-100 m_upper">{{ getOrderId(delivery) }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <div :class="'text-center '+resolveOrderStatus(delivery.status)">{{ delivery.status }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-center">{{ moment(delivery.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2 flex justify-center">
                          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <div class="mt-8">
                    <PaginationClassic @change-page="changeDeliveriesPage" :next_page="nextDeliveriesPageUrl" :prev_page="prevDeliveriesPageUrl" :from="deliveriesFrom" :to="deliveriesTo" :total_items="deliveriesTotalItems" />
                    <!-- <PaginationNumeric @change-page="changePage" :next_page="nextOrdersPageUrl" :prev_page="prevOrdersPageUrl" :from="from" :to="to" :total_items="totalItems" :links="ordersPagesLinks" /> -->
                  </div> 
                </div>
              </div>
            </div>
            <div v-if="user_roles.includes('rider')" class="col-span-full">
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex flex-col h-full">
                      <div class="grow p-5">
                        <header>
                          <div class="flex justify-center mb-2">
                            <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                              <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                                <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                              </svg>
                            </div>
                          </div>
                          <div class="text-center">
                            <h2 class="text-xl leading-snug justify-center font-semibold">Total Earnings</h2>
                          </div>
                          <div class="flex justify-center items-center">
                            <span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span>
                            <span>{{ formatValue(earnings_data.total_earnings, user.country) }}</span><br>
                            <span class="mx-1">(Deliveries: {{ earnings_data.order_earnings }}, Tips: {{ earnings_data.tip_earnings }})</span>
                          </div>
                        </header>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex flex-col h-full">
                      <div class="grow p-5">
                        <header>
                          <div class="flex justify-center mb-2">
                            <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                              <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                                <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                              </svg>
                            </div>
                          </div>
                          <div class="text-center">
                            <h2 class="text-xl leading-snug justify-center font-semibold">Paid Out Amount</h2>
                          </div>
                          <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(earnings_data.paid_amount, user.country) }}</span></div>
                        </header>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex flex-col h-full">
                      <div class="grow p-5">
                        <header>
                          <div class="flex justify-center mb-2">
                            <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                              <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                                <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                              </svg>
                            </div>
                          </div>
                          <div class="text-center">
                            <h2 class="text-xl leading-snug justify-center font-semibold">Pending Payout Amount</h2>
                          </div>
                          <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(earnings_data.unpaid_amount, user.country) }}</span></div>
                        </header>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div> 
  </div>
</template>

<script>
import { ref, onMounted, inject, } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import CustomersTable from '../../partials/customers/CustomersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import { useRoute } from 'vue-router'
import moment from 'moment';
import ModalAction from '../../components/ModalAction.vue'
import { useToast } from 'vue-toastification'
import { formatValue } from '../../utils/Utils'

export default {
  name: 'User',
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
    const router = useRoute()
    const sidebarOpen = ref(false)

    // Orders Pagination
    const nextOrdersPageUrl = ref('')
    const lastOrdersPageUrl = ref('')
    const prevOrdersPageUrl = ref('')
    const ordersPagesLinks = ref([])
    const ordersFrom = ref(0)
    const ordersTo = ref(0)
    const ordersTotalItems = ref(0)

    // Restaurants Pagination
    const nextRestaurantsPageUrl = ref('')
    const lastRestaurantsPageUrl = ref('')
    const prevRestaurantsPageUrl = ref('')
    const restaurantsPagesLinks = ref([])
    const restaurantsFrom = ref(0)
    const restaurantsTo = ref(0)
    const restaurantsTotalItems = ref(0)

    // Deliveries Pagination
    const nextDeliveriesPageUrl = ref('')
    const lastDeliveriesPageUrl = ref('')
    const prevDeliveriesPageUrl = ref('')
    const deliveriesPagesLinks = ref([])
    const deliveriesFrom = ref(0)
    const deliveriesTo = ref(0)
    const deliveriesTotalItems = ref(0)

    const user = ref({})
    const rider_profile = ref({})
    const orders = ref([])
    const restaurants = ref([])
    const deliveries = ref([])
    const user_roles = ref([])

    const editPartnerAdmin = ref(false)

    const editEmployeeFirstName = ref('')
    const editEmployeeLastName = ref('')
    const editEmployeeEmail = ref('')
    const editEmployeePhoneNumber = ref('')
    const editEmployeeAvatar = ref(null)
    const editEmployeeType = ref('')

    const rejection_reason = ref('')
    const updateRiderStatusModal = ref(false)

    const earnings_data = ref([])

    const getOrderId = (order) => {
      return order.uuid.split('-')[0]
    }

    const resolveOrderStatus = (status) => {
      switch (status) {
        case 'Pending':
          return 'text-gray-500'
          break;
        case 'In Progress':
          return 'text-blue-500'
          break;
        case 'Delivered':
          return 'text-green-500'
          break;
        case 'Awating Pick Up':
          return 'text-emarald-500'
          break;
        case 'On Delivery':
          return 'text-slate-500'
          break;
        case 'Denied':
          return 'text-red-500'
          break;
        default:
          return 'text-gray-500'
          break;
      }
    }

    const resolveRiderStatus = (status) => {
      switch (status) {
        case 'Pending':
          return 'bg-slate-600 text-white'
          break;
        case 'Approved':
          return 'bg-green-600 text-slate-100'
          break;
        case 'Denied':
          return 'text-red-500 text-white'
          break;
        default:
          return 'text-gray-500'
          break;
      }
    }

    const getRider = () => {
        let url = '/admin/users/rider/'+router.params.id+'/details'
        $http.get(url)
          .then(response => {
            user.value = response.data.data.user
            if (user.value) {
              user.value.roles.forEach(role => {
                user_roles.value.push(role.name)
              })
              
              if (user_roles.value.includes('rider')) {
                rider_profile.value = response.data.data.rider_profile
                deliveries.value = response.data.data.deliveries.data
                nextDeliveriesPageUrl.value = response.data.data.deliveries.next_page_url
                lastDeliveriesPageUrl.value = response.data.data.deliveries.last_page_url
                prevDeliveriesPageUrl.value = response.data.data.deliveries.prev_page_url
                deliveriesTotalItems.value = response.data.data.deliveries.total
                deliveriesFrom.value = response.data.data.deliveries.from
                deliveriesTo.value = response.data.data.deliveries.to
                response.data.data.deliveries.links.forEach(link => {
                  deliveriesPagesLinks.value.push(link)
                })
              }
            }
          })
      }

    const updateRiderStatus = (id, status) => {
      $http.post('admin/users/rider/'+id+'/status/update', {
        status: status,
        rejection_reason: rejection_reason.value
      })
      .then(res => {
        getRider()
        updateRiderStatusModal.value = false
        toast.success('Rider Updated successfully');
      })
      .catch(err => {
        console.log(err)
        toast.error('An error occurred');
      })
    }

    function changeRestaurantsPage(page) {
      $http.get(page+'&user=restaurants')
        .then(response => {
          nextRestaurantsPageUrl.value = response.data.data.restaurants.next_page_url
          lastRestaurantsPageUrl.value = response.data.data.restaurants.last_page_url
          prevRestaurantsPageUrl.value = response.data.data.restaurants.prev_page_url
          restaurantsTotalItems.value = response.data.data.restaurants.total
          restaurantsFrom.value = response.data.data.restaurants.from
          restaurantsTo.value = response.data.data.restaurants.to
          restaurants.value = []
          restaurants.value = response.data.data.restaurants.data
        })
    }

    function changeOrdersPage(page) {
      $http.get(page+'&user=orderer')
        .then(response => {
          nextOrdersPageUrl.value = response.data.data.orders.next_page_url
          lastOrdersPageUrl.value = response.data.data.orders.last_page_url
          prevOrdersPageUrl.value = response.data.data.orders.prev_page_url
          ordersTotalItems.value = response.data.data.orders.total
          ordersFrom.value = response.data.data.orders.from
          ordersTo.value = response.data.data.orders.to
          orders.value = []
          orders.value = response.data.data.orders.data
        })
    }

    function changeDeliveriesPage(page) {
      $http.get(page)
        .then(response => {
          nextDeliveriesPageUrl.value = response.data.data.deliveries.next_page_url
          lastDeliveriesPageUrl.value = response.data.data.deliveries.last_page_url
          prevDeliveriesPageUrl.value = response.data.data.deliveries.prev_page_url
          deliveriesTotalItems.value = response.data.data.deliveries.total
          deliveriesFrom.value = response.data.data.deliveries.from
          deliveriesTo.value = response.data.data.deliveries.to
          deliveries.value = []
          deliveries.value = response.data.data.deliveries.data
        })
    }

    onMounted(() => {
      let url = ''
      switch (router.params.type) {
        case 'user':
          url = '/admin/users/customer/'+router.params.id+'/details'
          break;
        case 'restaurant-admin':
          url = '/admin/users/restaurant-admin/'+router.params.id+'/details'
          break;
        case 'rider':
          url = '/admin/users/rider/'+router.params.id+'/details'
          break;
        default:
          url = '/admin/users/customer/'+router.params.id+'/details'
          break;
      }

      $http.get(url)
        .then(response => {
          user.value = response.data.data.user
          if (user.value) {
            editEmployeeFirstName.value = user.value.name.split(' ')[0]
            editEmployeeLastName.value = user.value.name.split(' ')[1]
            editEmployeeEmail.value = user.value.email
            editEmployeePhoneNumber.value = user.value.phone_number
            editEmployeeType.value = user.value.type
            user.value.roles.forEach(role => {
              user_roles.value.push(role.name)
            })
          }

          if (user_roles.value.includes('restaurant')) {
            nextRestaurantsPageUrl.value = response.data.data.restaurants.next_page_url
            lastRestaurantsPageUrl.value = response.data.data.restaurants.last_page_url
            prevRestaurantsPageUrl.value = response.data.data.restaurants.prev_page_url
            restaurantsTotalItems.value = response.data.data.restaurants.total
            restaurantsFrom.value = response.data.data.restaurants.from
            restaurantsTo.value = response.data.data.restaurants.to
            restaurants.value = response.data.data.restaurants.data
            response.data.data.restaurants.links.forEach(link => {
              restaurantsPagesLinks.value.push(link)
            })
          }
          
          if (user_roles.value.includes('orderer')) {
            orders.value = response.data.data.orders.data
            nextOrdersPageUrl.value = response.data.data.orders.next_page_url
            lastOrdersPageUrl.value = response.data.data.orders.last_page_url
            prevOrdersPageUrl.value = response.data.data.orders.prev_page_url
            ordersTotalItems.value = response.data.data.orders.total
            ordersFrom.value = response.data.data.orders.from
            ordersTo.value = response.data.data.orders.to
            response.data.data.orders.links.forEach(link => {
              ordersPagesLinks.value.push(link)
            })
          }

          if (user_roles.value.includes('rider')) {
            rider_profile.value = response.data.data.rider_profile
            deliveries.value = response.data.data.deliveries.data
            nextDeliveriesPageUrl.value = response.data.data.deliveries.next_page_url
            lastDeliveriesPageUrl.value = response.data.data.deliveries.last_page_url
            prevDeliveriesPageUrl.value = response.data.data.deliveries.prev_page_url
            deliveriesTotalItems.value = response.data.data.deliveries.total
            deliveriesFrom.value = response.data.data.deliveries.from
            deliveriesTo.value = response.data.data.deliveries.to
            response.data.data.deliveries.links.forEach(link => {
              deliveriesPagesLinks.value.push(link)
            })
            earnings_data.value = response.data.data.earnings_data
          }
        })
    })

    const selectEmployeeAvatar = (e) => {
      editEmployeeAvatar.value = e.target.files[0]
    }

    const updatePartnerAdmin = () => {
      $http.post('admin/users/update', {
        id: user.value.id,
        first_name: editEmployeeFirstName.value,
        last_name: editEmployeeLastName.value,
        email: editEmployeeEmail.value,
        phone_number: editEmployeePhoneNumber.value,
        avatar: editEmployeeAvatar.value,
        type: editEmployeeType.value
      })
        .then(res => {
          toast.success('User updated successfully')
          editPartnerAdmin.value = false
          $http.get('/admin/users/restaurant-admin/'+router.params.id+'/details')
            .then(response => {
              user.value = response.data.data.user
              if (user.value) {
                editEmployeeFirstName.value = user.value.name.split(' ')[0]
                editEmployeeLastName.value = user.value.name.split(' ')[1]
                editEmployeeEmail.value = user.value.email
                editEmployeePhoneNumber.value = user.value.phone_number
              }
            })
        })
        .catch(err => {
          toast.error('Failed to update the user')
        })
    }

    return {
      moment,
      sidebarOpen,
      user,
      rider_profile,
      user_roles,
      earnings_data,
      rejection_reason,
      updateRiderStatusModal,

      // Orders
      orders,
      nextOrdersPageUrl,
      prevOrdersPageUrl,
      lastOrdersPageUrl,
      ordersTotalItems,
      ordersFrom,
      ordersTo,
      ordersPagesLinks,
      changeOrdersPage,

      // Restaurant Admins
      nextRestaurantsPageUrl,
      lastRestaurantsPageUrl,
      prevRestaurantsPageUrl,
      restaurantsTotalItems,
      restaurantsFrom,
      restaurantsTo,
      restaurantsPagesLinks,
      restaurants,
      changeRestaurantsPage,

      editPartnerAdmin,

      editEmployeeFirstName,
      editEmployeeLastName,
      editEmployeeEmail,
      editEmployeePhoneNumber,
      editEmployeeAvatar,
      editEmployeeType,

      selectEmployeeAvatar,

      updatePartnerAdmin,

      // Deliveries
      nextDeliveriesPageUrl,
      lastDeliveriesPageUrl,
      prevDeliveriesPageUrl,
      deliveriesTotalItems,
      deliveriesFrom,
      deliveriesTo,
      deliveriesPagesLinks,
      deliveries,
      changeDeliveriesPage,
      formatValue,
      
      getOrderId,
      resolveOrderStatus,
      resolveRiderStatus,
      updateRiderStatus,
    }  
  }
}
</script>
<style scoped>
.m_upper {
  text-transform: uppercase;
}
</style>
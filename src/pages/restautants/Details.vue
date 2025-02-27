<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow" v-if="restaurant != null">
        <div v-if="restaurant.operating_hours.length == 0" class="relative bg-red-200 dark:bg-red-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
          <!-- Background illustration -->
          <div class="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
            <svg width="319" height="198" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
                <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
                <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                  <stop stop-color="#A5B4FC" offset="0%" />
                  <stop stop-color="#818CF8" offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                  <stop stop-color="#4338CA" offset="0%" />
                  <stop stop-color="#6366F1" stop-opacity="0" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="none" fill-rule="evenodd">
                <g transform="rotate(64 36.592 105.604)">
                  <mask id="welcome-d" fill="#fff">
                    <use xlink:href="#welcome-a" />
                  </mask>
                  <use fill="url(#welcome-b)" xlink:href="#welcome-a" />
                  <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
                </g>
                <g transform="rotate(-51 91.324 -105.372)">
                  <mask id="welcome-f" fill="#fff">
                    <use xlink:href="#welcome-e" />
                  </mask>
                  <use fill="url(#welcome-b)" xlink:href="#welcome-e" />
                  <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
                </g>
                <g transform="rotate(44 61.546 392.623)">
                  <mask id="welcome-h" fill="#fff">
                    <use xlink:href="#welcome-g" />
                  </mask>
                  <use fill="url(#welcome-b)" xlink:href="#welcome-g" />
                  <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
                </g>
              </g>
            </svg>
          </div>

          <!-- Content -->
          <div class="relative">
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">Restaurant Profile is Incomplete</h1>
            <p class="dark:text-indigo-200 flex gap-1">
              <span v-if="restaurant.operating_hours.length == 0"><p>Operating Hours not entered </p></span>
              <!-- <span v-if="restaurant.operating_hours.length == 0 && restaurant.documents.length == 0"><p> and</p></span> -->
              <!-- <span v-if="restaurant.documents.length == 0"> Business Documents Not Uploaded </span> -->
            </p>
          </div>
        </div>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0 flex gap-2">
              <img :src="restaurant.logo ? restaurant.logo : '../../src/images/icon-01.svg'" width="60" height="60" :alt="restaurant.name" class="rounded-full h-fit" />
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold my-auto">{{ restaurant.name }} ✨</h1>
            </div>
            <div class="flex gap-2 flex-wrap">
              <span v-if="userPermissions('edit partners') && restaurant.status == 'Pending'" class="text-sm rounded-xl p-2 bg-slate-500 text-slate-200 mr-4">Pending Approval</span>
              <button class="btn bg-yellow-400 text-white hover:bg-yellow-600 transition duration-200 ease-in-out" v-if="userPermissions('edit partners') && restaurant.status != 'Approved'" @click="updateStatus(2)">Approve</button>
              <button
                class="btn bg-red-400 text-white hover:bg-red-600 transition duration-200 ease-in-out" 
                v-if="userPermissions('edit partners') && restaurant.status != 'Denied'" 
                @click="modalOpen = true"
              >
                Reject
              </button>
              <modal-action v-if="userPermissions('edit partners')" :add-class="'max-w-lg'" :id="'addStatusReason'" :modal-open="modalOpen" @close-modal="modalOpen = false">
                <h1 class="text-lg text-slate-800 dark:text-slate-200">Enter Rejection Reason</h1>
                <textarea name="statusReason" id="" cols="30" rows="10" v-model="statusReason" class="form-input bg-white dark:bg-slate-800 w-full"></textarea>
                <div class="flex justify-end">
                  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click="updateStatus(3)">Submit</button>
                </div>
              </modal-action>
              <modal-action v-if="userPermissions('edit partners')" :add-class="'max-w-lg'" :id="'addServiceChargeAgreement'" :modal-open="serviceChargeAgreementModal" @close-modal="serviceChargeAgreementModal = false">
                <h1 class="text-lg text-slate-800 dark:text-slate-200">Enter Service Charge Agreement</h1>
                <input name="statusReason" type="number" id="" v-model="serviceChargeAgreement" class="form-input bg-white dark:bg-slate-800 w-full mb-2" />
                <div class="flex justify-end">
                  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click="updateServiceChargeAgreement">Submit</button>
                </div>
              </modal-action>
              <modal-action v-if="userPermissions('edit partners')" :add-class="'max-w-lg'" :id="'addServiceChargeGroceriesAgreement'" :modal-open="serviceChargeGroceriesAgreementModal" @close-modal="serviceChargeGroceriesAgreementModal = false">
                <h1 class="text-lg text-slate-800 dark:text-slate-200">Enter Service Charge Agreement</h1>
                <input name="statusReason" type="number" id="" v-model="serviceChargeGroceriesAgreement" class="form-input bg-white dark:bg-slate-800 w-full mb-2" />
                <div class="flex justify-end">
                  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click="updateGroceriesServiceChargeAgreement">Submit</button>
                </div>
              </modal-action>
            </div>
          </div>  
          <div class="flex gap-2 mb-2">
            <button
              v-if="userPermissions('edit partners')"
              class="btn bg-emerald-300 text-slate-900" 
              @click="serviceChargeGroceriesAgreementModal = true"
            >
              Groceries Service Charge Agreement ({{ restaurant.groceries_service_charge_agreement ? restaurant.groceries_service_charge_agreement : 0 }}%)
            </button>
            <button
              v-if="userPermissions('edit partners')"
              class="btn bg-emerald-300 text-slate-900" 
              @click="serviceChargeAgreementModal = true"
            >
              Service Charge Agreement ({{ restaurant.service_charge_agreement ? restaurant.service_charge_agreement : 0 }}%)
            </button>
            <router-link :to="{ name: 'partner-edit', params: { id: restaurant.uuid } }">
              <button class="btn bg-yellow-200 text-slate-800 font-bold">Edit</button>
            </router-link>
          </div>
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-full xl:col-span-4">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Restaurant Info</h2>
                </header>
                <div class="flex gap-2 p-3">
                  <div class="flex flex-col space-y-2 w-[98%]">
                    <h1 class="flex flex-wrap gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Email:</span><strong class="text-ellipsis overflow-hidden">{{ restaurant.email }}</strong></h1>
                    <h1 class="flex flex-wrap gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Phone Number:</span><strong class="text-ellipsis overflow-hidden">{{ restaurant.phone_no }}</strong></h1>
                    <h1 class="flex flex-wrap gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Created On:</span><strong class="text-ellipsis overflow-hidden">{{ moment(restaurant.created_at).format('Do MMM Y') }}</strong></h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full xl:col-span-4">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Restaurant Admin Info</h2>
                </header>
                <div class="flex gap-3 p-3">
                  <img :src="restaurant.user.image ? restaurant.user.image : '../../src/images/icon-01.svg'" :alt="restaurant.user.name" class="w-12 h-12 rounded-full object-cover" />
                  <div class="flex flex-col space-y-2 w-[98%]">
                    <h1 class="flex flex-wrap gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Name:</span><strong class="text-ellipsis overflow-hidden">{{ restaurant.user.name }}</strong></h1>
                    <h1 class="flex flex-wrap gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Email:</span><strong class="text-ellipsis overflow-hidden">{{ restaurant.user.email }}</strong></h1>
                    <h1 class="flex flex-wrap gap-2 font-bold text-slate-800 dark:text-slate-100"><span>Phone Number:</span><strong class="text-ellipsis overflow-hidden">{{ restaurant.user.phone_number }}</strong></h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full xl:col-span-4">
              <div class="grid grid-cols-2 gap-2">
                <div class="col-span-full xl:col-span-1">
                  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex flex-col h-full">
                      <div class="grow p-5">
                        <header class="space-y-2">
                          <div class="text-center">
                            <h2 class="text-xl leading-snug justify-center font-semibold">Orders</h2>
                          </div>
                          <div class="flex justify-center items-center"><span class="text-2xl font-medium text-slate-400 -mt-0.5 mr-1">{{ restaurant.orders_count }}</span></div>
                        </header>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-full xl:col-span-1">
                  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex flex-col h-full">
                      <div class="grow p-5">
                        <header class="space-y-2">
                          <div class="text-center">
                            <h2 class="text-xl leading-snug justify-center font-semibold">Menu</h2>
                          </div>
                          <div class="flex justify-center items-center"><span class="text-2xl font-medium text-slate-400 -mt-0.5 mr-1">{{ restaurant.menus_count }}</span></div>
                        </header>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-full xl:col-span-2">
                  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex justify-between h-full mx-6 my-2">
                      <div class="text-center">
                        <h2 class="text-xl leading-snug justify-center font-semibold">Rating</h2>
                      </div>
                      <div class="flex items-center space-x-2">
                        <!-- Stars -->
                        <div class="flex space-x-1">
                          <button>
                            <span class="sr-only">1 star</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(averageRating) >= 1 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                          <button>
                            <span class="sr-only">2 stars</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(averageRating) >= 2 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                          <button>
                            <span class="sr-only">3 stars</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(averageRating) >= 3 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                          <button>
                            <span class="sr-only">4 stars</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(averageRating) >= 4 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                          <button>
                            <span class="sr-only">5 stars</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(averageRating) == 5 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                        </div>
                        <!-- Rate -->
                        <div class="inline-flex font-medium text-amber-600">{{ averageRating }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
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
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(payment_data.total_earnings, restaurant.country) }}</span></div>
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
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(payment_data.paid_amount, restaurant.country) }}</span></div>
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
                        <h2 class="text-xl leading-snug justify-center font-semibold">Unpaid Amount</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(payment_data.unpaid_amount, restaurant.country) }}</span></div>
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
                        <h2 class="text-xl leading-snug justify-center font-semibold">Total Service Charges</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(payment_data.service_charges, restaurant.country) }}</span></div>
                    </header>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="grid grid-cols-2 gap-6">
            <div class="col-span-full xl:col-span-1">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Orders</h2>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <!-- Orders Table -->
                  <div class="overflow-x-auto">
                    <table class="table-auto w-full dark:text-slate-300">
                      <!-- Table header -->
                      <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Order ID</div>
                          </th>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">User</div>
                          </th>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Amount</div>
                          </th>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Delivery Status</div>
                          </th>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Ordered On</div>
                          </th>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left"></div>
                          </th>
                        </tr>
                      </thead>
                      <!-- Table body -->
                      <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                        <tr v-for="order in orders" :key="order.id">
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left">{{getOrderId(order)}}</div>
                          </td>
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left">{{order.user.name}}</div>
                          </td>
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left font-medium text-emerald-500">{{formatValue(order.total_amount, order.country)}}</div>
                          </td>
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div :class="'text-center rounded-xl '+resolveOrderStatus(order.status)">{{order.status}}</div>
                          </td>
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left">{{moment(order.created_at).fromNow()}}</div>
                          </td>
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                            <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm" :to="{ name: 'order-details', params: { id: order.uuid }}">View</router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- Pagination -->
                    <div class="mt-8">
                      <PaginationClassic @change-page="ordersChangePage" :next_page="nextOrdersPageUrl" :prev_page="prevOrdersPageUrl" :from="ordersFrom" :to="ordersTo" :total_items="ordersTotalItems" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full xl:col-span-1">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Payments</h2>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <!-- Payments Table -->
                  <div class="overflow-x-auto">
                    <table class="table-auto w-full dark:text-slate-300">
                      <!-- Table header -->
                      <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Transaction ID</div>
                          </th>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">User</div>
                          </th>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Amount</div>
                          </th>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Paid On</div>
                          </th>
                          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left"></div>
                          </th>
                        </tr>
                      </thead>
                      <!-- Table body -->
                      <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                        <tr v-for="payment in payments" :key="payment.id">
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left">{{payment.transaction_id}}</div>
                          </td>
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left">{{payment.orderable.user.name}}</div>
                          </td>
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left font-medium text-emerald-500">{{formatValue(payment.amount, payment.orderable.user.country)}}</div>
                          </td>
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left">{{moment(payment.created_at).fromNow()}}</div>
                          </td>
                          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                            <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm" :to="{ name: 'order-details', params: { id: payment.uuid }}">View</router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- Pagination -->
                    <div class="mt-8">
                      <PaginationClassic @change-page="paymentsChangePage" :next_page="nextPaymentsPageUrl" :prev_page="prevPaymentsPageUrl" :from="paymentsFrom" :to="paymentsTo" :total_items="paymentsTotalItems" />
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 class="font-semibold text-slate-800 dark:text-slate-100">Menu</h2>
              </header>
              <div class="p-3">
                <!-- Table -->
                <div class="overflow-x-auto relative">
                  <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Title</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Status</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Orders</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Added On</div>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="menu_item in menu" :key="menu_item.id" :class="menu_item.id === editMenuId ? 'bg-slate-600 transition duration-200 ease-in-out' : 'transition duration-300 ease-in-out'">
                        <td class="p-2">
                          <div class="flex items-center">
                            <!-- <img :src="menu_item.image" alt="" class="w-8 h-8 object-cover mx-2"> -->
                            <ul class="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
                              <li v-for="image in menu_item.images" :key="image.id">
                                <img class="w-9 h-9 rounded-full object-cover" :src="image.image_url" width="36" height="36" alt="menu" />
                              </li>
                            </ul>
                            <div class="text-slate-800 dark:text-slate-100 ml-2">{{ menu_item.title }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <div :class="menu_item.status == 2 ? 'text-green-500 font-semobold' : 'text-red-500 font-semobold'">{{ menu_item.status == 2 ? 'Active' : 'Inactive' }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-center text-sky-500">{{ menu_item.order_items_count }}</div>
                        </td>
                        <td class="p-2">
                          <div v-if="menu_item.created_at" class="text-center text-sky-500">{{ moment(menu_item.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2 flex justify-between">
                          <button class="btn btn-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" @click="editMenu(menu_item, 'edit menu')">Edit</button>
                          <button class="btn btn-sm font-medium text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400" @click="editMenu(menu_item, 'edit images')">
                            {{ menu_item.images.length <= 0 ? 'Add' : 'Edit' }} Images
                            <span v-if="menu_item.images.length <= 0" class="w-2 h-2 bg-red-600 rounded-full my-auto ml-0.5"></span>
                          </button>
                          <button class="btn btn-sm font-medium text-green-500 hover:text-green-600 dark:hover:text-green-400" @click="editMenu(menu_item, 'edit prices')">
                            {{ menu_item.menu_prices.length <= 0 ? 'Add' : 'Edit' }} Prices
                            <span v-if="menu_item.menu_prices.length <= 0" class="w-2 h-2 bg-red-600 rounded-full my-auto ml-0.5"></span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <div class="mt-8">
                    <PaginationClassic @change-page="menuChangePage" :next_page="nextMenuPageUrl" :prev_page="prevMenuPageUrl" :from="menuFrom" :to="menuTo" :total_items="menuTotalItems" />
                    <!-- <PaginationNumeric @change-page="menuChangePage" :next_page="nextMenuPageUrl" :prev_page="prevMenuPageUrl" :from="menuFrom" :to="menuTo" :total_items="menuTotalItems" :links="menuPagesLinks" /> -->
                  </div>  
                </div>
              </div>
            </div>
            <div class="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-slate-200 dark:border-slate-700 relative h-full">
              <div class="p-3">
                <div class="flex justify-between mb-6">
                  <h1 class="text-xl text-slate-800 dark:text-slate-100 font-bold"> {{ action == 'create menu' ? 'Add' : 'Update' }} Menu</h1>
                  <button v-if="action != 'create menu'" class="btn btn-sm bg-slate-400 text-black" @click.prevent="addPrice">Add Price</button>
                </div>
                <!-- Add/Edit Menu -->
                <form v-if="action == 'create menu' || action == 'edit menu'" class="flex flex-col justify-around" @submit.prevent="createMenu">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="title">Title</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addMenuTitle" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="title">Description</label>
                      <textarea name="addCategoryDescription" id="" class="form-input w-full min-h-full rounded-lg" rows="2" v-model="addMenuDescription"></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="preparation_time">Preparation Time (in minutes)</label>
                      <input id="preparation_time" class="form-input w-full rounded-lg" type="number" min="0" v-model="addMenuPreparationTime" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="categories">Categories</label>
                      <select name="categories" multiple size="4" v-model="addMenuCategories" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option v-for="category in categories" :key="category.id" :value="category.id" @click="getSelectedCategory(category)">{{ category.title }}</option>
                      </select>
                    </div>
                    <div v-show="showSubCategoriesInput">
                      <label class="block text-sm font-medium mb-1" for="categories">Sub categories</label>
                      <select name="categories" multiple size="4" v-model="addMenuSubcategories" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option v-for="category in subcategories" :key="category.id" :value="category.id">{{ category.title }}</option>
                      </select>
                    </div>
                    <div class="flex-none flex my-auto">
                      <div class="m-3">
                        <!-- Start -->
                        <label class="flex items-center">
                          <input type="radio" name="menu-active" v-model="addMenuStatus" value="2" class="form-radio" />
                          <span class="text-sm ml-2">Active</span>
                        </label>
                        <!-- End -->
                      </div>

                      <div class="m-3">
                        <!-- Start -->
                        <label class="flex items-center">
                          <input type="radio" name="menu-active" v-model="addMenuStatus" value="1" class="form-radio" />
                          <span class="text-sm ml-2">Inactive</span>
                        </label>
                        <!-- End -->
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end mt-6 absolute bottom-4 right-4">
                    <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                  </div>
                </form>
                <!-- Add/Edit Images -->
                <form v-if="action == 'edit images'" class="relative flex flex-col justify-between h-full" @submit.prevent="createImages">
                  <div class="flex gap-2 w-fit max-h-[22rem] overflow-auto flex-wrap">
                    <img class="w-40 h-40 rounded-lg object-cover mb-2" v-for="image in currentMenuImages" :key="image.id" :src="image.image_url" alt="menu" />
                  </div>
                  <div class="w-full">
                    <label for="dropzone-file" class="flex w-full h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div class="flex">
                        <p v-if="addMenuImages.length == 0" class="mb-2 text-sm px-6 my-5 text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or drag and drop(Max 2 Files)
                        </p>
                        <div v-else class="flex flex-col flex-wrap">
                          <p v-for="image in addMenuImages" :key="image" class="text-sm ml-2 whitespace-pre-wrap text-gray-500 dark:text-gray-400"><span class="font-semibold">{{ image.name }}</span></p>
                        </div>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" multiple accept=".jpg,.png" v-on:change="selectImages" />
                    </label>
                    <div class="flex justify-end mt-2">
                      <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                    </div>
                  </div>
                </form>
                <!-- Add/Edit Price -->
                <form v-if="action == 'edit prices' || action == 'add price'" class="relative flex flex-col justify-evenly" @submit.prevent="createMenu">
                  <div class="flex gap-2 w-full max-h-[26rem] overflow-auto flex-wrap">
                    <div v-for="index in addPricesCount" :key="index">
                      <div class="flex justify-between">
                        <div>
                          <label class="block text-sm font-medium mb-1" for="price">Price</label>
                          <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addPrices[index - 1]" />
                        </div>
                        <div class="flex-none flex my-auto">
                          <div class="m-3">
                            <!-- Start -->
                            <label class="flex items-center">
                              <input type="radio" :name="index" v-model="addPriceStatus[index - 1]" value="2" class="form-radio" />
                              <span class="text-sm ml-2">Active</span>
                            </label>
                            <!-- End -->
                          </div>
  
                          <div class="m-3">
                            <!-- Start -->
                            <label class="flex items-center">
                              <input type="radio" :name="index" v-model="addPriceStatus[index - 1]" value="1" class="form-radio" />
                              <span class="text-sm ml-2">Inactive</span>
                            </label>
                            <!-- End -->
                          </div>
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="title">Description</label>
                        <textarea name="addCategoryDescription" id="" class="form-input w-full min-h-full rounded-lg" rows="2" v-model="addPriceDescriptions[index - 1]"></textarea>
                      </div>
                      <div class="flex justify-between px-1" v-if="action == 'edit prices'">
                        <button class="btn btn-sm w-fit bg-red-500 text-white" @click.prevent="removePrice(index - 1)">Remove</button>
                        <button class="btn btn-sm w-fit bg-green-500 text-white" @click.prevent="updatePrice(index - 1)">Update</button>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end mt-2" v-if="action == 'add price'">
                    <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 class="font-semibold text-slate-800 dark:text-slate-100">Categories</h2>
              </header>
              <div class="p-3">
                <!-- Table -->
                <div class="overflow-x-auto relative">
                  <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Name</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Added On</div>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="category in restaurantCategories" :key="category.id">
                        <td class="p-2">
                          <div class="flex items-center">
                            <img :src="category.image" alt="" class="w-8 h-8 object-cover mx-2">
                            <div class="text-slate-800 dark:text-slate-100">{{ category.title }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <div v-if="category.created_at" class="text-center text-sky-500">{{ moment(category.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2">
                          <button class="btn btn-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" @click="editCategory(category)">Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <div class="mt-8">
                      <!-- <PaginationClassic @change-page="categoriesChangePage" :next_page="nextCategoriesPageUrl" :prev_page="prevCategoriesPageUrl" :from="categoriesFrom" :to="categoriesTo" :total_items="categoriesTotalItems" /> -->
                      <PaginationNumeric @change-page="categoriesChangePage" :next_page="nextCategoriesPageUrl" :prev_page="prevCategoriesPageUrl" :from="categoriesFrom" :to="categoriesTo" :total_items="categoriesTotalItems" :links="categoriesPagesLinks" />
                    </div>  
                </div>
              </div>
            </div>
            <!-- Add Category Form -->
            <div class="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-slate-200 dark:border-slate-700">
              <div class="p-3">
                <h1 class="text-xl text-slate-800 dark:text-slate-100 font-bold mb-6">{{ category_action == 'create' ? 'Add' : 'Edit' }} Category</h1>
                <!-- Form -->
                <form @submit.prevent="addCategory()" class="flex flex-col justify-evenly">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="title">Title</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addCategoryTitle" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="title">Description</label>
                      <textarea name="addCategoryDescription" id="" class="form-input w-full min-h-full rounded-lg" rows="8" v-model="addCategoryDescription"></textarea>
                    </div>
                    <div>
                      <label for="Image">Image</label>
                      <input type="file" name="addCategoryImage" class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" v-on:change="selectCategoryImage" id="">
                    </div>
                  </div>
                  <div class="flex justify-end mt-6">
                    <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <br>
          <div class="grid grid-cols-2 gap-6">
            <!-- Reviews -->
            <div class="col-span-full xl:col-span-1">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Latest Reviews</h2>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <div class="grid grid-cols-3">
                      <span class="font-bold col-span-2">Review</span>
                      <span class="font-bold">Reviewed On</span>
                    </div>
                  <div v-for="review in restaurant.reviews" :key="review.id">
                    <div class="grid grid-cols-3">
                      <span class="col-span-2">{{ review.review }}</span>
                      <span>{{ moment(review.created_at).format('Do MMM YYYY') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Operating Hours -->
            <div class="col-span-full xl:col-span-1">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Operating Hours</h2>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <div v-for="time in restaurant.operating_hours" :key="time.id">
                    <div class="grid grid-cols-3">
                      <span>{{ time.day }}</span>
                      <span>{{ time.opening_time }}</span>
                      <span>{{ time.closing_time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div class="grid grid-cols-2 gap-6">
            <!-- Documents -->
            <!-- <div class="col-span-full xl:col-span-1">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Business Documents</h2>
                </header>
                <div class="grid grid-cols-2 p-4 gap-2">
                  <button v-for="doc in restaurant.documents" :key="doc.id" class="col-span-1 bg-green-700 hover:bg-green-500 transition duration-150 ease-in-out text-slate-100 py-2 rounded-lg hover:cursor-pointer" @click="downloadFile(doc)" title="Click to Download">{{ doc.document_name }}</button>
                </div>
              </div>
            </div> -->
          </div>
          <br />
          <div class="w-full" v-if="restaurant.latitude && restaurant.longitude">
            <header class="py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Location</h2>
            </header>
            <GMapMap
              ref="mapRef"
              :center="center"
              :zoom="zoom"
              :options="{
                fullscreenControl: false,
              }"
              map-type-id="terrain"
              style="width: 78vw; height: 320px"
            >
              <GMapMarker
                v-for="(m, index) in marker"
                :key="index"
                :position="m.position"
              />
            </GMapMap>
          </div>
        </div>
      </main>
    </div> 
  </div>
</template>

<script>
import { ref, onMounted, inject, watch, onUnmounted } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import { useRoute } from 'vue-router'
import moment from 'moment';
import { formatValue, userPermissions } from '../../utils/Utils'
import { useToast } from 'vue-toastification'
import ModalAction from '../../components/ModalAction.vue'

export default {
  name: 'RestaurantDetails',
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
    const center = ref({lat: 51.093048, lng: 6.842120})
    const marker = ref([])
    const zoom = ref(16)
    const mapRef = ref(null)

    const nextOrdersPageUrl = ref('')
    const lastOrdersPageUrl = ref('')
    const prevOrdersPageUrl = ref('')
    const ordersPagesLinks = ref([])
    const ordersFrom = ref(0)
    const ordersTo = ref(0)
    const ordersTotalItems = ref(0)
    let ordersSearch = ref('')

    const nextPaymentsPageUrl = ref('')
    const lastPaymentsPageUrl = ref('')
    const prevPaymentsPageUrl = ref('')
    const paymentsPagesLinks = ref([])
    const paymentsFrom = ref(0)
    const paymentsTo = ref(0)
    const paymentsTotalItems = ref(0)
    let paymentsSearch = ref('')

    const nextMenuPageUrl = ref('')
    const prevMenuPageUrl = ref('')
    const lastMenuPageUrl = ref('')
    const menuPagesLinks = ref([])
    const menuFrom = ref(0)
    const menuTo = ref(0)
    const menuTotalItems = ref(0)
    let menuSearch = ref('')

    const nextCategoriesPageUrl = ref('')
    const prevCategoriesPageUrl = ref('')
    const lastCategoriesPageUrl = ref('')
    const categoriesPagesLinks = ref([])
    const categoriesFrom = ref(0)
    const categoriesTo = ref(0)
    const categoriesTotalItems = ref(0)
    let categoriesSearch = ref('')
    
    const restaurantCategories = ref([])

    const currentMenuImages = ref([])

    const restaurant = ref(null)
    const payments = ref([])
    const orders = ref([])
    const menu = ref([])

    const categories = ref([])
    const reviews = ref([])

    const modalOpen = ref(false)

    const averageRating = ref(0)

    const statusReason = ref('')

    const serviceChargeAgreement = ref(0)
    const serviceChargeGroceriesAgreement = ref(0)

    const serviceChargeAgreementModal = ref(false)
    const serviceChargeGroceriesAgreementModal = ref(false)

    const payment_data = ref([])

    const addCategoryTitle = ref('')
    const addCategoryDescription = ref('')
    const addCategoryImage = ref(null)

    const addEmployeeFirstName = ref('')
    const addEmployeeLastName = ref('')
    const addEmployeeAvatar = ref(null)
    const addEmployeeEmail = ref('')
    const addEmployeePhoneNumber = ref('')
    const addEmployeeStatus = ref('2')

    const editRestaurantCategoryId = ref('')
    const editUserId = ref('')

    const editMenuId = ref('')

    const addMenuTitle = ref('')
    const addMenuDescription = ref('')
    const addMenuStatus = ref('2')
    const addMenuPreparationTime = ref(0)
    const addMenuCategories = ref([])
    const addMenuSubcategories = ref([])

    const showSubCategoriesInput = ref(false)
    const subcategories = ref([])

    const addMenuImages = ref([])

    const addPricesCount = ref(0)
    const addPrices = ref([])
    const addPriceStatus = ref([])
    const addPriceDescriptions = ref([])
    const currentPrices = ref([])

    const action = ref('create menu')
    const category_action = ref('create')

    const baseURL = process.env.NODE_ENV === 'development' ? 'http://moboeats.test/' : 'https://api.moboeats.co.uk/'

    const getMenu = () => {
      $http.get(`/admin/restaurant/${router.params.id}/menu`)
        .then(response => {
          menu.value = []
          menu.value = response.data.data.menu.data
          categories.value = response.data.data.categories
          nextMenuPageUrl.value = response.data.data.menu.next_page_url
          lastMenuPageUrl.value = response.data.data.menu.last_page_url
          prevMenuPageUrl.value = response.data.data.menu.prev_page_url
          menuTotalItems.value = response.data.data.menu.total
          menuFrom.value = response.data.data.menu.from
          menuTo.value = response.data.data.menu.to
          menuPagesLinks.value = []
          response.data.data.menu.links.forEach(link => {
            menuPagesLinks.value.push(link)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

    const getRestaurant = () => {
      $http.get('/admin/restaurant/'+router.params.id)
        .then(response => {
          restaurant.value = response.data.data.restaurant
          averageRating.value = response.data.data.average_rating
          payment_data.value = response.data.data.restaurant_payment_data
          serviceChargeAgreement.value = restaurant.value.service_charge_agreement
          serviceChargeGroceriesAgreement.value = restaurant.value.groceries_service_charge_agreement
          center.value = {lat: Number(restaurant.value.latitude), lng: Number(restaurant.value.longitude)}
          marker.value.push({ position: { lat: Number(restaurant.value.latitude), lng: Number(restaurant.value.longitude) } })
        })
    }

    const updateServiceChargeAgreement = () => {
      $http.post(`/admin/restaurant/${restaurant.value.uuid}/update/service-charge-agreement`, {
        service_charge_agreement: serviceChargeAgreement.value
      })
      .then(() => {
        getRestaurant()
        serviceChargeAgreementModal.value = false
        toast.success('Charge agreement updated successfully')
      })
      .catch(() => {
        toast.error('An error occurred')
      })
    }

    const updateGroceriesServiceChargeAgreement = () => {
      $http.post(`/admin/restaurant/${restaurant.value.uuid}/update/service-charge-agreement`, {
        service_charge_agreement: serviceChargeGroceriesAgreement.value,
        groceries: 'groceries'
      })
      .then(() => {
        getRestaurant()
        serviceChargeGroceriesAgreementModal.value = false
        toast.success('Charge agreement updated successfully')
      })
      .catch(() => {
        toast.error('An error occurred')
      })
    }

    const getPayments = () => {
      $http.get('/admin/restaurant/'+router.params.id+'/payments')
        .then(response => {
          payments.value = []
          payments.value = response.data.data.data
          nextPaymentsPageUrl.value = response.data.data.next_page_url
          lastPaymentsPageUrl.value = response.data.data.last_page_url
          prevPaymentsPageUrl.value = response.data.data.prev_page_url
          paymentsTotalItems.value = response.data.data.total
          paymentsFrom.value = response.data.data.from
          paymentsTo.value = response.data.data.to
          paymentsPagesLinks.value = []
          response.data.data.links.forEach(link => {
            paymentsPagesLinks.value.push(link)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

    const getOrders = () => {
      $http.get('/admin/restaurant/'+router.params.id+'/orders')
        .then(response => {
          orders.value = []
          orders.value = response.data.data.data
          nextOrdersPageUrl.value = response.data.data.next_page_url
          lastOrdersPageUrl.value = response.data.data.last_page_url
          prevOrdersPageUrl.value = response.data.data.prev_page_url
          ordersTotalItems.value = response.data.data.total
          ordersFrom.value = response.data.data.from
          ordersTo.value = response.data.data.to
          ordersPagesLinks.value = []
          response.data.data.links.forEach(link => {
            ordersPagesLinks.value.push(link)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

    const getReviews = () => {
      $http.get('/admin/restaurants/'+router.params.id +'/reviews')
        .then(response => {
          reviews.value = response.data.data.reverse().splice(0, 5)
        })
    }

    const getRestaurantCategories = () => {
      $http.get('/admin/restaurant/'+router.params.id+'/categories')
        .then(response => {
          restaurantCategories.value = []
          categoriesPagesLinks.value = []
          restaurantCategories.value = response.data.data.categories.data
          nextCategoriesPageUrl.value = response.data.data.categories.next_page_url
          lastCategoriesPageUrl.value = response.data.data.categories.last_page_url
          prevCategoriesPageUrl.value = response.data.data.categories.prev_page_url
          categoriesTotalItems.value = response.data.data.categories.total
          categoriesFrom.value = response.data.data.categories.from
          categoriesTo.value = response.data.data.categories.to
          response.data.data.categories.links.forEach(link => {
            categoriesPagesLinks.value.push(link)
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

    onMounted(() => {
      getRestaurant()
      getPayments()
      getOrders()
      getMenu()
      getReviews()
      getRestaurantCategories()
    })

    const onCloseModal = () => {
      modalOpen.value = false
    }

    const getOrderId = (order) => {
      return order.uuid.split('-')[0].toUpperCase()
    }

    function ordersChangePage(page) {
      $http.get(page)
        .then(response => {
          orders.value = response.data.data.data
          nextOrdersPageUrl.value = response.data.data.next_page_url
          lastOrdersPageUrl.value = response.data.data.last_page_url
          prevOrdersPageUrl.value = response.data.data.prev_page_url
          ordersTotalItems.value = response.data.data.total
          ordersFrom.value = response.data.data.from
          ordersTo.value = response.data.data.to
          response.data.data.links.forEach(link => {
            ordersPagesLinks.value.push(link)
          })
        })
    }

    function paymentsChangePage(page) {
      $http.get(page)
        .then(response => {
          payments.value = response.data.data.data
          nextPaymentsPageUrl.value = response.data.data.next_page_url
          lastPaymentsPageUrl.value = response.data.data.last_page_url
          prevPaymentsPageUrl.value = response.data.data.prev_page_url
          paymentsTotalItems.value = response.data.data.total
          paymentsFrom.value = response.data.data.from
          paymentsTo.value = response.data.data.to
          response.data.data.links.forEach(link => {
            paymentsPagesLinks.value.push(link)
          })
        })
    }

    function menuChangePage(page) {
      $http.get(page)
        .then(response => {
          menu.value = response.data.data.data
          nextMenuPageUrl.value = response.data.data.next_page_url
          lastMenuPageUrl.value = response.data.data.last_page_url
          prevMenuPageUrl.value = response.data.data.prev_page_url
          menuTotalItems.value = response.data.data.total
          menuFrom.value = response.data.data.from
          menuTo.value = response.data.data.to
          response.data.data.links.forEach(link => {
            menuPagesLinks.value.push(link)
          })
        })
    }

    function categoriesChangePage(page) {
      $http.get(page)
        .then(response => {
          restaurantCategories.value = []
          categoriesPagesLinks.value = []
          restaurantCategories.value = response.data.data.data
          nextCategoriesPageUrl.value = response.data.data.next_page_url
          lastCategoriesPageUrl.value = response.data.data.last_page_url
          prevCategoriesPageUrl.value = response.data.data.prev_page_url
          categoriesTotalItems.value = response.data.data.total
          categoriesFrom.value = response.data.data.from
          categoriesTo.value = response.data.data.to
          response.data.data.links.forEach(link => {
            categoriesPagesLinks.value.push(link)
          })
        })
    }

    watch(ordersSearch, async (newSearch, oldSearch) => {
      $http.get('/admin/restaurant/'+router.params.id+'/orders?search='+newSearch)
        .then(response => {
          orders.value = response.data.data.data
          nextOrdersPageUrl.value = response.data.data.next_page_url
          lastOrdersPageUrl.value = response.data.data.last_page_url
          prevOrdersPageUrl.value = response.data.data.prev_page_url
          ordersTotalItems.value = response.data.data.total
          ordersFrom.value = response.data.data.from
          ordersTo.value = response.data.data.to
          response.data.data.links.forEach(link => {
            ordersPagesLinks.value.push(link)
          })
        })
    })

    watch(paymentsSearch, async (newSearch, oldSearch) => {
      $http.get('/admin/restaurant/'+router.params.id+'/payments?search='+newSearch)
        .then(response => {
          payments.value = response.data.data.data
          nextPaymentsPageUrl.value = response.data.data.next_page_url
          lastPaymentsPageUrl.value = response.data.data.last_page_url
          prevPaymentsPageUrl.value = response.data.data.prev_page_url
          paymentsTotalItems.value = response.data.data.total
          paymentsFrom.value = response.data.data.from
          paymentsTo.value = response.data.data.to
          response.data.data.links.forEach(link => {
            paymentsPagesLinks.value.push(link)
          })
        })
    })

    watch(menuSearch, async (newSearch, oldSearch) => {
      $http.get('/admin/restaurant/'+router.params.id+'/menu?search='+newSearch)
        .then(response => {
          menu.value = response.data.data.data
          nextMenuPageUrl.value = response.data.data.next_page_url
          lastMenuPageUrl.value = response.data.data.last_page_url
          prevMenuPageUrl.value = response.data.data.prev_page_url
          menuTotalItems.value = response.data.data.total
          menuFrom.value = response.data.data.from
          menuTo.value = response.data.data.to
          response.data.data.links.forEach(link => {
            menuPagesLinks.value.push(link)
          })
        })
    })

    const getMenuImage = (url) => {
      return baseURL+'/storage/menus/images/'+url
    }

    const resolveOrderStatus = (status) => {
      switch (status) {
        case 'Pending':
          return 'text-gray-100 bg-gray-500'
          break;
        case 'In Progress':
          return 'text-blue-100 bg-blue-500'
          break;
        case 'Delivered':
          return 'text-green-100 bg-green-500'
          break;
        case 'Awating Pick Up':
          return 'text-emarald-100 bg-emarald-500'
          break;
        case 'On Delivery':
          return 'text-slate-100 bg-slate-500'
          break;
        case 'Denied':
          return 'text-red-100 bg-red-500'
          break;
        default:
          return 'text-gray-100 bg-gray-500'
          break;
      }
    }

    const downloadFile = (file) => {
      $http.get(`/admin/documents/${file.id}/download`, { responseType: 'arraybuffer' })
        .then(response => {
            const fileURL = window.URL.createObjectURL(new Blob([response.data]))
            const fileLink = document.createElement('a')

            fileLink.href = fileURL
            fileLink.setAttribute(
              'download',
              `${file.document_name}.pdf`,
            )
            document.body.appendChild(fileLink)

            fileLink.click()
        })
        .catch(console.error)
    }

    const updateStatus = (status) => {
      $http.post(`/admin/restaurants/${router.params.id}/status/update`, {
        status: status,
        reason: statusReason.value
      })
      .then((res) => {
        getRestaurant()
        toast.success('Restaurant updated successfully')
        if (modalOpen.value) {
          modalOpen.value = false
          statusReason.value = ''
        }
      })
      .catch(err => {
        if (err.response.status == 422) {
          toast.error('Please enter rejection reason')
        }
      })
    }

    const selectCategoryImage = (e) => {
      addCategoryImage.value = e.target.files[0]
    }

    const updatePrice = (index) => {
      let id = currentPrices.value[index].id

      const formData = new FormData()
      formData.append('price', addPrices.value[index])
      formData.append('description', addPriceDescriptions.value[index])
      formData.append('status', addPriceStatus.value[index])
      $http.post(`/restaurant/menu-prices/${id}/update`, formData)
        .then(() => {
          getMenu()
          toast.success('Prices updated successfully')
          clearFields('menu')
          action.value = 'create menu'
        })
        .catch(err => {
          console.error(err)
          toast.error(err.response.data.message)
        })
    }

    const selectImages = (e) => {
      for (let index = 0; index < 2; index++) {
        if (e.target.files[index]) {
          addMenuImages.value.push(e.target.files[index])
        }
      }
    }

    const addPrice = () => {
      addPrices.value = []
      addPriceDescriptions.value = []
      addPriceStatus.value = []
      addPricesCount.value = 0
      addPricesCount.value += 1
      action.value = 'add price'
    }

    const createImages = () => {
      const formData = new FormData()
      addMenuImages.value.forEach((image, index) => {
        formData.append('images['+index+']', image)
      })
      $http.post(`/restaurant/menu/${editMenuId.value}/images/update`, formData)
        .then(() => {
          getMenu()
          toast.success('Menu images updated successfully')
          clearFields('menu')
          action.value = 'create menu'
        })
        .catch(error => {
          toast.error(error.response.message)
          console.error(error)
        })
    }

    const editMenu = (menu, edit_action) => {
      editMenuId.value = menu.id
      if (edit_action == 'edit menu') {
        addMenuTitle.value = menu.title
        addMenuDescription.value = menu.description
        addMenuStatus.value = menu.status
        addMenuPreparationTime.value = menu.preparation_time
        addMenuSubcategories.value = []
        subcategories.value = []
        addMenuCategories.value = []
        if (menu.categories.length > 0) {
          menu.categories.forEach(category => {
            // Add Subcategories to list
            categories.value.forEach(main_category => {
              if (category.id == main_category.id) {
                main_category.subCategories.forEach(sub_category => {
                  subcategories.value.push(sub_category)
                })
              }
            })
            addMenuCategories.value.push(category.id)
            let possible_groceries_names = ['groceries', 'grocery'];
            // Add Menu Subcategories to list
            if (possible_groceries_names.includes(category.title.toLowerCase())) {
              if (menu.sub_categories.length > 0) {
                menu.sub_categories.forEach(subcategory => {
                  addMenuSubcategories.value.push(subcategory.id)
                })
              } else {
                addMenuSubcategories.value = []
                showSubCategoriesInput.value = false
              }
              showSubCategoriesInput.value = true
            }
          })
        } else {
          addMenuCategories.value = []
        }
        action.value = 'edit menu'
      }
      if (edit_action == 'edit images') {
        currentMenuImages.value = menu.images
        action.value = 'edit images'
      }
      if (edit_action == 'edit prices') {
        currentPrices.value = []
        addPricesCount.value = 0
        addPrices.value = []
        addPriceStatus.value = []
        addPriceDescriptions.value = []
        menu.menu_prices.forEach(price => {
          currentPrices.value.push(price)
          addPrices.value.push(price.price)
          addPriceStatus.value.push(price.status)
          addPriceDescriptions.value.push(price.description)
          addPricesCount.value += 1
        })
        action.value = 'edit prices'
      }
    }

    const editCategory = (category) => {
      editRestaurantCategoryId.value = category.id
      addCategoryTitle.value = category.title
      addCategoryDescription.value = category.description
      category_action.value = 'update'
    }

    const removePrice = (index) => {
      if (addPricesCount.value > 1) {
        let id = currentPrices.value[index].id
        $http.delete(`/restaurant/menu-prices/${id}/delete`)
          .then(() => {
            addPricesCount.value -= 1
            addPrices.value.splice(index, 1)
            addPriceStatus.value.splice(index, 1)
            addPriceDescriptions.value.splice(index, 1)
            currentPrices.value.splice(index, 1)
          })
      } else {
        toast.error('At least one price is required')
      }
    }

    const createMenu = () => {
      switch (action.value) {
        case 'create menu':
          $http.post(`/restaurant/${router.params.id}/menu/add`, {
            'title': addMenuTitle.value,
            'description': addMenuDescription.value,
            'categoryIds': addMenuCategories.value,
            'subcategoryIds': addMenuSubcategories.value,
            'status': addMenuStatus.value,
            'preparation_time': addMenuPreparationTime.value,
          })
          .then(() => {
            toast.success('Menu added successfully')
            getMenu()
            clearFields('menu')
          })
          .catch(error => {
            toast.error(error.response.data.message)
          })
          break
        case 'edit menu':
          $http.post(`/restaurant/menu/${editMenuId.value}/update`, {
            'title': addMenuTitle.value,
            'description': addMenuDescription.value,
            'categoryIds': addMenuCategories.value,
            'subcategoryIds': addMenuSubcategories.value,
            'status': addMenuStatus.value,
            'preparation_time': addMenuPreparationTime.value,
          })
          .then(() => {
            getMenu()
            toast.success('Menu updated successfully')
            clearFields('menu')
          })
          .catch(error => {
            console.error(error)
          })
          break
        case 'add price':
          const formData = new FormData()
          formData.append('menu_id', editMenuId.value)
          formData.append('price', addPrices.value[0])
          formData.append('description', addPriceDescriptions.value[0])
          formData.append('status', addPriceStatus.value[0])
          $http.post('/restaurant/menu-prices', formData)
            .then(() => {
              getMenu()
              toast.success('Menu Price added successfully')
              clearFields('menu')
            })
            .catch(error => {
              toast.error(error.response.message.data)
            })
          break
        default:
          toast.error('Select action')
      }
    }

    const addCategory = () => {
      const formData = new FormData()
      formData.append('title', addCategoryTitle.value)
      formData.append('description', addCategoryDescription.value)
      formData.append('image', addCategoryImage.value)
      if (category_action.value == 'create') {
        $http.post('restaurant/'+router.params.id+'/categories/add', formData)
          .then(() => {
            getMenu()
            getRestaurantCategories()
            addCategoryTitle.value = ''
            addCategoryDescription.value = ''
            addCategoryImage.value = null
            toast.success('Category added')
            clearFields('category')
          })
          .catch(() => {
            toast.error('An error occured while adding category')
          })
      } else if (category_action.value == 'update') {
        $http.post('restaurant/'+router.params.id+'/categories/'+editRestaurantCategoryId.value+'/update', formData)
          .then(() => {
            getMenu()
            getRestaurantCategories()
            editRestaurantCategoryId.value = ''
            addCategoryTitle.value = ''
            addCategoryDescription.value = ''
            addCategoryImage.value = null
            category_action.value = 'create'
            toast.success('Category updated')
          })
          .catch(() => {
            toast.error('An error occured while updating category')
          })
      }
    }

    return {
      userPermissions,
      moment,
      sidebarOpen,
      restaurant,

      center,

      reviews,
      averageRating,

      mapRef,
      zoom,
      marker,

      payment_data,
      
      getOrderId,
      resolveOrderStatus,
      formatValue,

      nextOrdersPageUrl,
      lastOrdersPageUrl,
      prevOrdersPageUrl,
      ordersPagesLinks,
      ordersFrom,
      ordersTo,
      ordersTotalItems,
      ordersSearch,

      nextPaymentsPageUrl,
      lastPaymentsPageUrl,
      prevPaymentsPageUrl,
      paymentsPagesLinks,
      paymentsFrom,
      paymentsTo,
      paymentsTotalItems,
      paymentsSearch,

      nextMenuPageUrl,
      lastMenuPageUrl,
      prevMenuPageUrl,
      menuPagesLinks,
      menuFrom,
      menuTo,
      menuTotalItems,
      menuSearch,

      payments,
      orders,
      menu,
      subcategories,

      categories,

      action,

      addMenuImages,

      currentMenuImages,

      addPricesCount,
      category_action,

      restaurantCategories,
      categoriesPagesLinks,
      restaurantCategories,
      nextCategoriesPageUrl,
      lastCategoriesPageUrl,
      prevCategoriesPageUrl,
      categoriesTotalItems,
      categoriesFrom,
      categoriesTo,
      categoriesPagesLinks,

      categoriesChangePage,

      ordersChangePage,
      paymentsChangePage,
      menuChangePage,

      downloadFile,
      getMenuImage,

      updateStatus,

      modalOpen,
      onCloseModal,
      statusReason,

      addPrices,
      addPriceStatus,
      addPriceDescriptions,

      addCategoryTitle,
      addCategory,
      addCategoryDescription,
      addCategoryImage,

      serviceChargeAgreement,
      serviceChargeGroceriesAgreement,

      serviceChargeAgreementModal,
      serviceChargeGroceriesAgreementModal,

      updateServiceChargeAgreement,
      updateGroceriesServiceChargeAgreement,

      editMenu,
      createMenu,

      createImages,
      selectImages,

      addPrice,
      removePrice,
      updatePrice,

      editCategory,
      addCategory,
      selectCategoryImage,
    }  
  }
}
</script>
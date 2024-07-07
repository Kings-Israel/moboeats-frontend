<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <div class="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <div v-if="userPermissions('view customers')">
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
                      <h2 class="text-xl leading-snug justify-center font-semibold">Users</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ users }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/users">
                    <div class="flex items-center justify-center">
                      <span>View Users</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="userPermissions('view partners')">
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/restaurants">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Partners</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ restaurants }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/restaurants">
                    <div class="flex items-center justify-center">
                      <span>View Restaurants</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="userPermissions('view riders')">
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/riders">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Riders</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ riders }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/riders">
                    <div class="flex items-center justify-center">
                      <span>View Riders</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="userPermissions('view orders')">
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Total Orders</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ orders }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" :to="{ name: 'orders' }">
                    <div class="flex items-center justify-center">
                      <span>View Orders</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 mt-2">
          <div v-if="userPermissions('view suppliers')">
            <div class="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Supplement Suppliers</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ supplement_suppliers }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" :to="{ name: 'orders' }">
                    <div class="flex items-center justify-center">
                      <span>View Suppliers</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="userPermissions('view supplements')">
            <div class="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Supplements</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ supplements }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" :to="{ name: 'orders' }">
                    <div class="flex items-center justify-center">
                      <span>View Supplements</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="userPermissions('view supplements orders')">
            <div class="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Supplements Orders</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ supplement_orders }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" :to="{ name: 'orders' }">
                    <div class="flex items-center justify-center">
                      <span>View Supplements Orders</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">

          <!-- Cards -->
          <div class="grid grid-cols-12 gap-2">
            <!-- Sales -->
            <Sales v-if="userPermissions('view orders') && ordersData.labels.length > 0" :data="ordersData" />
            <!-- Payments -->
            <Payments v-if="userPermissions('view payments') && paymentsData.labels.length > 0" :data="paymentsData" />
            <span v-if="userPermissions('view payments')" class="col-span-12 my-2 bg-slate-200 text-slate-700 px-2 text-2xl font-bold rounded-md">Regional Payment Data</span>
            <template v-if="userPermissions('view payments')">
              <div class="col-span-12 grid grid-cols-4 gap-4 border-2 border-slate-200 rounded-md p-2 bg-slate-200" v-for="(data, index) in region_data" :key="index">
                <div class="col-span-4">
                  <h2 class="text-xl font-extrabold text-slate-600">{{ index }}</h2>
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
                            <h2 class="text-xl leading-snug justify-center font-semibold">Total Amount</h2>
                          </div>
                          <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.total_amount, index) }}</span></div>
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
                          <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.paid_amount, index) }}</span></div>
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
                          <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.unpaid_amount, index) }}</span></div>
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
                            <h2 class="text-xl leading-snug justify-center font-semibold">Restaurants Earnings</h2>
                          </div>
                          <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.restaurant_earnings, index) }} ({{ formatValue(data.restaurant_amount_paid_out, index) + ' Paid Out' }})</span></div>
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
                            <h2 class="text-xl leading-snug justify-center font-semibold">Rider Earnings</h2>
                          </div>
                          <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.rider_earnings, index) }} ({{ formatValue(data.rider_amount_paid_out, index) + ' Paid Out' }})</span></div>
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
                          <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(data.total_service_charges, index) }}</span></div>
                        </header>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <!-- <DashboardCard01 /> -->
            <!-- Users Registration Rate -->
            <!-- <DashboardCard02 /> -->
            <!-- Restaurant Registration -->
            <!-- <DashboardCard03 /> -->
            <!-- Bar chart (Direct vs Indirect) -->
            <!-- <DashboardCard04 /> -->
            <!-- Line chart (Real Time Value) -->
            <!-- <DashboardCard05 /> -->
            <!-- Doughnut chart (Top Menu Items) -->
            <TopMenuItems v-if="userPermissions('view menus') && topMenuData.data.length > 0" :labels="topMenuData.labels" :data="topMenuData.data" />
            <!-- Table (Top Restaurants) -->
            <TopRestaurants v-if="userPermissions('view partners') && top_restaurants.length > 0" :restaurants="top_restaurants" />
            <!-- Line chart (Sales Over Time) -->
            <!-- <DashboardCard08 /> -->
            <!-- Stacked bar chart (Sales VS Refunds) -->
            <!-- <DashboardCard09 /> -->
            <!-- Card (Recent Activity) -->
            <!-- <DashboardCard10 /> -->
            <!-- Card (Income/Expenses) -->
            <!-- <DashboardCard11 /> -->
            <!-- Categories -->
            <Categories v-if="userPermissions('view categories')" /> 
          </div>
        </div>
      </main>

      <div v-if="userPermissions('edit rates')" class="grid grid-cols-3 gap-2 mx-8 mb-2">
        <div v-for="setting in settings" :key="setting.id" class="w-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <div class="flex flex-col h-full">
            <div class="grow p-5">
              <header>
                <div class="flex justify-center mb-2">
                  <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true">
                    <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                      <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                    </svg>
                  </div>
                </div>
                <div class="text-center">
                  <h2 class="text-xl leading-snug justify-center font-semibold">{{ setting.name }}</h2>
                </div>
                <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ setting.type == 'amount' ? 'GBP' : '' }} {{ setting.variable }} {{ setting.type == 'percentage' ? '%' : '' }}</span></div>
              </header>
            </div>
            <div class="border-t border-slate-200 dark:border-slate-700">
              <div class="flex items-center justify-center my-2">
                <form @submit.prevent="updateSetting(setting.name)" method="post" v-if="setting.name == 'Delivery Rate'">
                  <input type="number" v-model="delivery_rate" min="1" class="form-input rounded-lg border-2 mx-4" id="" placeholder="Enter Value to update">
                  <button type="submit" class="bg-[#223f19] hover:bg-[#1c2e2a] transition duration-200 ease-in-out text-white px-2 rounded-md">Update</button>
                </form>
                <form @submit.prevent="updateSetting(setting.name)" method="post" v-if="setting.name == 'Base Service Charge Rate'">
                  <input type="number" v-model="service_charge" min="1" class="form-input rounded-lg border-2 mx-4" id="" placeholder="Enter Value to update">
                  <button type="submit" class="bg-[#223f19] hover:bg-[#1c2e2a] transition duration-200 ease-in-out text-white px-2 rounded-md">Update</button>
                </form>
                <form @submit.prevent="updateSetting(setting.name)" method="post" v-if="setting.name == 'Base Groceries Service Charge Rate'">
                  <input type="number" v-model="groceries_service_charge" min="1" class="form-input rounded-lg border-2 mx-4" id="" placeholder="Enter Value to update">
                  <button type="submit" class="bg-[#223f19] hover:bg-[#1c2e2a] transition duration-200 ease-in-out text-white px-2 rounded-md">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-8 mb-4 w-1/4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <form class="w-full p-8 flex flex-col" @submit.prevent="getQrCode">
          <label class="mb-2 text-slate-700 font-bold">Generate QR Code</label>
          <input type="text" v-model="qr_string" class="form-input rounded-lg border-2 w-full mb-2" id="" placeholder="Enter String to generate qr code">
          <button type="submit" class="bg-[#223f19] hover:bg-[#1c2e2a] transition duration-200 ease-in-out text-white px-2 rounded-md">Get</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import WelcomeBanner from '../partials/dashboard/WelcomeBanner.vue'
import DashboardAvatars from '../partials/dashboard/DashboardAvatars.vue'
import FilterButton from '../components/DropdownFilter.vue'
import Datepicker from '../components/Datepicker.vue'
import DashboardCard03 from '../partials/dashboard/DashboardCard03.vue'
import DashboardCard04 from '../partials/dashboard/DashboardCard04.vue'
import DashboardCard05 from '../partials/dashboard/DashboardCard05.vue'
import DashboardCard06 from '../partials/dashboard/DashboardCard06.vue'
import DashboardCard07 from '../partials/dashboard/DashboardCard07.vue'
import DashboardCard08 from '../partials/dashboard/DashboardCard08.vue'
import DashboardCard09 from '../partials/dashboard/DashboardCard09.vue'
import DashboardCard10 from '../partials/dashboard/DashboardCard10.vue'
import DashboardCard11 from '../partials/dashboard/DashboardCard11.vue'
import Sales from '../partials/dashboard/Sales.vue'
import Payments from '../partials/dashboard/Payments.vue'
import TopRestaurants from '../partials/dashboard/TopRestaurants.vue'
import Categories from '../partials/dashboard/Categories.vue'
import TopMenuItems from '../partials/dashboard/TopMenuItems.vue'
import { useToast } from 'vue-toastification'
import { formatValue, userPermissions } from '../utils/Utils'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    Header,
    WelcomeBanner,
    DashboardAvatars,
    FilterButton,
    Datepicker,
    DashboardCard03,
    DashboardCard04,
    DashboardCard05,
    DashboardCard06,
    DashboardCard07,
    DashboardCard08,
    DashboardCard09,
    DashboardCard10,
    DashboardCard11,
    Sales,
    Payments,
    TopRestaurants,
    Categories,
    TopMenuItems,
  },
  setup() {
    const $http = inject("$http")
    const toast = useToast()
    const sidebarOpen = ref(false)
    const users = ref(0)
    const restaurants = ref(0)
    const riders = ref(0)
    const orders = ref(0)
    const top_restaurants = ref([])
    const settings = ref([])
    const delivery_rate = ref('')
    const service_charge = ref('')
    const groceries_service_charge = ref('')
    const supplement_orders = ref(0)
    const supplements = ref(0)
    const supplement_suppliers = ref(0)
    const region_data = ref([])

    const qr_string = ref('')

    let ordersData = { labels: [], data: [], total_orders: 0, orders_difference: 0, orders_difference: ""}
    let paymentsData = { labels: [], data: [], total_orders: 0, orders_difference: 0, orders_difference: ""}
    let topMenuData = { labels: [], data: []}

    const getData = () => {
      $http.get('/admin/dashboard')
        .then(response => {
          ordersData.name = response.data.data.orders_series.name
          ordersData.labels = response.data.data.orders_series.labels
          ordersData.data = response.data.data.orders_series.data
          ordersData.total_orders = response.data.data.orders_series.total_orders
          ordersData.orders_direction = response.data.data.orders_series.orders_direction
          ordersData.orders_difference = response.data.data.orders_series.orders_difference
          paymentsData.name = response.data.data.payments_series.name
          paymentsData.labels = response.data.data.payments_series.labels
          paymentsData.data = response.data.data.payments_series.data
          paymentsData.total_payments = response.data.data.payments_series.total_payments
          paymentsData.payments_direction = response.data.data.payments_series.payments_direction
          paymentsData.payments_difference = response.data.data.payments_series.payments_difference
          topMenuData.labels = response.data.data.top_menu_series.top_menu_items_names,
          topMenuData.data = response.data.data.top_menu_series.top_menu_items_series
          top_restaurants.value = response.data.data.top_restaurants
          users.value = response.data.data.users
          restaurants.value = response.data.data.restaurants
          riders.value = response.data.data.riders
          orders.value = response.data.data.orders
          settings.value = response.data.data.settings
          supplements.value = response.data.data.supplements.supplements_count
          supplement_suppliers.value = response.data.data.supplements.suppliers_count
          supplement_orders.value = response.data.data.supplements.supplement_orders_count
          region_data.value = response.data.data.region_data
        })
    }

    onMounted(() => {
      getData()
    })

    const updateSetting = async (name) => {
      switch (name) {
        case 'Delivery Rate':
          await $http.post('/admin/delivery-rate/update', {
            rate: delivery_rate.value
          })
            .then(() => {
              getData()
              delivery_rate.value = ''
              toast.success('Delivery Rate updated successfully')
            })
          break;
        case 'Base Service Charge Rate':
          await $http.post('/admin/base-rate/update', {
            rate: service_charge.value
          })
            .then(() => {
              getData()
              service_charge.value = ''
              toast.success('Base Rate updated successfully')
            })
          break;
        case 'Base Groceries Service Charge Rate':
          await $http.post('/admin/base-rate/grocery/update', {
            rate: groceries_service_charge.value
          })
            .then(() => {
              getData()
              groceries_service_charge.value = ''
              toast.success('Base Rate updated successfully')
            })
          break;
        default:
          break;
      }
    }

    const getQrCode = () => {
      $http.post('/admin/qr-code', {
        string: qr_string.value
      },
      { responseType: 'arraybuffer' })
        .then(response => {
            const fileURL = window.URL.createObjectURL(new Blob([response.data]))
            const fileLink = document.createElement('a')

            fileLink.href = fileURL
            fileLink.setAttribute(
              'download',
              `QRCode.png`,
            )
            document.body.appendChild(fileLink)

            fileLink.click()
        })
        .catch(console.error)
    }

    const getPaymentType = (type) => {
      switch (type) {
        case 'App\\Models\\Order':
          return 'Order'
          break;
        case 'App\\Models\\SupplementOrder':
          return 'Supplement Order'
          break;
        case 'App\\Models\\DietSubscription':
          return 'Diet Subscription'
          break;
        default:
          break;
      }
    }

    return {
      userPermissions,
      sidebarOpen,
      formatValue,
      ordersData,
      paymentsData,
      users,
      restaurants,
      riders,
      orders,
      top_restaurants,
      topMenuData,
      settings,
      delivery_rate,
      service_charge,
      groceries_service_charge,
      qr_string,
      supplements,
      supplement_suppliers,
      supplement_orders,
      region_data,
      updateSetting,
      getQrCode,
    }  
  }
}
</script>
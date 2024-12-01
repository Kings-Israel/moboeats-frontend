<template>
  <div class="min-w-fit">
    <!-- Sidebar backdrop (mobile only) -->
    <div class="fixed inset-0 bg-[#2E5945] bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200" :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 shrink-0 bg-[#2E5945] p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >
      <!-- Sidebar header -->
      <div class="flex justify-between lg:justify-center pr-3 sm:px-2">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-slate-500 hover:text-yellow-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="flex gap-4" to="/">
          <img src="../images/1024.png" class="w-16 md:w-24 md:h-28 mx-auto object-contain" alt="">
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <ul class="mt-1">
            <!-- Dashboard -->
            <router-link :to="{ name: 'dashboard' }" custom v-slot="{ href, navigate, isExactActive }" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'hover:text-slate-200' : 'hover:text-white'">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'text-yellow-500' : 'text-yellow-400'" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                  <path class="fill-current" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'text-yellow-600' : 'text-yellow-600'" d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                  <path class="fill-current" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'text-yellow-200' : 'text-yellow-400'" d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />                      
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium duration-200">Dashboard</span>
                </a>
              </div>
            </router-link>
            <!-- Users -->
            <router-link v-if="permissions.includes('view customers')" custom v-slot="{ href, navigate, isExactActive }" :to="{ name: 'users' }">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="currentRoute.fullPath.includes('users') ? 'text-yellow-500' : 'text-yellow-600'" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('users') ? 'text-yellow-300' : 'text-yellow-400'" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" />
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Customers</span>
                </a>
              </div>
            </router-link>
            <!-- Restaurant Admins -->
            <router-link v-if="permissions.includes('view partners')" custom v-slot="{ href, navigate, isExactActive }" :to="{ name: 'restaurant-admins' }">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
                  <g fill="#212121" class="nc-icon-wrapper">
                    <path class="fill-current" :class="currentRoute.fullPath.includes('restaurant-admins') ? 'text-yellow-500' : 'text-yellow-400'" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm3.772,17.333a4,4,0,0,1-7.544,0,1,1,0,1,1,1.886-.666,2,2,0,0,0,3.772,0,1,1,0,0,1,1.886.666Zm2.582-4.187h0a3.294,3.294,0,0,1-4.5-1.206h0L12.707,9.954a.745.745,0,0,0-1.412,0l-1.147,1.987A3.294,3.294,0,1,1,7.376,7L12,7.021,16.626,7a3.294,3.294,0,0,1,1.728,6.146Z"></path>
                  </g>
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Partner Admins</span>
                </a>
              </div>
            </router-link>
            <!-- Riders -->
            <router-link v-if="permissions.includes('view riders')" custom v-slot="{ href, navigate, isExactActive }" to="/riders">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
                  <g fill="#212121" class="nc-icon-wrapper">
                    <path class="fill-current" :class="currentRoute.fullPath.includes('riders') ? 'text-yellow-500' : 'text-yellow-400'" d="M9,17H7A5,5,0,0,1,7,7V9.5a.5.5,0,0,0,.807.395l4.5-3.5a.5.5,0,0,0,0-.79l-4.5-3.5A.5.5,0,0,0,7,2.5V5A7,7,0,0,0,7,19H9a1,1,0,0,0,0-2Z" fill="#212121">
                    </path>
                    <path class="fill-current" :class="currentRoute.fullPath.includes('riders') ? 'text-yellow-500' : 'text-yellow-400'" data-color="color-2" d="M17,5H15a1,1,0,0,0,0,2h2a5,5,0,0,1,0,10V14.5a.5.5,0,0,0-.807-.395l-4.5,3.5a.5.5,0,0,0,0,.79l4.5,3.5A.5.5,0,0,0,17,21.5V19A7,7,0,0,0,17,5Z">
                    </path>
                  </g>
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Riders</span>
                </a>
              </div>
            </router-link>
            <!-- Partners -->
            <router-link v-if="permissions.includes('view partners')" custom v-slot="{ href, navigate, isExactActive }" to="/partners">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
                  <g fill="#212121" class="nc-icon-wrapper">
                    <path class="fill-current" :class="currentRoute.fullPath.includes('partners') || currentRoute.fullPath.includes('restaurant') ? 'text-yellow-300' : 'text-yellow-400'" d="M7.938,22.308,7.914,22H5.33c-.186,0-.33-.256-.33-.477a3.533,3.533,0,0,1,.205-.927,7.923,7.923,0,0,0,.421-2.468,15.029,15.029,0,0,0-.18-2.083,28.074,28.074,0,0,1-.289-4.119A16.64,16.64,0,0,1,6.336,6.6,9.027,9.027,0,0,0,7,4V3H9V4a9.027,9.027,0,0,0,.664,2.6l.145.422c.064,0,.126-.02.191-.02h1.911c-.122-.373-.244-.73-.357-1.057A9.388,9.388,0,0,1,11,4V1a1,1,0,0,0-1-1H6A1,1,0,0,0,5,1V4a9.388,9.388,0,0,1-.554,1.943,18.517,18.517,0,0,0-1.289,5.983,29.777,29.777,0,0,0,.307,4.383,13.36,13.36,0,0,1,.162,1.819,6.046,6.046,0,0,1-.335,1.889A5.117,5.117,0,0,0,3,21.523,2.409,2.409,0,0,0,5.33,24H8.485A3.93,3.93,0,0,1,7.938,22.308Z" fill="#212121">
                    </path>
                    <path class="fill-current" :class="currentRoute.fullPath.includes('partners') || currentRoute.fullPath.includes('restaurant') ? 'text-yellow-300' : 'text-yellow-400'" d="M20.734,9.32A1,1,0,0,0,20,9H10a1,1,0,0,0-1,1.077l.929,12.077A2.01,2.01,0,0,0,11.926,24h6.148a2.008,2.008,0,0,0,1.994-1.846L21,10.077A1,1,0,0,0,20.734,9.32Z" data-color="color-2">
                    </path>
                  </g>
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Partners</span>
                </a>
              </div>
            </router-link>
            <!-- Orphanages -->
            <router-link custom v-slot="{ href, navigate, isExactActive }" to="/orphanages">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="currentRoute.fullPath.includes('orphanages') ? 'text-yellow-600' : 'text-yellow-700'" d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('orphanages') ? 'text-yellow-500' : 'text-yellow-600'" d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('orphanages') ? 'text-yellow-300' : 'text-yellow-400'" d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z" />                      
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Orphanages</span>
                </a>
              </div>
            </router-link>
            <!-- End Orphanages -->
            <!-- Orders -->
            <router-link v-if="permissions.includes('view orders')" custom v-slot="{ href, navigate, isExactActive }" to="/orders">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="currentRoute.fullPath.includes('orders') ? 'text-yellow-300' : 'text-yellow-400'" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('orders') ? 'text-yellow-600' : 'text-yellow-700'" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('orders') ? 'text-yellow-500' : 'text-yellow-600'" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />                    
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Orders</span>
                </a>
              </div>
            </router-link>
            <!-- Payments -->
            <router-link v-if="permissions.includes('view payments')" custom v-slot="{ href, navigate, isExactActive }" to="/payments">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="currentRoute.fullPath.includes('payments') ? 'text-yellow-600' : 'text-yellow-700'" d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('payments') ? 'text-yellow-500' : 'text-yellow-600'" d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('payments') ? 'text-yellow-300' : 'text-yellow-400'" d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z" />                      
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Payments</span>
                </a>
              </div>
            </router-link>
            <!-- End Payments -->
            <!-- Payouts  -->
            <SidebarLinkGroup v-if="permissions.includes('view riders payouts') || permissions.includes('view partners payouts')" v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('payouts')">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('payouts') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="currentRoute.fullPath.includes('payouts') ? 'text-yellow-300' : 'text-yellow-400'" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('payouts') ? 'text-yellow-600' : 'text-yellow-700'" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('payouts') ? 'text-yellow-500' : 'text-yellow-600'" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />                    
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Payouts </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <!-- Diet Subscribers -->
                  <router-link v-if="permissions.includes('view riders payouts')" custom v-slot="{ href, navigate, isExactActive }" to="/payouts/riders">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-300 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Riders</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link v-if="permissions.includes('view partners payouts')" custom v-slot="{ href, navigate, isExactActive }" to="/payouts/partners">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-300 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Partners</span>
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
            <!-- Diets  -->
            <SidebarLinkGroup v-if="permissions.includes('view diet plan subscriptions') || permissions.includes('view diet plan packages') || permissions.includes('add/edit diet plan packages')" v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('diet')">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('diet') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="currentRoute.fullPath.includes('diet') ? 'text-yellow-300' : 'text-yellow-400'" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('diet') ? 'text-yellow-600' : 'text-yellow-700'" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('diet') ? 'text-yellow-500' : 'text-yellow-600'" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />                    
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Diets & Diet Planning </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <!-- Diet Subscribers -->
                  <router-link v-if="permissions.includes('view diet plan subscriptions')" custom v-slot="{ href, navigate, isExactActive }" to="/diet/subscribers">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-300 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Subscribers</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link v-if="permissions.includes('view diet plan packages') || permissions.includes('add/edit diet plan packages')" custom v-slot="{ href, navigate, isExactActive }" to="/diet/packages">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-300 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Packages</span>
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
            <!-- Supplements and Suppliers  -->
            <SidebarLinkGroup v-if="permissions.includes('view supplements') || permissions.includes('add/edit supplements') || permissions.includes('view suppliers') || permissions.includes('view supplements orders') || permissions.includes('edit supplements orders')" v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('supplements')">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('supplements') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="currentRoute.fullPath.includes('supplements') ? 'text-yellow-300' : 'text-yellow-400'" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('supplements') ? 'text-yellow-600' : 'text-yellow-700'" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('supplements') ? 'text-yellow-500' : 'text-yellow-600'" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />                    
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Supplements </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link v-if="permissions.includes('view supplements') || permissions.includes('add/edit supplements')" to="/supplements" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-300 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Supplements</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link v-if="permissions.includes('view suppliers') || permissions.includes('add/edit suppliers')" to="/supplements/suppliers" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-300 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Suppliers</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link v-if="permissions.includes('view supplements orders') || permissions.includes('edit supplements orders')" to="/supplements/orders" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-300 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Orders</span>
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
            <!-- Discounts -->
            <router-link v-if="permissions.includes('view discounts')" custom v-slot="{ href, navigate, isExactActive }" to="/discounts">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="currentRoute.fullPath.includes('discounts') ? 'text-yellow-600' : 'text-yellow-700'" d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('discounts') ? 'text-yellow-500' : 'text-yellow-600'" d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('discounts') ? 'text-yellow-300' : 'text-yellow-400'" d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z" />                      
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Discounts</span>
                </a>
              </div>
            </router-link>       
            <!-- Marketing  -->
            <SidebarLinkGroup v-if="permissions.includes('view marketing posters') || permissions.includes('add/edit marketing posters')" v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('marketing')">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('marketing') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="currentRoute.fullPath.includes('marketing') ? 'text-yellow-300' : 'text-yellow-400'" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('marketing') ? 'text-yellow-600' : 'text-yellow-700'" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('marketing') ? 'text-yellow-500' : 'text-yellow-600'" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />                    
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Marketing </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link v-if="permissions.includes('view marketing posters') || permissions.includes('add/edit marketing posters')" to="/marketing/posters" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Posters</span>
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
            <!-- Marketing -->
            <!-- Roles and Permissions -->
            <router-link v-if="role == 'admin'" custom v-slot="{ href, navigate, isExactActive }" to="/roles">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="currentRoute.fullPath.includes('roles') ? 'text-yellow-500' : 'text-yellow-600'" d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('roles') ? 'text-yellow-300' : 'text-yellow-400'" d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('roles') ? 'text-yellow-500' : 'text-yellow-600'" d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('roles') ? 'text-yellow-300' : 'text-yellow-400'" d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />                      
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Roles & Permissions</span>
                </a>
              </div>
            </router-link>
            <!-- Admins -->
            <router-link v-if="role == 'admin'" custom v-slot="{ href, navigate, isExactActive }" to="/admins">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
                  <g fill="#212121" class="nc-icon-wrapper">
                    <path class="fill-current" :class="currentRoute.fullPath.includes('admins') ? 'text-yellow-500' : 'text-yellow-400'" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm3.772,17.333a4,4,0,0,1-7.544,0,1,1,0,1,1,1.886-.666,2,2,0,0,0,3.772,0,1,1,0,0,1,1.886.666Zm2.582-4.187h0a3.294,3.294,0,0,1-4.5-1.206h0L12.707,9.954a.745.745,0,0,0-1.412,0l-1.147,1.987A3.294,3.294,0,1,1,7.376,7L12,7.021,16.626,7a3.294,3.294,0,0,1,1.728,6.146Z"></path>
                  </g>
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Admins</span>
                </a>
              </div>
            </router-link>
            <!-- FAQs -->
            <router-link v-if="permissions.includes('view frequently asked questions') || permissions.includes('add/edit frequently asked questions')" custom v-slot="{ href, navigate, isExactActive }" to="/faqs">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="currentRoute.fullPath.includes('faqs') ? 'text-yellow-500' : 'text-yellow-600'" d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('faqs') ? 'text-yellow-300' : 'text-yellow-400'" d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('faqs') ? 'text-yellow-500' : 'text-yellow-600'" d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('faqs') ? 'text-yellow-300' : 'text-yellow-400'" d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />                      
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">FAQs</span>
                </a>
              </div>
            </router-link> 
            <!-- Messages -->
            <router-link v-if="permissions.includes('view messages')" to="/messages" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900 rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-600'" d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z" />
                        <path class="fill-current" :class="isExactActive ? 'text-yellow-300' : 'text-yellow-400'" d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Messages</span>
                    </div>
                    <!-- Badge -->
                    <div class="flex flex-shrink-0 ml-2">
                      <span class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-yellow-500 px-2 rounded">{{ unread_messages_count }}</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Logs -->
            <router-link v-if="permissions.includes('view logs')" custom v-slot="{ href, navigate, isExactActive }" to="/logs">
              <div class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-2" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="currentRoute.fullPath.includes('logs') ? 'text-yellow-500' : 'text-yellow-600'" d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('logs') ? 'text-yellow-300' : 'text-yellow-400'" d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('logs') ? 'text-yellow-500' : 'text-yellow-600'" d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                  <path class="fill-current" :class="currentRoute.fullPath.includes('logs') ? 'text-yellow-300' : 'text-yellow-400'" d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />                      
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium">Logs</span>
                </a>
              </div>
            </router-link>  
            <!-- Community -->
            <SidebarLinkGroup v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('community')" class="hidden">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('community') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="currentRoute.fullPath.includes('community') ? 'text-yellow-500' : 'text-yellow-600'" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('community') ? 'text-yellow-300' : 'text-yellow-400'" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" />
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Community</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/community/users-tabs" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Users - Tabs</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/community/users-tiles" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Users - Tiles</span>
                      </a>
                    </li>
                  </router-link> 
                  <router-link to="/community/profile" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Profile</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/community/feed" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Feed</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/community/forum" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Forum</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/community/forum-post" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Forum - Post</span>
                      </a>
                    </li>
                  </router-link>                   
                  <router-link to="/community/meetups" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Meetups</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/community/meetups-post" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Meetups - Post</span>
                      </a>
                    </li>
                  </router-link>                  
                </ul>
              </div>
            </SidebarLinkGroup>
            <!-- Finance -->
            <SidebarLinkGroup v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('finance')" class="hidden">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('finance') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="currentRoute.fullPath.includes('finance') ? 'text-yellow-300' : 'text-yellow-400'" d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('finance') ? 'text-yellow-500' : 'text-yellow-700'" d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('finance') ? 'text-yellow-600' : 'text-yellow-600'" d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z" />                      
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Finance</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/finance/cards" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Cards</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/finance/transactions" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Transactions</span>
                      </a>
                    </li>
                  </router-link> 
                  <router-link to="/finance/transaction-details" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Transaction Details</span>
                      </a>
                    </li>
                  </router-link>                
                </ul>
              </div>
            </SidebarLinkGroup>    
            <!-- Job Board -->
            <SidebarLinkGroup v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('job')" class="hidden">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('job') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="currentRoute.fullPath.includes('job') ? 'text-yellow-600' : 'text-yellow-700'" d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('job') ? 'text-yellow-500' : 'text-yellow-600'" d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('job') ? 'text-yellow-300' : 'text-yellow-400'" d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z" />                      
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Job Board</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/job/job-listing" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Listing</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/job/job-post" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Job Post</span>
                      </a>
                    </li>
                  </router-link> 
                  <router-link to="/job/company-profile" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Company Profile</span>
                      </a>
                    </li>
                  </router-link>                
                </ul>
              </div>
            </SidebarLinkGroup>
            <!-- Tasks -->
            <SidebarLinkGroup v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('tasks')" class="hidden">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('tasks') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="currentRoute.fullPath.includes('tasks') ? 'text-yellow-500' : 'text-yellow-600'" d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('tasks') ? 'text-yellow-500' : 'text-yellow-600'" d="M1 1h22v23H1z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('tasks') ? 'text-yellow-300' : 'text-yellow-400'" d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z" />                      
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Tasks</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/tasks/kanban" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Kanban</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/tasks/list" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">List</span>
                      </a>
                    </li>
                  </router-link>              
                </ul>
              </div>
            </SidebarLinkGroup>                  
            <!-- Inbox -->
            <router-link to="/inbox" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 hidden" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-600'" d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z" />
                      <path class="fill-current" :class="isExactActive ? 'text-yellow-300' : 'text-yellow-400'" d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z" />
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Inbox</span>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Calendar -->
            <router-link to="/calendar" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 hidden" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-600'" d="M1 3h22v20H1z" />
                      <path class="fill-current" :class="isExactActive ? 'text-yellow-300' : 'text-yellow-400'" d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z" />
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Calendar</span>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Campaigns -->
            <router-link to="/campaigns" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 hidden" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-600'" d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z" />
                      <path class="fill-current" :class="isExactActive ? 'text-yellow-300' : 'text-yellow-400'" d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />                    
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Campaigns</span>
                  </div>
                </a>
              </li>
            </router-link>            
            <!-- Settings -->
            <SidebarLinkGroup v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('settings')" class="hidden">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('settings') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">            
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current" :class="currentRoute.fullPath.includes('settings') ? 'text-yellow-500' : 'text-yellow-600'" d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('settings') ? 'text-yellow-300' : 'text-yellow-400'" d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('settings') ? 'text-yellow-500' : 'text-yellow-600'" d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                      <path class="fill-current" :class="currentRoute.fullPath.includes('settings') ? 'text-yellow-300' : 'text-yellow-400'" d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />                      
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Settings</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/settings/account" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">My Account</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/settings/notifications" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">My Notifications</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/settings/apps" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Connected Apps</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/settings/plans" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Plans</span>
                      </a>
                    </li>
                  </router-link>                       
                  <router-link to="/settings/billing" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Billing & Invoices</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/settings/feedback" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Give Feedback</span>
                      </a>
                    </li>
                  </router-link>                                                                    
                </ul>
              </div>
            </SidebarLinkGroup>
            <!-- Utility -->
            <SidebarLinkGroup v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('utility')" class="hidden">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('utility') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <circle class="fill-current" :class="currentRoute.fullPath.includes('utility') ? 'text-yellow-300' : 'text-yellow-400'" cx="18.5" cy="5.5" r="4.5" />
                      <circle class="fill-current" :class="currentRoute.fullPath.includes('utility') ? 'text-yellow-500' : 'text-yellow-600'" cx="5.5" cy="5.5" r="4.5" />
                      <circle class="fill-current" :class="currentRoute.fullPath.includes('utility') ? 'text-yellow-500' : 'text-yellow-600'" cx="18.5" cy="18.5" r="4.5" />
                      <circle class="fill-current" :class="currentRoute.fullPath.includes('utility') ? 'text-yellow-300' : 'text-yellow-400'" cx="5.5" cy="18.5" r="4.5" />                    
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Utility</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/utility/changelog" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Changelog</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/utility/roadmap" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Roadmap</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/utility/faqs" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">FAQs</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/utility/empty-state" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Empty State</span>
                      </a>
                    </li>
                  </router-link>  
                  <router-link to="/utility/404" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">404</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/utility/knowledge-base" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Knowledge Base</span>
                      </a>
                    </li>
                  </router-link>                  
                </ul>
              </div>
            </SidebarLinkGroup>          
          </ul>
        </div>
        <!-- More group -->
        <div class="hidden">
          <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">More</span>
          </h3>
          <ul class="mt-3">
            <!-- Authentication -->
            <SidebarLinkGroup v-slot="parentLink">
              <a class="block text-slate-200 truncate transition duration-150" :class="parentLink.expanded ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current text-yellow-600" d="M8.07 16H10V8H8.07a8 8 0 110 8z" />
                      <path class="fill-current text-yellow-400" d="M15 12L8 6v5H0v2h8v5z" />
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Authentication</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/signin" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a class="block text-yellow-400 hover:text-slate-200 transition duration-150 truncate" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Sign in</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/signup" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a class="block text-yellow-400 hover:text-slate-200 transition duration-150 truncate" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Sign up</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/reset-password" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a class="block text-yellow-400 hover:text-slate-200 transition duration-150 truncate" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Reset Password</span>
                      </a>
                    </li>
                  </router-link>                                  
                </ul>
              </div>
            </SidebarLinkGroup>
            <!-- Onboarding -->
            <SidebarLinkGroup v-slot="parentLink">
              <a class="block text-slate-200 truncate transition duration-150" :class="parentLink.expanded ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current text-yellow-600" d="M19 5h1v14h-2V7.414L5.707 19.707 5 19H4V5h2v11.586L18.293 4.293 19 5Z" />
                      <path class="fill-current text-yellow-400" d="M5 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM5 23a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Onboarding</span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/onboarding-01" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a class="block text-yellow-400 hover:text-slate-200 transition duration-150 truncate" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Step 1</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/onboarding-02" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a class="block text-yellow-400 hover:text-slate-200 transition duration-150 truncate" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Step 2</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/onboarding-03" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a class="block text-yellow-400 hover:text-slate-200 transition duration-150 truncate" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Step 3</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/onboarding-04" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a class="block text-yellow-400 hover:text-slate-200 transition duration-150 truncate" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Step 4</span>
                      </a>
                    </li>
                  </router-link>                                                    
                </ul>
              </div>
            </SidebarLinkGroup>            
            <!-- Components  -->
            <SidebarLinkGroup v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes('component')">
              <a class="block text-slate-200 truncate transition duration-150" :class="currentRoute.fullPath.includes('component') ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <circle class="fill-current" :class="currentRoute.fullPath.includes('component') ? 'text-yellow-500' : 'text-yellow-600'" cx="16" cy="8" r="8" />
                      <circle class="fill-current" :class="currentRoute.fullPath.includes('component') ? 'text-yellow-300' : 'text-yellow-400'" cx="8" cy="16" r="8" />                      
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Components </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-yellow-400" :class="parentLink.expanded && 'rotate-180'" viewBox="0 0 12 12">
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/component/button" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Button</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/form" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Input Form</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/dropdown" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dropdown</span>
                      </a>
                    </li>
                  </router-link> 
                  <router-link to="/component/alert" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Alert & Banner</span>
                      </a>
                    </li>
                  </router-link> 
                  <router-link to="/component/modal" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Modal</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/pagination" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Pagination</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/tabs" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Tabs</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/breadcrumb" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Breadcrumb</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/badge" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Badge</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/avatar" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Avatar</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/tooltip" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Tooltip</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/accordion" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Accordion</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/component/icons" custom v-slot="{ href, navigate, isExactActive }">
                    <li class="mb-1 last:mb-0">
                      <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-400 hover:text-slate-200'" :href="href" @click="navigate">
                        <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Icons</span>
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>            
          </ul>
        </div>
      </div>

      <!-- Expand / collapse button -->
      <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="px-3 py-2">
          <button @click.prevent="sidebarExpanded = !sidebarExpanded">
            <span class="sr-only">Expand / collapse sidebar</span>
            <svg class="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
              <path class="text-yellow-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
              <path class="text-yellow-600" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, inject } from 'vue'
import { useRouter } from 'vue-router'

import SidebarLinkGroup from './SidebarLinkGroup.vue'

export default {
  name: 'Sidebar',
  props: ['sidebarOpen'],
  components: {
    SidebarLinkGroup,
  },  
  setup(props, { emit }) {
    const $http = inject('$http')
    const trigger = ref(null)
    const sidebar = ref(null)
    const role = ref('')
    const permissions = ref([])

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
    const sidebarExpanded = ref(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')

    const currentRoute = useRouter().currentRoute.value

    const unread_messages_count = ref(0)

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return
      if (
        !props.sidebarOpen ||
        sidebar.value.contains(target) ||
        trigger.value.contains(target)
      ) return
      emit('close-sidebar')
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return
      emit('close-sidebar')
    } 

    const getUnreadMessagesCount = () => {
      $http.get('/messages/unread/count')
        .then(response => {
          unread_messages_count.value = response.data.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
      getUnreadMessagesCount()
      role.value = localStorage.getItem('role')
      permissions.value = JSON.parse(localStorage.getItem('permissions'))
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    watch(sidebarExpanded, () => {
      localStorage.setItem('sidebar-expanded', sidebarExpanded.value)
      if (sidebarExpanded.value) {
        document.querySelector('body').classList.add('sidebar-expanded')
      } else {
        document.querySelector('body').classList.remove('sidebar-expanded')
      }
    })

    return {
      role,
      permissions,
      trigger,
      sidebar,
      sidebarExpanded,
      currentRoute,
      unread_messages_count,
    }
  },
}
</script>
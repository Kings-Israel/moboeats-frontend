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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Marketing Posters ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button v-if="userPermissions('add/edit marketing posters')" class="bg-indigo-700 hover:bg-indigo-500 p-2 text-white font-semibold rounded-full px-3" @click="addPosterModal = true">Add Marketing Poster</button>
              <modal-action :id="'addMenu'" :modal-open="addPosterModal" @close-modal="addPosterModal = false" :add-class="'max-w-4xl'">
                <p class="text-xl font-bold text-white">Add Discount on Menus</p>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around" @submit.prevent="createPoster">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Title</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addPosterTitle" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Description</label>
                      <input id="description" class="form-input w-full rounded-lg" type="text" v-model="addPosterDescription" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1" for="price">Poster</label>
                      <input id="image" class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" accept=".jpg,.png" type="file" @change="selectImage" />
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 mt-2">
                    <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                  </div>
                </form>
              </modal-action>
            </div>
          </div>

          <div class="flex justify-between gap-2 mb-2">
            <form class="relative w-[40%]">
              <label for="action-search" class="">Search</label>
              <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full" type="search" v-model="postersSearch" placeholder="Search Menus" />
              <button class="absolute inset-0 top-6 right-auto group" type="submit" aria-label="Search">
                <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
            <button class="bg-red-500 text-white rounded-full h-fit w-[30%] py-1 my-auto" @click="search = ''">Clear Fields</button>
          </div>

          <!-- Table -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <!-- <header class="px-5 py-4">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Promos <span class="text-slate-400 dark:text-slate-500 font-medium">{{ discounts.length }}</span></h2>
            </header> -->
            <div class="">
              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Title</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Description</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Created On</div>
                        </th>
                        <th class="pr-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium bg-slate-50 divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="poster in posters" :key="poster.id" :class="poster.id === editPosterId ? 'bg-slate-300 transition duration-200 ease-in-out' : 'transition duration-300 ease-in-out'">
                        <td class="p-2">
                          <div class="flex items-center">
                            <ul class="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
                              <li>
                                <img class="w-9 h-9 rounded-full" :src="poster.poster" width="36" height="36" alt="menu" />
                              </li>
                            </ul>
                            <div class="text-sky-700 font-semibold mx-2">{{ poster.title }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ poster.description }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold">{{ moment(poster.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2 flex gap-2 justify-end">
                          <button v-if="permissions.includes('add/edit marketing posters')" class="btn btn-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" @click="editPoster(poster)">Edit</button>
                          <button v-if="permissions.includes('add/edit marketing posters')" class="btn btn-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400" @click="deletePoster(poster)">Delete</button>
                        </td>
                        <modal-action :id="'edit_'+poster.id" :add-class="'max-w-xl'" :modal-open="editPosterModal" @close-modal="editPosterModal = false">
                          <!-- Add/Edit Menu -->
                          <form class="flex flex-col justify-around" @submit.prevent="updatePoster">
                            <div class="grid grid-cols-1 gap-2">
                              <div class="space-y-4">
                                <div>
                                  <div class="space-y-4">
                                    <div>
                                      <label class="block text-sm font-medium mb-1" for="price">Title</label>
                                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addPosterTitle" />
                                    </div>
                                    <div>
                                      <label class="block text-sm font-medium mb-1" for="price">Description</label>
                                      <input id="description" class="form-input w-full rounded-lg" type="text" v-model="addPosterDescription" />
                                    </div>
                                    <div>
                                      <label class="block text-sm font-medium mb-1" for="price">Description</label>
                                      <input id="image" accept=".jpg,.png" class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" @change="selectImage" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="flex justify-end bottom-2 mt-2">
                              <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
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
            <div class="my-4">
              <PaginationClassic @change-page="postersChangePage" :next_page="nextPostersPage" :prev_page="prevPostersPage" :from="postersFrom" :to="postersTo" :total_items="postersTotalItems" />
            </div>  
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject, watch } from 'vue'
import Sidebar from '../../../partials/Sidebar.vue'
import Header from '../../../partials/Header.vue'
import PaginationClassic from '../../../components/PaginationClassic.vue'
import PaginationNumeric from '../../../components/PaginationNumeric.vue'
import { useRoute } from 'vue-router'
import moment from 'moment';
import { formatValue, userPermissions } from '../../../utils/Utils'
import { useToast } from 'vue-toastification'
import ModalAction from '../../../components/ModalAction.vue'

export default {
  name: 'Posters',
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

    const nextPostersPage = ref('')
    const prevPostersPage = ref('')
    const lastPostersPage = ref('')
    const postersPagesLinks = ref([])
    const postersFrom = ref(0)
    const postersTo = ref(0)
    const postersTotalItems = ref(0)

    let postersSearch = ref('')

    const addPosterTitle = ref('')
    const addPosterDescription = ref('')
    const addPosterImage = ref(null)
    const addPosterLink = ref('')

    const editPosterId = ref('')

    const editPosterModal = ref(false)

    const addPosterModal = ref(false)

    const posters = ref([])

    const getPosters = () => {
      $http.get(`/admin/marketing`)
        .then(response => {
          posters.value = []
          posters.value = response.data.posters.data
          nextPostersPage.value = response.data.posters.next_page_url
          lastPostersPage.value = response.data.posters.last_page_url
          prevPostersPage.value = response.data.posters.prev_page_url
          postersTotalItems.value = response.data.posters.total
          postersFrom.value = response.data.posters.from
          postersTo.value = response.data.posters.to
          postersPagesLinks.value = []
          response.data.posters.links.forEach(link => {
            postersPagesLinks.value.push(link)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

    const editPoster = (poster) => {
      editPosterId.value = poster.id
      addPosterTitle.value = poster.title
      addPosterDescription.value = poster.description
      addPosterLink.value= poster.link
      editPosterModal.value = true
    }

    const clearFields = () => {
      addPosterTitle.value = ''
      addPosterDescription.value = ''
      addPosterLink.value = ''
    }

    const createPoster = () => {
      const formData = new FormData()
      formData.append('title', addPosterTitle.value)
      formData.append('description', addPosterDescription.value)
      formData.append('poster', addPosterImage.value)

      $http.post(`/admin/marketing/store`, formData)
        .then(() => {
          toast.success('Poster added successfully')
          getPosters()
          clearFields()
          addPosterModal.value = false
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    }

    const deletePoster = (poster) => {
      $http.delete('/admin/marketing/' + poster.id + '/delete')
        .then(response => {
          toast.success('Poster deleted successfully')
          getPosters()
        })
        .catch(err => {
          toast.error('Error while deleting poster')
          console.error(err)
        })
    }

    const updatePoster = () => {
      const formData = new FormData()
      formData.append('title', addPosterTitle.value)
      formData.append('description', addPosterDescription.value)
      formData.append('image', addPosterImage.value)
      formData.append('link', addPosterLink.value)

      $http.post(`/admin/marketing/${editPosterId.value}/update`, formData)
        .then(() => {
          toast.success('Poster updated successfully')
          getPosters()
          clearFields()
          editPosterModal.value = false
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    }

    onMounted(() => {
      user_permissions.value = JSON.parse(localStorage.getItem('permissions'))
      getPosters()
    })

    watch(postersSearch, async (newSearch, oldSearch) => {
      $http.get('/admin/marketing?search='+newSearch)
        .then(response => {
          posters.value = []
          posters.value = response.data.posters.data
          nextPostersPage.value = response.data.posters.next_page_url
          lastPostersPage.value = response.data.posters.last_page_url
          prevPostersPage.value = response.data.posters.prev_page_url
          postersTotalItems.value = response.data.posters.total
          postersFrom.value = response.data.posters.from
          postersTo.value = response.data.posters.to
          postersPagesLinks.value = []
          response.data.posters.links.forEach(link => {
            postersPagesLinks.value.push(link)
          })
        })
    })

    function postersChangePage(page) {
      $http.get(page)
        .then(response => {
          posters.value = []
          posters.value = response.data.posters.data
          nextPostersPage.value = response.data.posters.next_page_url
          lastPostersPage.value = response.data.posters.last_page_url
          prevPostersPage.value = response.data.posters.prev_page_url
          postersTotalItems.value = response.data.posters.total
          postersFrom.value = response.data.posters.from
          postersTo.value = response.data.posters.to
          postersPagesLinks.value = []
          response.data.posters.links.forEach(link => {
            postersPagesLinks.value.push(link)
          })
        })
    }

    const selectImage = (e) => {
      for (let index = 0; index < 1; index++) {
        if (e.target.files[index]) {
          addPosterImage.value = e.target.files[index]
        }
      }
    }

    return {
      sidebarOpen,
      userPermissions,

      nextPostersPage,
      prevPostersPage,
      lastPostersPage,
      postersPagesLinks,
      postersFrom,
      postersTo,
      postersTotalItems,
      postersSearch,

      posters,

      addPosterTitle,
      addPosterDescription,
      addPosterImage,
      addPosterLink,

      editPosterId,

      editPosterModal,
      addPosterModal,

      postersChangePage,
      // editMenu,

      createPoster,

      editPoster,

      updatePoster,

      moment,
      deletePoster,

      formatValue,
      selectImage,
    }
  }
}
</script>
<style>
.m_title:first-letter {text-transform: uppercase}
</style>
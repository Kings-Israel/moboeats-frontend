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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Frequenly Asked Questions ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <button v-if="userPermissions('add/edit frequently asked questions')" class="bg-[#F3C411] hover:bg-indigo-600 p-2 text-white font-semibold rounded-full px-3" @click="addFaqModal = true">Add FAQ</button>
                <modal-action v-if="userPermissions('add/edit frequently asked questions')" :id="'addMenu'" :modal-open="addFaqModal" @close-modal="addFaqModal = false" :add-class="'max-w-4xl'">
                  <p class="text-xl font-bold text-white">Add Frequently Asked Question</p>
                  <!-- Add/Edit Menu -->
                  <form class="flex flex-col justify-around" @submit.prevent="addFaq">
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Section</label>
                        <select id="title" class="form-input w-full rounded-lg" type="text" v-model="addSection">
                          <option value="">Select Section</option>
                          <option value="general">General</option>
                          <option value="customer">Customer</option>
                          <option value="partner">Partner</option>
                          <option value="rider">Rider</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Question</label>
                        <input id="description" class="form-input w-full rounded-lg" type="text" v-model="addQuestion" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Answer</label>
                        <input id="description" class="form-input w-full rounded-lg" type="text" v-model="addAnswer" />
                      </div>
                    </div>
                    <div class="flex justify-end bottom-2 mt-2">
                      <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                    </div>
                  </form>
                </modal-action>
              </div>
          </div>


          <!-- <div class="flex justify-between gap-2 mb-2">
            <form class="relative w-[40%]">
              <label for="action-search" class="">Search</label>
              <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full" type="search" v-model="discountSearch" placeholder="Search Menus" />
              <button class="absolute inset-0 top-6 right-auto group" type="submit" aria-label="Search">
                <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
            <button class="bg-red-500 text-white rounded-full h-fit w-[30%] py-1 my-auto" @click="search = ''">Clear Fields</button>
          </div> -->

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
                          <div class="font-semibold text-left">Section</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Question</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Answer</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Created On</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Action</div>
                        </th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium bg-slate-50 divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="faq in faqs.data" :key="faq.id" :class="faq.id === editfaqId ? 'bg-slate-300 transition duration-200 ease-in-out' : 'transition duration-300 ease-in-out'">
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold m_title">{{ faq.section }}</div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ faq.question }}</div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ faq.answer }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold">{{ moment(faq.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2 flex gap-1">
                          <div class="">
                            <button v-if="userPermissions('add/edit frequently asked questions')" class="bg-[#F3C411] text-white p-1 px-2 rounded-md" @click="showEditFaqModal(faq)">Edit</button>
                          </div>
                          <div class="">
                            <button v-if="userPermissions('add/edit frequently asked questions')" class="bg-red-400 text-white rounded-md p-1" @click="deleteFaq(faq.id)">Delete</button>
                          </div>
                        </td>
                        <modal-action :id="'addMenu'" :modal-open="editFaqModal" @close-modal="editFaqModal = false" :add-class="'max-w-4xl'">
                          <p class="text-xl font-bold text-white">Add Frequently Asked Question</p>
                          <!-- Add/Edit Menu -->
                          <form class="flex flex-col justify-around" @submit.prevent="updateFaq">
                            <div class="space-y-4">
                              <div>
                                <label class="block text-sm font-medium mb-1" for="price">Section</label>
                                <select id="title" class="form-input w-full rounded-lg" type="text" v-model="addSection">
                                  <option value="">Select Section</option>
                                  <option value="general" :selected="addSection == 'general'">General</option>
                                  <option value="customer" :selected="addSection == 'customer'">Customer</option>
                                  <option value="partner" :selected="addSection == 'partner'">Partner</option>
                                  <option value="rider" :selected="addSection == 'rider'">Rider</option>
                                </select>
                              </div>
                              <div>
                                <label class="block text-sm font-medium mb-1" for="price">Question</label>
                                <input id="description" class="form-input w-full rounded-lg" type="text" v-model="addQuestion" />
                              </div>
                              <div>
                                <label class="block text-sm font-medium mb-1" for="price">Answer</label>
                                <input id="description" class="form-input w-full rounded-lg" type="text" v-model="addAnswer" />
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
              <PaginationClassic @change-page="faqsChangePage" :next_page="faqs.next_page_url" :prev_page="faqs.prev_page_url" :from="faqs.from" :to="faqs.to" :total_items="faqs.total" />
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
import { formatValue, userPermissions } from '../../utils/Utils'
import { useToast } from 'vue-toastification'
import ModalAction from '../../components/ModalAction.vue'

export default {
  name: 'Faqs',
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
    const user_permissions = ref([])

    const faqs = ref([])

    const editfaqId = ref('')

    const addSection = ref('')
    const addQuestion = ref('')
    const addAnswer = ref('')

    const addFaqModal = ref(false)
    const editFaqModal = ref(false)

    let discountSearch = ref('')

    const getFaqs = () => {
      $http.get(`/frequently-asked-questions`)
        .then(response => {
          faqs.value = response.data.data.questions
          console.log(faqs.value)
        })
        .catch(error => {
          console.log(error)
        })
    }

    const showEditFaqModal = (faq) => {
      addSection.value = faq.section
      addQuestion.value = faq.question
      addAnswer.value = faq.answer
      editfaqId.value = faq.id
      editFaqModal.value = true
    }

    const addFaq = () => {
      $http.post('/frequently-asked-questions', {
        section: addSection.value,
        question: addQuestion.value,
        answer: addAnswer.value
      })
      .then(() => {
        addSection.value = ''
        addQuestion.value = ''
        addAnswer.value = ''
        toast.success('Faq added successfully')
        getFaqs()
      })
      .catch(err => {
        console.log(err)
      })
    }

    const updateFaq = () => {
      $http.put(`/frequently-asked-questions/${editfaqId.value}`, {
        section: addSection.value,
        question: addQuestion.value,
        answer: addAnswer.value
      })
      .then(() => {
        addSection.value = ''
        addQuestion.value = ''
        addAnswer.value = ''
        toast.success('Faq updated successfully')
        editFaqModal.value = false
        getFaqs()
      })
      .catch(err => {
        console.log(err)
      })
    }

    const deleteFaq = (faq) => {
      $http.delete(`/frequently-asked-questions/${faq}destroy`)
      .then(() => {
        toast.success('Faq deleted successfully')
        getFaqs()
      })
      .catch(err => {
        console.log(err)
      })
    }

    const exportPromocodes = () => {
      $http.get('/admin/discounts/export/data?search='+discountSearch.value,
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
            `Discounts.xlsx`,
          )
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(err => {
          console.log(err)
        })
    }

    onMounted(() => {
      getFaqs()
    })

    watch(discountSearch, async (newSearch, oldSearch) => {
      $http.get('/admin/discounts?search='+newSearch)
        .then(response => {
          
        })
    })

    function faqsChangePage(page) {
      $http.get(page)
        .then(response => {
          faqs.value = response.data.data.questions
        })
    }

    return {
      userPermissions,
      sidebarOpen,
      faqs,

      faqsChangePage,
      addFaq,
      updateFaq,
      deleteFaq,

      addSection,
      addQuestion,
      addAnswer,

      editfaqId,

      addFaqModal,
      editFaqModal,

      showEditFaqModal,

      moment,

      exportPromocodes,
    }
  }
}
</script>
<style>
.m_title::first-letter {
  text-transform: uppercase;
}
</style>
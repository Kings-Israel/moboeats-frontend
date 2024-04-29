<template>
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
            <tr v-for="category in categories" :key="category.id">
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
            <!-- <PaginationClassic @change-page="changePage" :next_page="nextPageUrl" :prev_page="prevPageUrl" :from="from" :to="to" :total_items="totalItems" /> -->
            <PaginationNumeric @change-page="changePage" :next_page="nextPageUrl" :prev_page="prevPageUrl" :from="from" :to="to" :total_items="totalItems" :links="pagesLinks" />
          </div>  
      </div>
    </div>
  </div>
  <div class="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-slate-200 dark:border-slate-700">
    <div class="p-3">
      <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">{{ action == 'create' ? 'Add' : 'Edit' }} Category</h1>
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
            <input type="file" name="addCategoryImage" accept=".png,.jpg" class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" v-on:change="onFileChange" id="">
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Submit</button>
        </div>
      </form>
    </div>
  </div>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">{{ sub_category_search.charAt(0).toUpperCase() + sub_category_search.slice(1) }} Categories</h2>
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
            <tr v-for="category in sub_categories" :key="category.id">
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
                <button class="btn btn-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" @click="editSubCategory(category)">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationClassic @change-page="changeSubPage" :next_page="nextSubPageUrl" :prev_page="prevSubPageUrl" :from="subFrom" :to="subTo" :total_items="subTotalItems" />
      </div>
    </div>
  </div>
  <div class="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-slate-200 dark:border-slate-700">
    <div class="p-3">
      <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">{{ sub_category_action == 'create' ? 'Add' : 'Edit' }} Grocery Category</h1>
      <!-- Form -->
      <form @submit.prevent="addSubCategory()" class="flex flex-col justify-evenly">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1" for="title">Title</label>
            <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addSubCategoryTitle" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="title">Description</label>
            <textarea name="addCategoryDescription" id="" class="form-input w-full min-h-full rounded-lg" rows="8" v-model="addSubCategoryDescription"></textarea>
          </div>
          <div>
            <label for="Image">Image</label>
            <input type="file" name="addSubCategoryImage" accept=".png,.jpg" class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" v-on:change="onSubcategoryFileChange" id="">
          </div>
          <div class="flex-none flex my-auto">
          <div class="m-3">
            <!-- Start -->
            <label class="flex items-center">
              <input type="radio" name="menu-active" v-model="addSubCategoryStatus" value="2" class="form-radio" />
              <span class="text-sm ml-2">Active</span>
            </label>
            <!-- End -->
          </div>

          <div class="m-3">
            <!-- Start -->
            <label class="flex items-center">
              <input type="radio" name="menu-active" v-model="addSubCategoryStatus" value="1" class="form-radio" />
              <span class="text-sm ml-2">Inactive</span>
            </label>
            <!-- End -->
          </div>
        </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { ref, inject, onMounted } from 'vue';
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import { useToast } from 'vue-toastification'
export default {
  name: 'Categories,',
  components: {
    PaginationClassic,
    PaginationNumeric,
  },
  setup() {
    const $http = inject('$http')
    const toast = useToast()
    const categories = ref([])
    const addCategoryTitle = ref('')
    const addCategoryDescription = ref('')
    const addCategoryImage = ref(null)
    const nextPageUrl = ref('')
    const lastPageUrl = ref('')
    const prevPageUrl = ref('')
    const pagesLinks = ref([])
    const from = ref(0)
    const to = ref(0)
    const totalItems = ref(0)

    const nextSubPageUrl = ref('')
    const lastSubPageUrl = ref('')
    const prevSubPageUrl = ref('')
    const subPagesLinks = ref([])
    const subFrom = ref(0)
    const subTo = ref(0)
    const subTotalItems = ref(0)

    const action = ref('create')
    const sub_category_action = ref('create')
    const category_id = ref('')

    const sub_categories = ref([])
    const sub_category_id = ref('')

    const sub_category_category_id = ref('')

    const addSubCategoryTitle = ref('')
    const addSubCategoryDescription = ref('')
    const addSubCategoryStatus = ref('2')
    const addSubCategoryImage = ref(null)

    const sub_category_search = ref('Groceries')

    const addCategory = () => {
      const formData = new FormData()
      formData.append('title', addCategoryTitle.value)
      formData.append('image', addCategoryImage.value)
      formData.append('description', addCategoryDescription.value)
      if (action.value == 'create') {
        $http.post('/admin/categories/add', formData)
          .then(() => {
            getCategories()
          })
          .catch(error => {
            console.log(error)
            toast.error('An error occurred while adding the category')
          })
      } else if (action.value == 'edit') {
        $http.post('/admin/categories/update/'+category_id.value, formData)
          .then(() => {
            getCategories()
          })
          .catch(error => {
            console.log(error)
            toast.error('An error occurred while updating the category')
          })
      }
    }

    const addSubCategory = () => {
      const formData = new FormData()
      formData.append('title', addSubCategoryTitle.value)
      formData.append('description', addSubCategoryDescription.value)
      formData.append('status', addSubCategoryStatus.value)
      formData.append('image', addSubCategoryImage.value)
      if (sub_category_action.value == 'create') {
        formData.append('category_id', sub_category_category_id.value)
        $http.post('/admin/sub-categories/add', formData)
          .then(() => {
            getCategories()
            addSubCategoryTitle.value = ''
            addSubCategoryDescription.value = ''
            addSubCategoryImage.value = null
            sub_category_action.value = 'create'
            toast.success('Sub Category added')
          })
          .catch(error => {
            console.log(error)
            toast.error('An error occurred while adding the category')
          })
      } else if (sub_category_action.value == 'edit') {
        $http.post('/admin/sub-categories/update/'+sub_category_id.value, formData)
          .then(() => {
            getCategories()
            addSubCategoryTitle.value = ''
            addSubCategoryDescription.value = ''
            sub_category_action.value = 'create'
            toast.success('Sub Category added')
          })
          .catch(error => {
            console.log(error)
            toast.error('An error occurred while updating the sub category')
          })
      }
    }

    const editCategory = (category) => {
      addCategoryTitle.value = category.title
      addCategoryDescription.value = category.description
      category_id.value = category.id
      action.value = 'edit'
    }

    const editSubCategory = (category) => {
      addSubCategoryTitle.value = category.title
      addSubCategoryDescription.value = category.description
      addSubCategoryStatus.value = category.status
      sub_category_id.value = category.id
      sub_category_action.value = 'edit'
    }

    const getCategories = () => {
      $http.get('/admin/categories')
        .then(response => {
          categories.value = []
          pagesLinks.value = []
          categories.value = response.data.data.data
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          response.data.data.links.forEach(link => {
            pagesLinks.value.push(link)
          })
          getSubCategories()
        })
        .catch(error => {
          console.log(error)
        })
    }

    const getSubCategories = () => {
      $http.get('/admin/sub-categories?search='+sub_category_search.value)
        .then(response => {
          categories.value.forEach(cat => {
            if (cat.title.toLowerCase() == sub_category_search.value.toLowerCase()) {
              sub_category_category_id.value = cat.id
            }
          })
          sub_categories.value = []
          subPagesLinks.value = []
          sub_categories.value = response.data.data.data
          nextSubPageUrl.value = response.data.data.next_page_url
          lastSubPageUrl.value = response.data.data.last_page_url
          prevSubPageUrl.value = response.data.data.prev_page_url
          subFrom.value = response.data.data.from
          subTo.value = response.data.data.to
          subTotalItems.value = response.data.data.total
          response.data.data.links.forEach(link => {
            subPagesLinks.value.push(link)
          })
        })
        .catch(error => {
          console.log(error)
        });
    }

    onMounted(() => {
      getCategories()
    })

    function changePage(page) {
      $http.get(page)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          categories.value = []
          pagesLinks.value = []
          response.data.data.links.forEach(link => {
            pagesLinks.value.push(link)
          })
          categories.value = response.data.data.data
        })
    }

    function changeSubPage(page) {
      $http.get(page+'&search='+sub_category_search.value)
        .then(response => {
          sub_categories.value = []
          subPagesLinks.value = []
          sub_categories.value = response.data.data.data
          nextSubPageUrl.value = response.data.data.next_page_url
          lastSubPageUrl.value = response.data.data.last_page_url
          prevSubPageUrl.value = response.data.data.prev_page_url
          subFrom.value = response.data.data.from
          subTo.value = response.data.data.to
          subTotalItems.value = response.data.data.total
          response.data.data.links.forEach(link => {
            subPagesLinks.value.push(link)
          })
        })
    }

    const onFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      addCategoryImage.value = files[0];
    }

    const onSubcategoryFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return
      }
      addSubCategoryImage.value = files[0];
    }

    return {
      moment,
      categories,
      addCategoryTitle,
      addCategoryDescription,
      addCategoryImage,
      categories,
      addCategory,
      editCategory,
      nextPageUrl,
      prevPageUrl,
      lastPageUrl,
      totalItems,
      from,
      to,
      pagesLinks,
      changePage,
      action,
      onFileChange,
      onSubcategoryFileChange,

      nextSubPageUrl,
      lastSubPageUrl,
      prevSubPageUrl,
      subPagesLinks,
      subFrom,
      subTo,
      subTotalItems,

      sub_category_action,
      
      sub_categories,
      addSubCategoryTitle,
      addSubCategoryDescription,
      addSubCategoryStatus,
      editSubCategory,
      addSubCategory,
      changeSubPage,

      sub_category_search,
    }
  }
}
</script>
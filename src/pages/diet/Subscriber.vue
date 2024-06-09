<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow" v-if="user">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-4">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{{ user.name }} ✨</h1>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="flex gap-1">
              <span class="font-bold my-auto">Subscription Status:</span>
              <span class="uppercase font-semibold" v-if="user.diet_subscriptions && user.diet_subscriptions.length > 0" :class="user.diet_subscriptions[0].status == 'pending' ? 'bg-red-600 text-white px-2 py-1 rounded-md' : 'bg-emerald-400 text-white px-2 py-1 rounded-md'">{{ user.diet_subscriptions[0].status }}</span>
            </div>
          </div>
          <span class="font-bold mt-4">User Data:</span>
          <div class="flex gap-2 mt-1">
            <div>
              <span class="font-bold">Height: </span>
              <span>{{ user.height }} {{ user.height_units }}</span>
            </div>
            <div>
              <span class="font-bold">Weight: </span>
              <span>{{ user.weight }} {{ user.weight_units }}</span>
            </div>
            <div>
              <span class="font-bold">Body Mass Index: </span>
              <span>{{ user.body_mass_index }}</span>
            </div>
          </div>
          <div class="flex gap-2 mt-4">
            <div class="flex gap-1">
              <span class="font-bold my-auto">Subscription Start Date:</span>
              <span class="font-semibold my-auto" v-if="user.diet_subscriptions && user.diet_subscriptions.length > 0">{{ moment(user.diet_subscriptions[0].start_date).format('DD MMM YYYY') }}</span>
            </div>
            <div class="flex gap-1">
              <span class="font-bold my-auto">Subscription End Date:</span>
              <span class="font-semibold my-auto" v-if="user.diet_subscriptions && user.diet_subscriptions.length > 0">{{ moment(user.diet_subscriptions[0].end_date).format('DD MMM YYYY') }}</span>
            </div>
          </div>
          <div class="flex gap-4 mt-4">
            <span class="uppercase font-bold col-span-3">Diet Plans</span>
            <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white w-fit" @click="addDietPlan = true">Add Plan</button>
            <modal-action :id="'addAdmin'" :modal-open="addDietPlan" @close-modal="addDietPlan = false" :add-class="'max-w-4xl'">
              <p class="text-xl font-bold text-white">Add Diet Plan</p>
              <!-- Add/Edit Menu -->
              <form class="flex flex-col justify-around" @submit.prevent="storeDietPlan">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="price">Date</label>
                    <input id="title" class="form-input w-full rounded-lg" type="date" v-model="date" />
                  </div>
                  <div v-for="(type) in meal_types" :key="type">
                    <label class="block text-sm font-medium mb-1" for="price">{{ type }}</label>
                    <input id="title" class="form-input w-full rounded-lg" type="text" v-model="meals[type]" />
                  </div>
                </div>
                <div class="flex justify-end bottom-2 mt-2">
                  <button type="submit" class="btn bg-[#1c2e2a] rounded-xl hover:bg-[#6a6d2b] text-white">Submit</button>
                </div>
              </form>
            </modal-action>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-4">
            <div class="col-span-full xl:col-span-4" v-for="(plan, key) in user.dietPlans" :key="key">
              <div class="bg-slate-200 p-4 rounded-lg">
                <span class="underline font-semibold">{{ moment(key).format('DD MMM YYYY') }} Meal Plan</span>
                <div v-for="meal in plan" :key="meal.id" class="flex gap-3">
                  <span>{{ meal.type }}:</span>
                  <span class="font-bold">{{ meal.meal }}</span>
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

export default {
  name: 'Subscriber',
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

    const user = ref({})
    const plans = ref({})

    const date = ref('')
    const meal_types = ref(['Breakfast', 'Lunch', 'Dinner'])
    const type = ref([])
    const meals = ref([])

    const addDietPlan = ref(false)

    const getSubscriber = async () => {
      let url = '/admin/diet/plans/subscribers/'+router.params.id+'/details'
      await $http.get(url)
        .then(response => {
          user.value = response.data.data
        })
    }

    const storeDietPlan = () => {
      const formData = new FormData()
      formData.append('user_id', user.value.id)
      formData.append('date', date.value)
      Object.values(meals.value).forEach((value, key) =>  {
        formData.append('meals['+Object.keys(meals.value)[key]+']', value)
      })
      $http.post('/admin/diet/plans/store', formData)
        .then(() => {
          getSubscriber()
          toast.success('Diet plan added successfully')
          date.value = ''
          meals.value = []
        })
        .catch(error => {
          console.log(error.message)
        });
    }

    onMounted(() => {
      getSubscriber()
    })

    return {
      moment,
      sidebarOpen,
      date,
      meal_types,
      type,
      meals,
      addDietPlan,
      user,
      plans,
      storeDietPlan,
    }  
  }
}
</script>
<template>
  <main class="bg-[#2E5945]">

    <div class="">

      <!-- Content -->
      <div class="w-full">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">

          <div class="flex-1">
            <div class="flex items-center justify-center h-16 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="flex gap-4" to="/">
                <img
                  src="../images/1024.png"
                  class="object-contain w-24 pt-8"
                  alt=""
                />
              </router-link>
            </div>
          </div>          

          <div class="mx-auto w-full lg:w-[40%] px-4 py-2 bg-gray-100 rounded-lg">
            <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">{{ status == 'create' ? Enter : 'Update' }} Operating Hours! ✨</h1>
            <!-- Form -->
            <form @submit.prevent="onSubmit">
              <div class="space-y-4">
                <div v-for="(day, index) in week_days" :key="day" class="flex gap-3">
                  <span class="font-semibold w-24 flex-auto">{{ day }}</span>
                  <input class="w-full rounded-md border-2 border-slate-400" type="hidden" disabled v-model="days[day]" />
                  <div class="w-64 flex-auto flex gap-3">
                    <input class="w-full rounded-md border-2 border-slate-400 text-slate-800" type="time" v-model="opening_times[index]" />
                    <input class="w-full rounded-md border-2 border-slate-400 text-slate-800" type="time" v-model="closing_times[index]" />
                  </div>
                  <div class="hidden md:flex md:flex-none my-auto">
                    <div class="form-switch">
                      <input type="checkbox" :id="day" class="sr-only" v-model="closed_days[day]" true-value="On" false-value="Off" />
                      <label class="bg-slate-400 dark:bg-slate-700" :for="day">
                        <span class="bg-white shadow-sm" aria-hidden="true"></span>
                        <span class="sr-only">Toggle</span>
                      </label>
                    </div>
                    <div class="text-sm text-slate-400 dark:text-slate-500 italic ml-2 my-auto">Closed</div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end gap-2 mt-6">
                <router-link v-if="status == 'update'" class="btn bg-red-800 hover:bg-red-900 text-white" :to="{ name: 'dashboard' }">Cancel</router-link>
                <button type="submit" class="btn bg-[#2E5945] hover:bg-indigo-600 text-white ml-3">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Signin',
  setup() {
    const $http = inject("$http")
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()
    const week_days = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    const days = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    const opening_times = ref([])
    const closing_times = ref([])
    const closed_days = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])

    const status = ref('create')

    const operating_hours = ref([])

    const onSubmit = () => {
      const formData = new FormData()
      formData.append('days', JSON.stringify(days.value))
      formData.append('opening_times', JSON.stringify(opening_times.value))
      formData.append('closing_times', JSON.stringify(closing_times.value))
      $http.post(`/restaurant/${route.params.uuid}/operating-hours/update`, formData)
        .then(response => {
          router.push({ name: 'restaurant-details', params: { id: route.params.uuid }})
          toast.success('Operating Hours Updated Successfully')
        })
        .catch(error => {
          console.error(error.response.data.message)
        })
      // if (status.value == 'create') {
      //   $http.post(`/restaurant/${route.params.uuid}/operating-hours`, formData)
      //     .then(() => {
      //       router.push({name: 'add-documents', params: { uuid: route.params.uuid }})
      //       toast.success('Info saved')
      //     })
      //     .catch(error => {
      //       toast.error(error.response.data.message)
      //     })
      // } else {
      //   $http.post(`/restaurant/${route.params.uuid}/operating-hours/update`, formData)
      //     .then(response => {
      //       router.push({ name: 'restaurant-details', params: { id: route.params.uuid }})
      //       toast.success('Operating Hours Updated Successfully')
      //     })
      //     .catch(error => {
      //       console.error(error.response.data.message)
      //     })
      // }
    }

    onMounted(() => {
      $http.get(`/restaurant/restaurants/${route.params.uuid}`)
        .then(response => {
          if (response.data.data.relationships.operating_hours.length > 0) {
            operating_hours.value = response.data.data.relationships.operating_hours
            operating_hours.value.forEach(hours => {
              week_days.value.forEach((day, index) => {
                if (day === hours.day) {
                  opening_times.value[index] = hours.opening_time
                  closing_times.value[index] = hours.closing_time
                }
              })
            })
            status.value = 'update'
          }
        })
    })

    return {
      onSubmit,

      week_days,
      closed_days,

      days,
      opening_times,
      closing_times,

      status,
      operating_hours,
    }
  }
}
</script>
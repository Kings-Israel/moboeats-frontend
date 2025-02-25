<template>
  <main class="bg-[#2E5945]">

    <div class="">
      <!-- Content -->
      <div class="w-full">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">

          <div class="flex-1">
            <div class="flex items-center justify-center h-24 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="flex gap-4" to="/">
                <img
                  src="../../images/1024.png"
                  class="object-contain w-24 pt-2"
                  alt=""
                />
              </router-link>
            </div>
          </div>

          <div class="rounded-md lg:px-4 py-2 bg-gray-100 mx-4 lg:mx-32">
            <h1 v-if="status == 'update'" class="px-2 lg:px-0 text-xl text-slate-800 dark:text-slate-100 font-bold mb-6">Edit Details ✨</h1>
            <h1 v-else class="px-2 lg:px-0 text-xl text-slate-800 dark:text-slate-100 font-bold mb-6">Add Details ✨</h1>
            <h3 class="px-2 lg:px-0 text-xl text-slate-700 font-bold my-2">Partner Details</h3>
            <!-- Form -->
            <form class="" @submit.prevent="onSubmit">
              <div class="px-2 lg:px-0 lg:flex gap-10">
                <div class="w-full lg:w-1/2 space-y-4">
                  <div class="md:flex gap-2">
                    <div class="basis-1/2">
                      <label class="block text-sm font-medium mb-1" for="restaurant_name">Partner Name <span class="text-rose-500">*</span></label>
                      <input id="restaurant_name" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="text" v-model="name" />
                    </div>
                    <div class="basis-1/2">
                      <label class="block text-sm font-medium mb-1" for="restaurant_name">Shortened Name</label>
                      <input id="restaurant_name" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="text" v-model="name_short" />
                    </div>
                  </div>
                  <div class="md:flex gap-2">
                    <div class="basis-1/2">
                      <label class="block text-sm font-medium mb-1" for="email">Partner/Business Email Address <span class="text-rose-500">*</span></label>
                      <input id="email" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="email" v-model="email" />
                    </div>
                    <div class="basis-1/2">
                      <label class="block text-sm font-medium mb-1" for="phone_number">Partner/Business Phone Number <span class="text-rose-500">*</span></label>
                      <input id="phone_number" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="tel" v-model="phone_number" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="profile_picture">Logo</label>
                    <input id="profile_picture" accept=".jpg,.png,.jpeg" v-on:change="onFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" autoComplete="on" />
                  </div>
                  <div class="md:flex gap-2">
                    <div class="basis-1/2">
                      <label class="block text-sm font-medium mb-1" for="restaurant_name">State </label>
                      <input id="restaurant_name" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="text" v-model="state" />
                    </div>
                    <div class="basis-1/2">
                      <label class="block text-sm font-medium mb-1" for="restaurant_name">Postal Code</label>
                      <input id="restaurant_name" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="text" v-model="postal_code" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="restaurant_name">About </label>
                    <textarea id="restaurant_name" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="text" v-model="about"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="restaurant_name">Short Description </label>
                    <textarea id="restaurant_name" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="text" v-model="about_short"></textarea>
                  </div>
                </div>
                <div class="w-full lg:w-1/2 space-y-4">
                  <div class="flex gap-2">
                    <label class="block text-sm font-medium mb-1" for="restaurant_name">Do you offer dine-in services?</label>
                    <!-- <input id="restaurant_name" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="number" min="0" v-model="sitting_capacity" /> -->
                    <div class="flex-none flex my-auto">
                      <div class="px-3">
                        <!-- Start -->
                        <label class="flex items-center">
                          <input type="radio" name="menu-active" v-model="offers_dine_in" value="yes" class="form-radio" />
                          <span class="text-sm font-bold ml-2">Yes</span>
                        </label>
                        <!-- End -->
                      </div>
      
                      <div class="px-3">
                        <!-- Start -->
                        <label class="flex items-center">
                          <input type="radio" name="menu-active" v-model="offers_dine_in" value="no" class="form-radio" />
                          <span class="text-sm font-bold ml-2">No</span>
                        </label>
                        <!-- End -->
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="email">Have a website? Enter URL</label>
                    <input id="email" class="w-full rounded-md border-2 border-slate-400 text-slate-900" type="text" v-model="website_url" />
                  </div>
                  <div class="px-2">
                    <label class="block text-sm font-medium mb-1" for="name">Location <span class="text-rose-500">*</span></label>
                    <GMapAutocomplete
                      class="w-full border-2 border-slate-400 py-2 my-1 px-2 rounded-md text-slate-900"
                      placeholder="Search Location"
                      @place_changed="setPlace"
                    >
                    </GMapAutocomplete>
                    <GMapMap
                      ref="mapRef"
                      :center="center"
                      :zoom="zoom"
                      @click="setPlace"
                      :options="{
                        fullscreenControl: false,
                      }"
                      map-type-id="terrain"
                    >
                      <GMapMarker
                        v-for="(m, index) in marker"
                        :key="index"
                        :position="m.position"
                      />
                    </GMapMap>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-end mt-6 mx-2 lg:mx-0">
                <router-link v-if="status == 'update'" class="btn bg-red-600 text-white" :to="{ name: 'restaurant-details', params: { id: restaurant.uuid }}">Cancel</router-link>
                <button class="btn bg-[#2E5945] hover:bg-indigo-600 text-white ml-3 whitespace-nowrap" ref="submit_button" type="submit">{{ status == 'create' ? 'Create' : 'Update' }}</button>
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
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  name: 'Signup',
  setup() {
    const $http = inject("$http")
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()

    const name = ref('')
    const name_short = ref('')
    const about = ref('')
    const about_short = ref('')
    const email = ref('')
    const phone_number = ref('')
    const state = ref('')
    const address = ref('')
    const postal_code = ref('')
    const website_url = ref('')
    const sitting_capacity = ref(0)
    const logo = ref('')
    const place_id = ref('')
    const latitude = ref('')
    const longitude = ref('')
    const map_location = ref('')
    const zoom = ref(7)
    const center = ref({lat: 51.093048, lng: 6.842120})
    const marker = ref([])
    const paypal_email = ref('')
    const offers_dine_in = ref('yes')

    const mapRef = ref(null)

    const status = ref('create')

    const restaurant = ref(null)

    const submit_button = ref(null)

    const onSubmit = () => {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('name_short', name_short.value)
      formData.append('email', email.value)
      formData.append('about_short', about_short.value)
      formData.append('about', about.value)
      formData.append('phone_no', phone_number.value)
      formData.append('address', address.value)
      formData.append('state', state.value)
      formData.append('postal_code', postal_code.value)
      formData.append('place_id', place_id.value)
      formData.append('latitude', latitude.value)
      formData.append('longitude', longitude.value)
      formData.append('url', website_url.value)
      formData.append('map_location', map_location.value)
      formData.append('sitting_capacity', sitting_capacity.value)
      formData.append('paypal_email', paypal_email.value)
      formData.append('logo', logo.value)

      submit_button.value.innerHTML = status.value == 'create' ? 'Creating...' : 'Updating...'
      submit_button.value.setAttribute('disabled', 'disabled')

      if (status.value == 'create') {
        $http.post('/restaurant/restaurant', formData)
          .then(response => {
            if (offers_dine_in.value == 'yes') {
              router.push({ name: 'add-restaurant-tables', params: { uuid: response.data.data.uuid }})
            } else {
              router.push({ name: 'add-operating-hours', params: { uuid: response.data.data.uuid }})
            }
            toast.success('Restaurant created successfully')
          })
          .catch(error => {
            toast.error(error.response.data.message)
          })
          .finally(() => {
            submit_button.value.innerHTML = 'Create'
            submit_button.value.removeAttribute('disabled')
          })
      } else {
        $http.post(`/admin/restaurants/${restaurant.value.uuid}/update`, formData)
          .then(response => {
            router.push({ name: 'restaurant-details', params: { id: restaurant.value.uuid }})
            toast.success('Restaurant details updated successfully')
          })
          .catch(error => {
            console.log(error.response)
            toast.error(error.response.data.message)
          })
          .finally(() => {
            submit_button.value.innerHTML = 'Create'
            submit_button.value.removeAttribute('disabled')
          })
      }
    }

    onMounted(() => {
      if (route.params.id) {
        $http.get('/restaurant/restaurants/'+route.params.id)
          .then(response => {
            restaurant.value = response.data.data
            name.value = restaurant.value.attributes.name
            name_short.value = restaurant.value.attributes.nameShort
            about.value = restaurant.value.attributes.about
            about_short.value = restaurant.value.attributes.aboutShort
            email.value = restaurant.value.attributes.email
            phone_number.value = restaurant.value.attributes.phoneNo
            state.value = restaurant.value.attributes.state
            address.value = restaurant.value.attributes.address
            postal_code.value = restaurant.value.attributes.postalCode
            website_url.value = restaurant.value.attributes.url
            sitting_capacity.value = restaurant.value.attributes.sitting_capacity
            latitude.value = restaurant.value.attributes.latitude
            longitude.value = restaurant.value.attributes.longitude
            map_location.value = restaurant.value.attributes.mapLocation
            paypal_email.value = restaurant.value.attributes.paypal_email
            if (restaurant.value.attributes.latitude && restaurant.value.attributes.longitude) {
              center.value = {lat: Number(restaurant.value.attributes.latitude), lng: Number(restaurant.value.attributes.longitude)}
              marker.value.push({ position: { lat: Number(restaurant.value.attributes.latitude), lng: Number(restaurant.value.attributes.longitude) } })
              zoom.value = 16
            }
            status.value = 'update'
          })
      } else {
        const successCallback = (position) => {
          center.value = {lat: Number(position.coords.latitude), lng: Number(position.coords.longitude)}
          marker.value.push({ position: { lat: Number(position.coords.latitude), lng: Number(position.coords.longitude) } })
          zoom.value = 16
        };
  
        const errorCallback = (error) => {
          console.log(error);
        };
  
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      }
    })

    const onFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      logo.value = files[0];
    }

    const setPlace = (e) => {
      latitude.value = e.geometry.location.lat()
      longitude.value = e.geometry.location.lng()
      place_id.value = e.place_id
      map_location.value = e.url
      address.value = e.formatted_address
      zoom.value = 18
      center.value = {lat: e.geometry.location.lat(), lng: e.geometry.location.lng()}
      marker.value = []
      marker.value.push({ position: { lat: e.geometry.location.lat(), lng: e.geometry.location.lng() } })
    }

    const logout = () => {
      $http.post('/logout')
        .then(() => {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          router.push({ name: 'auth-login' })
        })
        .catch(error => {
          toast.error(error.response.data.data)
        })
    }

    return  {
      name,
      name_short,
      email,
      about,
      about_short,
      phone_number,
      state,
      postal_code,
      sitting_capacity,
      website_url,
      paypal_email,
      offers_dine_in,
      onFileChange,
      setPlace,
      center,
      onSubmit,

      mapRef,
      zoom,
      marker,

      restaurant,
      status,
      logout,
      submit_button,
    }
  }
}
</script>

<style scoped>
.vue-map-container {
  height: 320px;
}
</style>
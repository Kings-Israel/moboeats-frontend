import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import './css/style.css'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import VueGoogleMaps from '@fawmi/vue-google-maps'

// import '@axios'
import axiosIns from './api/axios'

import moment from 'moment'

const app = createApp(App)
app.use(router)
app.use(Toast)
app.use('moment', moment)
app.provide('$http', axiosIns)
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCisnVFSnc5QVfU2Jm2W3oRLqMDrKwOEoM',
    libraries: "places"
  },
})
app.mount('#app')

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import './css/style.css'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

// import '@axios'
import axiosIns from './api/axios'

const app = createApp(App)
app.use(router)
app.use(Toast)
app.provide('$http', axiosIns)
app.mount('#app')

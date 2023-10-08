import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import './css/style.css'

// import '@axios'
import axiosIns from './api/axios'

const app = createApp(App)
app.use(router)
app.provide('$http', axiosIns)
app.mount('#app')

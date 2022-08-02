import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'

import axios from 'axios'
import FontAwesomeIcon from "./assets/fontawesome"

const httpClient = axios.create({
   baseURL: 'http://localhost:8000/'
})

const app = createApp(App)

app.config.globalProperties.$http = httpClient

app.component("FontAwesomeIcon", FontAwesomeIcon)

app.use(router)

app.mount('body')

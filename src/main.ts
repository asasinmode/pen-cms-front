import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'

import axios from 'axios'
import FontAwesomeIcon from "./plugins/fontawesome"
import shake from './plugins/shake'

const httpClient = axios.create({
   baseURL: 'http://localhost:8000/'
})

const app = createApp(App)

app.config.globalProperties.$http = httpClient
app.config.globalProperties.$shake = shake

app.component("FontAwesomeIcon", FontAwesomeIcon)

app.use(router)

app.mount('body')

import { createApp } from 'vue'
import routes from 'virtual:generated-pages'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './style.css'
import { fetchData } from './logic/state'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.mount('#app')

fetchData()

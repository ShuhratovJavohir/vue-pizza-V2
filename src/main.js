import { createApp } from "vue";
import "@/assets/scss/app.scss";
import App from "./App.vue";
import roters from './router/index'
import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(roters)
app.mount('#app')

import { createApp } from 'vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import App from './App.vue'

const app = createApp(App)

app.use(PerfectScrollbar)

app.mount('#app')

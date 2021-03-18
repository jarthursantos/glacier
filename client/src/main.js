import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
// import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'

import { createApp } from 'vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
// import VueVirtualScroller from 'vue3-virtual-scroller'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(PerfectScrollbar)
// app.use(VueVirtualScroller)

app.mount('#app')

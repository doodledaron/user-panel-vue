import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

// Router
import MainView from './view/MainView.vue'
import SignUpOrLogin from './view/SignUpOrLogin.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const pinia = createPinia()

const routes = [
    { path: '/', component: SignUpOrLogin },
    { path: '/main-view', component: MainView,  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(vuetify)
app.use(pinia)
app.use(router)
app.mount('#app')
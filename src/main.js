import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

import axios from 'axios'
import VueAxios from 'vue-axios'

const pinia = createPinia()

createApp(App).use(router).use(VueAxios, axios).use(pinia).mount('#app')
 
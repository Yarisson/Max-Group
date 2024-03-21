import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/MainPage.vue'
import List from '../views/ListPage.vue'
import Details from '../views/DetailsPage.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/details',
    name: 'details',
    component: Details
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

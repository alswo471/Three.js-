import { createRouter, createWebHistory } from 'vue-router'
import TEST from '../views/testView.vue'
import TEST2 from '../views/testView2.vue'

const routes = [
  {
    path: '/test',
    name: 'test',
    component: TEST
  },

  {
    path: '/test2',
    name: 'test2',
    component: TEST2
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

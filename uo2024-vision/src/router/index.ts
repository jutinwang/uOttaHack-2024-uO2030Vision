import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RoomsView from '../views/RoomsView.vue'
import Sign_in from '@/views/Sign_in.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/roomTypes',
    name: 'RoomTypes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RoomTypes.vue')
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: RoomsView
  },
  {
    path: '/',
    name: 'Sign In',
    component: Sign_in
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

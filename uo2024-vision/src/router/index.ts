import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoomsView from '../views/RoomsView.vue'

const routes: Array<RouteRecordRaw> = [
  
  {
    path: '/',
    name: 'SignIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Sign_in.vue')
  },
  {
    path: '/roomTypes',
    name: 'RoomTypes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RoomTypes.vue')
  },

  {
    path: '/roomDetails:roomID',
    name: 'RoomDetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InsideRoomView.vue')
  },
  {
    path: '/rooms:id',
    name: 'rooms',
    component: RoomsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

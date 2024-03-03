import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RoomsView from '../views/RoomsView.vue'
import Sign_in from '@/views/Sign_in.vue'

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
    path: '/testChat',
    name: 'TestChat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/testChat.vue')
  },

  {
    path: '/aiTutor',
    name: 'AITutor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AITutor.vue')
  },
  {
    path: '/rooms:id',
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

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RoomsView from '../views/RoomsView.vue'
import Sign_in from '@/views/Sign_in.vue'
import { getUserState } from '@/main'

const routes: Array<RouteRecordRaw> = [
  
  {
    path: '/',
    name: 'SignIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Sign_in.vue'),
    meta: {requiresUnauth: true}
  },
  {
    path: '/roomTypes',
    name: 'RoomTypes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RoomTypes.vue'),
    meta: {requiresAuth: true}
  },

  {
    path: '/roomDetails:roomID',
    name: 'RoomDetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InsideRoomView.vue'),
    meta: {requiresAuth: true}

  },

  {
    path: '/testChat',
    name: 'TestChat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/testChat.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/rooms:id',
    name: 'rooms',
    component: RoomsView,
    meta: {requiresAuth: true}
  },
  {
    path: '/',
    name: 'Sign In',
    component: Sign_in,
    meta: {requiresAuth: true}
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from, next)=>{
  const isAuth =await getUserState()
  const requiresAuth = to.matched.some(record=>record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record=>record.meta.requiresUnauth)

  if (requiresAuth && !isAuth)next('/')
  else next()
})


export default router

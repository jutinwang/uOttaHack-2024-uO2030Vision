import { computed, createApp, onMounted, onUnmounted, ref } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'



import {initializeApp} from 'firebase/app'
import firebase from 'firebase/app'
import { Unsubscribe, User, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig ={
  apiKey: "AIzaSyA7KF8H0hVMTADN1zXS0aszunvdpAoSAHs",
  authDomain: "uo2030-vison.firebaseapp.com",
  projectId: "uo2030-vison",
  storageBucket: "uo2030-vison.appspot.com",
  messagingSenderId: "886316066259",
  appId: "1:886316066259:web:5f7d5770220677d9db3b26",
  measurementId: "G-10E25RCFBP"
}

const app = initializeApp(firebaseConfig);


export const useAuthState = () =>{
  const user = ref<User | null>(null);
  const error = ref<Error | null>(null);

  const auth =getAuth()
  let unsubscribe: Unsubscribe
  onMounted(()=>{
    unsubscribe = onAuthStateChanged(
      auth, 
      u => (user.value= u), 
      e => (error.value = e)
    )
  })
  onUnmounted(() => unsubscribe())
  
  const isAuthenticated = computed(()=>user.value != null)

  return {user, error, isAuthenticated}
}

export const getUserState = () =>
  new Promise((resolve, reject)=> 
    onAuthStateChanged(getAuth(), resolve, reject)
)

createApp(App).use(store).use(router).mount('#app')

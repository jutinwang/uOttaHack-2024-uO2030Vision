import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'



import {initializeApp} from 'firebase/app'
import firebase from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
const auth = getAuth();


/*
const email = "jsnel041@uottawa.ca"
const password = "Snelly.8217"

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
*/
createApp(App).use(store).use(router).mount('#app')

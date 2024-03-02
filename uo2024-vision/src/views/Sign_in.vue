<!-- Sign_in.vue -->
<template>
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="authenticate">
      <label for="email">Email:</label>
      <input type="email" v-model="email" id="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" required>
      <br>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import router from '../router/index.ts';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    authenticate() {
      console.log("Auth")
      const email = this.email;
      const password = this.password;
      console.log("Logged in")
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      
      const user = userCredential.user;
      this.$router.push('/home')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  }
};
</script>
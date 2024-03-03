
<template>
  <body class="blue-tint-bg"></body>
  <div class="signin-container">
    <h2 id="phallus">SIGN IN</h2>
    <form @submit.prevent="authenticate" class="signin-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <button type="submit" class="signin-button">Sign In</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import router from '../router/index.ts';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  /*
  methods: {
    authenticate() {
      const email = this.email;
      const password = this.password;
      const auth = getAuth()
      

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.$router.push('/roomTypes');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const e= error.value; 
          
        });
    }
  }*/
  setup() {
    const auth = getAuth()

    const authenticate = async e => {
      const{email, password} =e.target.elements
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        router.push('/roomTypes')
      }
      catch (e){
        alert(e.message)
      }
    }
    return {authenticate}
  }
};
</script>
<style lang="scss">
.signin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('../assets/n.jpg');
  background-size: cover;
  background-color: #9EB8D9; /* Fallback color */
  background-blend-mode: multiply; /* Apply tint */
}

h2#phallus{
  font-weight: 200;
  color: white;
}

.signin-form {
  max-width: 300px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* New CSS rule for blue tint background */

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.signin-button {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.signin-button:hover {
  background-color: #217dbb;
}
</style>
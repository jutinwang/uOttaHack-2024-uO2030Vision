<template>
    <div class="accountWrapper">
      <div class="account-view">
        <h2>Account Information</h2>
        <div v-if="user">
          <img :src="user.profilePic" alt="Profile Picture" class="profile-pic" />
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Name:</strong> {{ user.name }}</p>
        </div>
        <div v-else>
          <p>User not found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        userId: 1, // You can set the user ID dynamically based on your requirements
        user: null,
      };
    },
    mounted() {
      // Fetch user data based on the user ID
      this.fetchUserData();
    },
    methods: {
      fetchUserData() {
        const username = this.$route.params.username;
        axios.get('http://localhost:2000/getAccount', {
          params: {
            username: username
          }
        })
        .then((response) => {
          console.log(response.data);
            this.user=response.data
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  };
  </script>
  
  <style>
  .account-view {
    max-width: 300px;
    align-items: center;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .accountWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('../assets/n.jpg');
    background-size: cover;
    background-color: #9EB8D9; /* Fallback color */
    background-blend-mode: multiply; /* Apply tint */
  }
  
  .profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
    background-color: white; /* Add a background color for better visibility */
    padding: 5px; /* Add padding to the profile picture */
  }
  </style>
  
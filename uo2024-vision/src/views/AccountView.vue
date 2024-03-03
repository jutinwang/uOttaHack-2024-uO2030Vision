<template>
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
        
        this.user=response.data;
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
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  </style>
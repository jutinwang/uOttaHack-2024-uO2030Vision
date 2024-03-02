<template>
  <ul>
    <li>
      <button @click="signOut">Sign Out</button>
    </li>
    <li v-for="room in roomTypes" :key="room.id" @click="redirectToRoomPage(room.id)">
      <h3>{{ room.id }} {{ room.name }}</h3>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
import { getAuth, signOut } from "firebase/auth";


export default {
  name: 'RoomTypeList',
  data() {
    return {
      roomTypes:[
        {id: 1, name: 'Library'},
        {id: 2, name: 'Exams'},
      ]
    };
  },
  methods: {
    redirectToRoomPage(roomId) {
      // Navigate to the room page and pass the roomId as a parameter
      this.$router.push({ name: 'rooms', params: { id: roomId } });
    },
    signOut() {
      const auth = getAuth();

      signOut(auth)
        .then(() => {
          // After successful sign-out, you can redirect or perform other actions
          console.log('User signed out successfully');
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Error signing out:', error.message);
        });
    }
  }
};
</script>

<style>
li{
  display: inline-block
}
</style>
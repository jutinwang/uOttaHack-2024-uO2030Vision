<template>
  <div>
    <div v-for="room in roomTypes" :key="room.id" @click="redirectToRoomPage(room.id)">
      <h3>{{ room.id }} {{ room.name }}</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
    }
  }
};
</script>
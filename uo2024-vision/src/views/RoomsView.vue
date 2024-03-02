<template>
  <div>
    <button @click="getPosts">Load Rooms</button>
    <div v-for="room in rooms" :key="room.ID">
      <h3>{{ room.attendents ? room.attendents.length : 0 }} / 30</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RoomList',
  data() {
    return {
      rooms: []
    };
  },
  methods: {
    getPosts() {
      axios.get('http://localhost:8000/getRooms', {
        params: {
          typeID: 1 // Replace paramKey and paramValue with your actual parameter key and value
        }
      })
      .then((response) => {
        console.log(response.data);
        this.rooms = response.data.rooms; // Assign rooms from the response data
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>

<style>
h3 {
  display: inline-block;
  margin: 0 10px;
  padding: 10px;
  border-radius: 20%;
  background-color: aquamarine;
  border: 2px solid cornflowerblue;
  height: 170px;
  width: 170px;
}
</style>

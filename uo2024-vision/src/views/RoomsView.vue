<template>
  <div>
    <!-- Remove the button -->
    <div v-for="room in rooms" :key="room.ID" @click="redirectToRoom(room.ID)">
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
    getRooms() {
        const type = this.$route.params.id;
      axios.get('http://localhost:8000/getRooms', {
        params: {
          typeID: type
        }
      })
      .then((response) => {
        console.log(response.data);
        this.rooms = response.data.rooms;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    redirectToRoom(roomID) {
      // Redirect to a new page with room information
      // You can use vue-router or window.location.href to navigate to the new page
      // For example, using vue-router:
      this.$router.push({ 
        name: 'RoomDetails', 
        params: { roomID: roomID },
      });
      // Or using window.location.href:
      //window.location.href = `/room/${roomID}`; // Assuming the route for room details is '/room/:id'
    }
  },
  mounted() {
    // Call getRooms() automatically when the component is mounted
    this.getRooms();
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
  cursor: pointer; /* Add cursor pointer to indicate clickable */
}
</style>

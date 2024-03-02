<template>
  <div class="classroom">
    <!-- Loop through rooms -->
    <div v-for="roo in room" :key="roo.ID" @click="redirectToRoom(roo.ID)">
      <!-- Display profile icons -->
      <div class="attendees">
        <img v-for="attendee in roo.attendents" :key="attendee.id" :src="attendee.profilePic" class="profile-icon" alt="Attendee">
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'RoomList',
  data() {
    return {
      room: []
    };
  },
  methods: {
    getRooms() {
        const IDroom = this.$route.params.roomID;
      axios.get('http://localhost:8000/getRoomDetails', {
        params: {
          roomID: IDroom
        }
      })
      .then((response) => {
        console.log(response.data);
        this.room = response.data.rooms;
      })
      .catch((error) => {
        console.log(error);
      });
    },
   
  },
  mounted() {
    // Call getRooms() automatically when the component is mounted
    this.getRooms();
  }
};
</script>

<style scoped>
.classroom {
  background-image: url('https://static.vecteezy.com/system/resources/previews/000/568/517/original/vector-cartoon-illustration-of-school-classroom.jpg'); /* Set your classroom background image */
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh; /* Adjust the height as needed */
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.attendees {
  display: flex;
  flex-wrap: wrap;
}

.profile-icon {
  width: 50px; /* Adjust icon size as needed */
  height: 50px;
  margin: 5px;
  border-radius: 50%;
}
</style>

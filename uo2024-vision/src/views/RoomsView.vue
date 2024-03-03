<template>
  <div id="goop" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <!-- Remove the button -->
    <div v-for="room in rooms" :key="room.ID" @click="redirectToRoom(room.ID)">
      <h3 :class="getClassByRoomType()">{{ room.attendents ? room.attendents.length : 0 }} / 30</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RoomList',
  data() {
    return {
      rooms: [],
      roomClass: null,
    };
  },
  computed: {
    backgroundImage() {
      // Based on the room type, change the overall background image
      switch (this.$route.params.id) {
        case "1":
          return require('@/assets/1722.jpg');
        case "2":
          return require('@/assets/desks.jpg');
        case "3":
          return require('@/assets/code.jpg');
        case "4":
          return require('@/assets/schematic.jpg');
        case "5":
          return require('@/assets/tropical-green-leaves-background.jpg');
        case "6":
          return require('@/assets/history.jpg');
        case "7":
          return require('@/assets/english1.jpg');
        case "8":
          return require('@/assets/think.jpg');
        case "9":
          return require('@/assets/music.jpg');
        case "10":
          return require('@/assets/chemistry.jpg');
        default:
          return require('@/assets/helium.png'); // Default background
      }
    }
  },
  methods: {
    getRooms() {
      const type = this.$route.params.id;
      axios.get('http://localhost:2000/getRooms', {
        params: { typeID: type }
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
      this.$router.push({ 
        name: 'RoomDetails', 
        params: { roomID: roomID },
      });
    },
    getClassByRoomType() {
      const type = this.$route.params.id;
      console.log(type);
      // Define class based on room type
      switch (type) {
        case "1":
          return 'isH1';
        case "2":
          return 'isH2';
        case "3":
          return 'isH3';
        case "4":
          return 'isH4';
        case "5":
          return 'isH5';
        case "6":
          return 'isH6';
        case "7":
          return 'isH7';
        case "8":
          return 'isH8';
        case "9":
          return 'isH9';
        case "10":
          return 'isH10';
        default:
          return 'isFart';
      }
    },
  },
  mounted() {
    // Call getClassByRoomType() once and store the result
    this.roomClass = this.getClassByRoomType();

    // Call getRooms() automatically when the component is mounted
    this.getRooms();
  },
};
</script>

<style>
#goop {
  /* No need for parentheses here */
  background-size: 100%;
  height: 100vh;
  background-position: center;
}

h3 {
  display: inline-block;
  margin: 2%;
  padding: 10px;
  border: 2px solid #7C93C3;
  height: 170px;
  width: 170px;
  cursor: pointer;
  position: relative; /* Ensure proper positioning for .isH */
}

/* Define isH class */
.isH {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
}

/* Define individual isH styles */
.isH1 {
  background-image: url('../assets/book.png');
  background-size: contain;
  background-position: center;
}

.isH2 {
  background-image: url('../assets/exambook.png');
  padding-top: 5%;
  background-size: contain;
  background-position: center;
}

.isH3 {
  background-image: url('../assets/computers.png');
  width: 190px;
  background-position: center;
  background-size: contain;
}

.isH4 {
  background-image: url('../assets/calculator.png');
  height: 200px;
  border-radius: 5%;
  background-size: cover;
  padding-top: 1.58%;
}

.isH5 {
  background-image: url('../assets/penguin.png');
  padding-top: 2%;
  border-radius: 30%;
  background-size: contain;
  background-position: center;
}

.isH6 {
  background-image: url('../assets/canada.png');
  background-size: contain;
  background-position: center;
}

.isH7 {
  background-image: url('../assets/page.png');
  background-size: contain;
  background-position: center;
}

.isH8 {
  background-image: url('../assets/brain.png');
  width: 190px;
  background-size: contain;
  background-position: center;
}

.isH9 {
  background-image: url('../assets/palette.png');
  height: 200px;
  border-radius: 5%;
  background-size: contain;
  background-position: center;
}

.isH10 {
  background-image: url('../assets/helium.png');
  border-radius: 10%;
  background-size: contain;
  background-position: center;
}
</style>

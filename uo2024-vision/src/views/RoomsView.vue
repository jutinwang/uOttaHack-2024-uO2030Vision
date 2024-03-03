<template>
  <div>
    <!-- Remove the button -->
    <div v-for="room in rooms" :key="room.ID" @click="redirectToRoom(room.ID)" :class="[getClassByRoomType()]">
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
      rooms: [],
      
    };
  },
  methods: {
    getRooms() {
        const type = this.$route.params.id;
      axios.get('http://localhost:2000/getRooms', {
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
    },
    getClassByRoomType() {
      const type = this.$route.params.id;
      console.log(type);
      // Define class based on room type
      switch (type) {
        case "1":
          return 'isRoom1'; // Apply isRoom1 class for roomType 1
        case "2":
          return 'isRoom2'; // Apply isRoom2 class for roomType 2
        case "3":
          return 'isRoom3';
        case "4":
          return 'isRoom4';
        case "5":
          return 'isRoom5';
        case "6":
          return 'isRoom6';
        case "7":
          return 'isRoom7';
        case "8":
          return 'isRoom8';
        case "9":
          return 'isRoom9';
        case "10":
          return 'isRoom10';
        default:
          return 'isFart'; // Default class if no specific styling needed
      }
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
  border: 2px solid #7C93C3;
  height: 170px;
  width: 170px;
  cursor: pointer; /* Add cursor pointer to indicate clickable */
  margin-top: 5%;
}


.isRoom1{
  height: 100vh;  
  background-image: url('../assets/1722.jpg');
  background-size: cover; /* Apply tint */
  background-position: center;
  h3{
    background-image: url('../assets/book.png');
  }
}

.isRoom2{
  height: 100vh;  
  background-image: url('../assets/desks.jpg');
  background-size: cover; /* Apply tint */  
  background-position: center;
  h3{
    background-image: url('../assets/exambook.png');
  }
}

.isRoom3{
  height: 100vh;  
  background-image: url('../assets/code.jpg');
  background-size: cover; /* Apply tint */  
  background-position: center;
  h3{
    background-image: url('../assets/computers.png');
    background-position: center;
    background-size: cover;
    width: 190px;
  }
}

.isRoom4{
  height: 100vh;  
  background-image: url('../assets/schematic.jpg');
  background-size: cover; /* Apply tint */  
  background-position: center;
  
  h3{
    background-image: url('../assets/calculator.png');
    background-position: center;
    height: 200px;
    border-radius: 5%;
    background-size:cover;
    padding-top: 1.58% ;
    border:none;

  }
}  

.isRoom5{
  height: 100vh;  
  background-image: url('../assets/tropical-green-leaves-background.jpg');
  background-size: cover; /* Apply tint */  
  background-position: center;
  
  h3{
    padding-top: 2%;
    background-image: url('../assets/penguin.png');
    background-position: center;
    border-radius: 30%;
    background-size: cover;
  }
}  
.isFart{
  background-color: blue;
}
</style>

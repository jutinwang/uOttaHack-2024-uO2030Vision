<template id="butt">
  <header id="roomTypeHeader">  
    <img alt="logo" src="../assets/hackathonLogo.png" height="75">
    <h1 id="togather">TOGATHER</h1>
    <button id="signOutBtn" @click="signOut">Sign Out</button>
  </header>
  <body id="roomTypeBody">
    <div class="roomTypes">
      <ul class="roomGrid">
        <li v-for="(room) in roomTypes" :key="room.id" @click="redirectToRoomPage(room.id)" :class="['room-type-' + room.id]">
          <h3 :style="room.style">{{ room.name }}</h3>
        </li>
      </ul>
    </div>
  </body>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: 'RoomTypeList',
  data() {
    return {
      roomTypes: [
        { id: 1, name: 'LIBRARY', style: { color: '#ffc09f', textAlign: 'center' } },
        { id: 2, name: 'Exams', style: {color: '#a0ced9', textAlign: 'center'} },
        { id: 3, name: 'Computer Science', style: {color: '#ffee93', textAlign: 'center'} },
        { id: 4, name: 'Engineering', style: {color: '#fcf5c7', textAlign: 'center'}},
        { id: 5, name: 'Biology', style: {color: '#adf7b6', textAlign: 'center'} },
        { id: 6, name: 'History' },
        { id: 7, name: 'English' },
        { id: 8, name: 'Phsychology' },
        { id: 9, name: 'Fine arts' },
        { id: 10, name: 'Chemistry' }
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
/* General styles */
h1#togather {
  color: #6c0e23;
  text-shadow: -1px -1px 0 #7C93C3, 1px -1px 0 #7C93C3, -1px 1px 0 #7C93C3, 1px 1px 0 #7C93C3; /* Outline using shadows */
  font-size: 36px;
  margin: 0;
}

header#roomTypeHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #A25772;
  height: 100px;
  padding: 0 20px; /* Adjust padding */
  box-sizing: border-box; /* Ensure padding is included in width */
}

img[alt="logo"] {
  height: 100%;
}

button#signOutBtn {
  height: 50px;
  width: 100px;
  border-radius: 25px;
  background-color: #6c0e23;
  color: #9fbee8;
  border: none;
  font-size: 16px;
}

body#roomTypeBody {
  margin: 0;
  padding-top: 3%;
  height: 100vh;
  background-color: #9fbee8;
  padding-left: 2%;
  padding-right: 2%;
}

.roomTypes ul.roomGrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 0;
  justify-items: center; /* Center items horizontally */
  list-style-type: none;
}

.roomTypes ul li {
  cursor: pointer;
}

.roomTypes ul li h3 {
  color: #6c0e23;
  font-size: 18px;
  text-align: center;
  margin: 0;
  padding: 10px;
  border: 1px solid #A25772;
  border-radius: 10px;
}

/* Individual room type styles */
.room-type-1 h3 {
  position: relative;
  background-image: url('../assets/1722.jpg');
  background-size: cover;
  background-color: #9EB8D9; /* Fallback color */
  background-blend-mode: multiply;
}

.room-type-1 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #ffc09f; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}

.room-type-3 h3 {
  position: relative;
  background-image: url('../assets/code.jpg');
  background-size: cover;
}

.room-type-3 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #ffee93; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}

.room-type-2 h3 {
  position: relative;
  background-image: url('../assets/exams.png');
  background-size: cover;
  background-color: #6390d9; /* Fallback color */
  background-blend-mode: multiply; /* Apply tint */
}

.room-type-2 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #a0ced9; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}

.room-type-4 h3 {
  position: relative;
  background-image: url('../assets/rocket.jpg');
  background-size: cover; /* Apply tint */
  background-position: center;
}

.room-type-4 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #fcf5c7; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}

.room-type-5 h3 {
  position: relative;
  background-image: url('../assets/plants.png');
  background-size: cover; /* Apply tint */
  background-position: center;
  background-color: #48d477; /* Fallback color */
  background-blend-mode: multiply; /* Apply tint */
}

.room-type-5 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #adf7b6; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}



/* Define styles for other room types similarly */
</style>

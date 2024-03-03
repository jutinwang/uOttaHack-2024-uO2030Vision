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
import { useAuthState } from "@/main";
import { getAuth, signOut} from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: 'RoomTypeList',
  setup(){
    const {user}=useAuthState()
    const auth =getAuth()
    const user1=auth.currentUser
    if (user1){
      console.log(user1.email)
    }else{
      console.log("NO USER")
    }
    const router =useRouter()
    console.log(user1)
    return {user}
  },
  data() {
    return {
      roomTypes: [
        { id: 1, name: 'LIBRARY', style: {color: '#ffc09f', textAlign: 'center',fontWeight: 'bold' } },
        { id: 2, name: 'Exams', style: {color: '#a0ced9', textAlign: 'center',fontWeight: 'bold' } },
        { id: 3, name: 'Computer Science', style: {color: '#ffee93', textAlign: 'center',fontWeight: 'bold' } },
        { id: 4, name: 'Engineering', style: {color: '#fcf5c7', textAlign: 'center',fontWeight: 'bold' } },
        { id: 5, name: 'Biology', style: {color: '#adf7b6', textAlign: 'center',fontWeight: 'bold' } },
        { id: 6, name: 'History', style: {color: '#F5B700', textAlign: 'center',fontWeight: 'bold' } },
        { id: 7, name: 'English',style: {color: '#90323D', textAlign: 'center',fontWeight: 'bold' } },
        { id: 8, name: 'Phsychology', style: {color: '#235789', textAlign: 'center',fontWeight: 'bold' } },
        { id: 9, name: 'Fine arts', style: {color: '#9448BC', textAlign: 'center',fontWeight: 'bold' } },
        { id: 10, name: 'Chemistry', style: {color: '#FE5F55', textAlign: 'center',fontWeight: 'bold' } },
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
header#roomTypeHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #ff8a00, #da1b60); /* Gradient background */
  height: 100px;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Shadow */
}

header#roomTypeHeader::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px; /* Match header border radius */
  background: linear-gradient(to right, #ff8a00, #da1b60); /* Same gradient as header */
  z-index: -1;
  filter: blur(20px); /* Blur effect */
}

img[alt="logo"] {
  height: 75px;
}

h1#togather {
  color: #fff;
  font-size: 36px;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Text shadow */
}

button#signOutBtn {
  height: 50px;
  width: 100px;
  border-radius: 25px;
  background: linear-gradient(to right, #da1b60, #ff8a00); /* Gradient background */
  color: #fff;
  border: none;
  font-size: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Shadow */
}

/* Other styles remain unchanged */


/* Other styles remain unchanged */


body#roomTypeBody {
  margin: 0;
  padding-top: 3%;
  height: 100vh;
  background-color: #EADEDA;
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

.room-type-6 h3 {
  position: relative;
  background-image: url('../assets/history1.jpg');
  background-size: cover;
  background-color: #9EB8D9; /* Fallback color */ 
}

.room-type-6 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #F5B700; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}

.room-type-7 h3 {
  position: relative;
  background-image: url('../assets/english.jpg');
  background-size: cover;
}

.room-type-7 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #90323D; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}

.room-type-8 h3 {
  position: relative;
  background-image: url('../assets/psych.jpg');
  background-size: cover;
  background-color: #6390d9; /* Fallback color */
}

.room-type-8 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #235789; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}

.room-type-9 h3 {
  position: relative;
  background-image: url('../assets/art.jpg');
  background-size: cover; /* Apply tint */
  background-position: center;
}

.room-type-9 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #9448BC; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}

.room-type-10 h3 {
  position: relative;
  background-image: url('../assets/chem.jpg');
  background-size: cover; /* Apply tint */
  background-position: center;
  background-color: #48d477; /* Fallback color */
}

.room-type-10 h3::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute; /* Position the border relative to the container */
  top: 0;
  left: 0;
  width: 100%; /* Cover the entire container horizontally */
  height: 100%; /* Cover the entire container vertically */
  border: 5px solid #FE5F55; /* Border properties */
  box-sizing: border-box; /* Ensure border width is included in width/height */
  border-radius: 4%;
}




/* Define styles for other room types similarly */
</style>

<template id="butt">
  <header id="roomTypeHeader">  
    <img alt="logo" src="../assets/hackathonLogo.png" height="75">
    <h1 id="togather">TOGATHER</h1>
    <button id="signOutBtn" @click="signOut">Sign Out</button>
  </header>
  <body id="roomTypeBody">
    <div class="roomTypes">
      <ul class="roomGrid">
        <li v-for="(room) in roomTypes" :key="room.id" @click="redirectToRoomPage(room.id)">
          <h3>{{ room.id }} - {{ room.name }}</h3>
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
        { id: 1, name: 'Library' },
        { id: 2, name: 'Exams' },
        { id: 3, name: 'Conference Room' },
        { id: 4, name: 'Study Room' },
        { id: 5, name: 'Meeting Room' },
        { id: 6, name: 'Game Room' },
        { id: 7, name: 'Lounge' },
        { id: 8, name: 'Auditorium' },
        { id: 9, name: 'Training Room' },
        { id: 10, name: 'Break Room' }
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
  color: white;
  border: none;
  font-size: 16px;
}

body#roomTypeBody {
  margin: 0;
  padding-top: 3%;
  height: 100vh;
  background-color: #EEF5FF;
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

</style>




<template>
  <div class="classroom">
    <!-- Loop through rooms -->
     <button class="librarian-button" @click="librarianOnClick">
      <img src="librarian-icon.png" alt="Librarian Icon">
    </button>

    <div v-for="roo in room" :key="roo.ID">
      <!-- Display profile icons -->
      <div class="attendees">
        <img
          v-for="attendee in roo.attendents"
          :key="attendee.id"
          :src="attendee.profilePic"
          class="profile-icon"
          :style="{ position: 'relative' }"

          @click="displaySpeechBubble = true"
          alt="Attendee"
        />
        <h2> <div v-for="(message, index) in messages" :key="message.id">
  <template v-if="index === 12">
    <!-- Render the message at index 12 here -->
    {{ message.text }}
  </template>
</div> </h2>
        <!-- Speech bubble -->
        <div
          v-if="displaySpeechBubble"
          class="speech-bubble"
          :style="{ top: '-50px', left: '30px' }" 
        >
          <!-- Message content -->
          {{ newMessage }}
        </div>
      </div>
    </div>
    <div class="chat-container">
    <section class="uk-section">
    <div class="uk-container uk-container-small">
      <div class="uk-flex uk-flex-center">
        <div class="uk-width-large uk-margin-large-top">
          <template v-if="hasJoinedChat">
            <!-- chats and chat form will be here -->
            <div class="uk-panel uk-panel-scrollable">
              <ul class="uk-list uk-list-divider">
                <li v-for="message in messages" :key="message.id">
                  <div
                    :class="{ 'uk-text-right': message.user.id === user.username }"


                  >{{message.user.id}}:  {{ message.text }}</div>
                </li>
              </ul>
            </div>

            <form @submit.prevent="sendMessage" method="post">
              <div class="uk-flex uk-margin-small-top">
                <div class="uk-width-expand">
                  <input
                    class="uk-input"
                    type="text"
                    v-model="newMessage"
                    placeholder="Start chatting..."
                  >
                </div>
                <div class="uk-width-auto">
                  <button class="uk-button uk-button-primary">Send</button>
                </div>
              </div>
            </form>
          </template>

          <template v-else>
            <h2 class="uk-text-center">Join Chat!</h2>
            <form @submit.prevent="joinChat" method="post" class="uk-form-stacked">
              <div class="uk-margin-small-top uk-width-1-1@s">
                <label class="uk-form-label">username</label>
                <div class="uk-form-controls">
                  <input class="uk-input" type="text" v-model="username" required>
                </div>
              </div>
              <div class="uk-margin-top uk-width-1-1@s">
                <button type="submit" class="uk-button uk-button-primary uk-width-1-1 uk-border-rounded uk-text-uppercase">Join Chat</button>
              </div>
            </form>
          </template>
        </div>
      </div>
    </div>
  </section>
    </div>
  </div>
  
</template>


<script>
import axios from 'axios';
import { StreamChat } from "stream-chat";


export default {
  name: 'RoomList',
  data() {
    return {
      room: [],
      displaySpeechBubble: true,
      hasJoinedChat: false,
      token: '',
      username: "",
      user: '',
      channel: "",
      client: "",
      messages: [],
      newMessage: ""
    };
  },
  methods: {
    getRooms() {

        const IDroom = this.$route.params.roomID;
      axios.get('http://localhost:2000/getRoomDetails', {
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

    async joinChat() {
       const response = await axios.get(`http://localhost:8000/join?username=${this.username}`);
    const data = response.data;
      this.username = "";
      this.hasJoinedChat = true;
      this.user = data.user;
      this.token = data.token;
     
      await this.initializeStream();
      await this.initializeChannel();

      this.channel.on("message.new", event => {
  this.messages.push({
    text: event.message.text,
    user: event.message.user
  });
});
    },
    async initializeStream() {
      const { username } = this.user;

      this.client = new StreamChat('aws64qwz4v5n');

      await this.client.setUser({ id: username, name: username }, this.token);
    },
    async initializeChannel() {
      this.channel = this.client.channel("messaging", "vue-chat", {
        name: "Vue Chat"
      });

      this.messages = (await this.channel.watch()).messages;
    },
    async sendMessage() {
      await this.channel.sendMessage({
        text: this.newMessage
      });

      this.newMessage = "";
    },

     
    librarianOnClick() {
       this.$router.push({ 
        name: 'AITutor', 
       
      });
    },
    // Your other methods
  

   
  },
  mounted() {
    // Call getRooms() automatically when the component is mounted
    this.getRooms();
  }
};
</script>

<style scoped>

librarian-button {
  position: absolute;
  top: 20px; /* Adjust the top position as needed */
  right: 20px; /* Adjust the right position as needed */
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.librarian-button img {
  width: 40px; /* Adjust the width of the librarian icon */
  height: auto; /* Maintain aspect ratio */
}
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
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
}

.speech-bubble {
  position: absolute;
  background-color: #ffffff; /* Adjust bubble color */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  /* Additional styles for speech bubble */
}


.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  background-color:white;
  /* Adjust the size and styling of the chat container as needed */
}

</style>
<template>
  <div class="classroom">
    <button class="librarian-button" @click="librarianOnClick">
      <img src="../assets/robot.png" alt="Librarian Icon">
    </button>
    <button @click="leaveRoom" class="uk-button uk-button-danger uk-margin-top">Leave Room</button>

    <div class="attendees">
      <div v-for="room in rooms" :key="room.ID">
        <img
          v-for="attendee in room.attendents"
          :key="attendee.id"
          :src="attendee.profilePic"
          class="profile-icon"
          :style="{ position: 'relative' }"
          @click="displaySpeechBubble = true"
          alt="Attendee"
        />
        <h2>
          <div v-for="(message, index) in messages" :key="message.id">
            <template v-if="index === messages.length-1">
              <div v-if="displaySpeechBubble && messages.length > 0" class="speech-bubble">
                {{ message.text }}  
              </div>
            </template>
          </div>
        </h2>
      </div>
    </div>

    <div class="chat-container">
      <section class="uk-section">
        <div class="uk-container uk-container-small">
          <div class="uk-flex uk-flex-center">
            <div class="uk-width-large uk-margin-large-top">
              <template v-if="hasJoinedChat">
                <div class="uk-panel uk-panel-scrollable">
                  <ul class="uk-list uk-list-divider">
                    <li v-for="message in messages" :key="message.id">
                      <div :class="{ 'uk-text-right': message.user.id === user.username }">
                        {{ message.user.id }}: {{ message.text }}
                      </div>
                    </li>
                  </ul>
                </div>
              </template>

              <template v-else>
                <div id="containment">
                  <form @submit.prevent="joinChat" method="post" class="uk-form-stacked">
                    <div class="uk-margin-small-top uk-width-1-1@s">
                      <label class="uk-form-label">Enter Your Username</label>
                      <div class="uk-form-controls">
                        <input class="uk-input" type="text" v-model="username" required>
                      </div>
                    </div>
                    <div class="uk-margin-top uk-width-1-1@s">
                      <button type="submit" class="uk-button uk-button-primary uk-width-1-1 uk-border-rounded uk-text-uppercase">Join Chat</button>
                    </div>
                  </form>
                </div>
              </template>

              <form @submit.prevent="sendMessage" method="post" v-if="hasJoinedChat">
                <div class="uk-flex uk-margin-small-top">
                  <div class="uk-width-expand">
                    <input class="uk-input" type="text" v-model="newMessage" placeholder="Start chatting...">
                  </div>
                  <div class="uk-width-auto">
                    <button class="uk-button uk-button-primary">Send</button>
                  </div>
                </div>
              </form>
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
import { getAuth } from "firebase/auth";

export default {
  name: 'RoomList',
  data() {
    return {
      rooms: [],
      displaySpeechBubble: false,
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
    async getRooms() {
      const IDroom = this.$route.params.roomID;
      try {
        const response = await axios.get('http://localhost:2000/getRoomDetails', {
          params: { roomID: IDroom }
        });
        console.log(response.data);
        const auth = getAuth();
        const user = auth.currentUser;
        this.room = response.data.rooms;
        const response2 = await axios.get('http://localhost:2000/enterRoom', {
          params: { email: user.email, room: IDroom }
        });
        console.log(response2);
      } catch (error) {
        console.log(error);
      }
    },

    async leaveRoom() {
      const auth = getAuth();
      const user = auth.currentUser;
      const IDroom = this.$route.params.roomID;
      try {
        const response = await axios.get('http://localhost:2000/leaveRoom', {
          params: { email: user.email, room: IDroom }
        });
        console.log(response);
        this.$router.push({ name: 'RoomTypes' });
      } catch (error) {
        console.log(error);
      }
    },

    async joinChat() {
      try {
        const response = await axios.get(`http://localhost:2000/join?username=${this.username}`);
        const data = response.data;
        this.username = "";
        this.hasJoinedChat = true;
        this.displaySpeechBubble = true;
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
      } catch (error) {
        console.error(error);
      }
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
      await this.channel.sendMessage({ text: this.newMessage });
      this.newMessage = "";
    },

    librarianOnClick() {
      this.$router.push({ name: 'AITutor' });
    }
  },
  mounted() {
    this.getRooms();
  }
};
</script>

<style scoped>
.librarian-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.librarian-button img {
  width: 100px;
  height: auto;
}

.classroom {
  background-image: url('https://static.vecteezy.com/system/resources/previews/000/568/517/original/vector-cartoon-illustration-of-school-classroom.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.attendees {
  margin-top: 20px;
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
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  width: 300px;
  text-align: center;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -30%);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-container {
  margin-top: auto;
  width: 100%;
}

div#containment {
  background-color: #f5f5f5;
  border-radius: 3%;
  padding: 5%;
}
</style>

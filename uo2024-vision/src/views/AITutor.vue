<template>
  <div id="boxer" class="hello">
    <h1 id="snail">🤖TUTORBOT🤖</h1>
    <div class="input-container">
      <input v-model="currentMessage" type="text" class="input">
      <button @click="sendMessage(currentMessage)" class="button">Ask</button>
    </div>
    <div class="messageBox">
      <template v-for="message in messages" :key="message.id">
        <div :class="{'messageFromUser': message.from === 'user', 'messageFromChatGpt': message.from !== 'user'}" v-html="message.data"></div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RoomList',
  data() {
    return {
      currentMessage: '',
      messages: []
    };
  },
  methods: {
    async sendMessage(message){
        this.messages.push({
            from: 'user',
            data: message
        })
        await axios.post('http://localhost:2000/ask-to-chat-gpt', {message: message})
        .then((response) => {
            this.messages.push(response.data)
        }) 
    }
  }
};
</script>

<style scoped>
.input-container {
  margin-left: 10%;
  display: flex;
  align-items: center;
}

.input {
  flex: 1;
  width: 100%;
  padding: 10px;
  margin-right: 10px;
  background-color: #EADFB4;
  color:#51829B;
}

.button {
  height: 40px;
  background-color: #F6995C;
  width: 120px;
  padding: 10px;
  border-radius: 20%;
  margin-right: 10%;
  color: #51829B;
}

.messageBox {
  height: 500px;
  background-color: #EADFB4;
  margin: 0 10% 0 10%;
  margin-top: 20px;
  padding: 5%;
  overflow-y: auto; /* Enable vertical scrolling */
  border-radius: 5%;
}

.messageFromUser {
  text-align: right;
  background-color: #9BB0C1;
  border-radius: 10px;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #F6995C;
}

.messageFromChatGpt {
  text-align: left;
  background-color: #51829B;
  border-radius: 10px;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #EADFB4;
}
div#boxer{
  background-color: #51829B;
}

h1#snail{
  color:#F6995C;
  font-weight: 800;
}
</style>

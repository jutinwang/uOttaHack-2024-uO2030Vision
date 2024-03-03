<template>
  <div id="boxer" class="hello">
    <h1 id="snail">🤖TUTORBOT🤖</h1>
    <div class="input-container">
      <input v-model="currentMessage" type="text" class="input" placeholder="Ask a question">
      <button id="ask" @click="sendMessage" class="button">Ask</button>
      <!-- New input box -->
      <input id="pdf" v-model="pdfUrl" type="text" placeholder="Enter PDF URL" class="input">
      <!-- New button to retrieve data -->
      <button @click="retrieveData(pdfUrl)" class="button">Retrieve Data</button>
    </div>
    <!-- Removed extra </div> tag here -->
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
      messages: [],
      pdfUrl: '' // Added pdfUrl to the data object
    };
  },
  methods: {
    async sendMessage(){
      const userID = "owenhalvie2";
      const message = this.currentMessage;
      this.messages.push({
        from: 'user',
        data: message
      });
      this.currentMessage = ''; // Clear input text
      await axios.post('http://localhost:2000/ask-to-chat-gpt', { userID: userID, message: message })
        .then((response) => {
          this.messages.push(response.data);
        }); 
    },
    async retrieveData(pdfUrl) {
  try {
    const response = await axios.get('http://localhost:2000/extract-pdf', {
      params: { pdfUrl: pdfUrl }
    });
    console.log('Extracted text:', response.data);
    const userID = "owenhalvie2";
    await axios.post('http://localhost:2000/ask-to-chat-gpt', { userID: userID, message: response.data })
      .then((response) => {
        this.messages.push(response.data);
      });
    // Reset pdfUrl after successful retrieval
    this.pdfUrl = '';
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

  }
};

</script>

<style scoped>
.input-container {
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  align-items: center;
}

.input {
  flex: 1;
  width: 100%;
  padding: 10px;
  background-color: #EADFB4;
  color:#51829B;
}

.button {
  height: 40px;
  margin-left: 1%;
  background-color: #F6995C;
  width: 120px;
  padding: 10px;
  border-radius: 20%;
  color: #51829B;
}

button#ask{
  margin-right: 3%;
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

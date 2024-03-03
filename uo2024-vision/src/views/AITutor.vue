<!-- <template>
  <div id="boxer" class="hello">
    <h1 id="snail">🤖TUTORBOT🤖</h1>
    <div class="input-container">
      <input v-model="currentMessage" type="text" class="input">
      <button @click="sendMessage(currentMessage)" class="button">Ask</button>
    </div>
    
    <input type="file" @change="sendFile" accept=".pdf">

    <div class="messageBox">
      <template v-for="message in messages" :key="message.id">
        <div :class="{'messageFromUser': message.from === 'user', 'messageFromChatGpt': message.from !== 'user'}" v-html="message.data"></div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FormData from 'form-data'

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
        .then( (response) => {
            this. messages. push (response. data)
        })
  
    },
    
    async sendFile(currentFile) {

      var data = new FormData();
      data.append("file", "/Users/justinwang/uOttaHack-2024-uO2030Vision/uo2024-vision/pdfs/" + currentFile.name)

      var config = {
          method: 'post',
          maxBodyLength: Infinity, 
          url: 'https://api.pdfrest.com/extracted-text', 
          headers: { 
              'Api-Key': '44c98650-893f-40a9-a4cd-fe7c90a62b8a', 
              ...data
          },
          data : data 
      };

      axios(config)
      .then(function (response) {
      console.log(JSON.stringify(response.data));
      })
    }
  }
};
</script> -->

<template>
  <div id="boxer" class="hello">
    <h1 id="snail">🤖TUTORBOT🤖</h1>
    <div class="input-container">
      <input v-model="currentMessage" type="text" class="input">
      <button @click="sendMessage(currentMessage)" class="button">Ask</button>
    </div>
    
    <input type="file" @change="sendFile" accept=".pdf">

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
  data() {
    return {
      currentMessage: '',
      messages: [],
    };
  },
  methods: {
    sendMessage(message) {
      // Your existing logic for sending messages
      this.messages.push({ from: 'user', data: message, id: Date.now() });
      // Call the OpenAI API or perform any other necessary actions
    },
    sendFile(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];

      if (file) {
        const data = new FormData();
        data.append("file", file);

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api.pdfrest.com/extracted-text',
          headers: {
            'Api-Key': '44c98650-893f-40a9-a4cd-fe7c90a62b8a',
            ...data.getHeaders(),
          },
          data: data,
        };

        this.messages.push({ from: 'user', data: `Uploading file: ${file.name}`, id: Date.now() });

        axios(config)
          .then((response) => {
            const extractedText = response.data; // Assuming the response contains the extracted text
            this.messages.push({ from: 'chatGpt', data: extractedText, id: Date.now() });
          })
          .catch((error) => {
            console.error('Error:', error.message);
            this.messages.push({ from: 'chatGpt', data: 'Error extracting text', id: Date.now() });
          });
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>


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

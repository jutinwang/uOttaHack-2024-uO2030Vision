<template>
  <div class="hello">
    <h1>Ask to AI Tutor</h1>
    <input v-model="currentMessage" type="text">
    <span><button @click="sendMessage(currentMessage)">Ask</button></span>

    <!-- Add the file input button -->
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
        this. messages. push ({
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
              ...data.getHeaders()
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
</script>

<style scoped>
.input{
    width:300px;
    padding:10px;
}

.button{
    height:40px;
    background-color:powderblue;
    padding:10px;
}

.messageBox{
    height:500px;
    background-color:gainsboro;
    margin:0 20% 0 20%;
    margin-top:20px;
    padding: 5%
}

.messageFromUser{
    text-align: right;
    background-color:aliceblue;
    border-radius: 10px;
    padding:10px;
    margin-top:15px;
    width:30%;
    margin-left:70%;
}

.messageFromChatGpt{
    text-align: left;
    background-color:antiquewhite;
    border-radius: 10px;
    padding:10px;
    margin-top:15px;
    margin-bottom:15px;
    width:30%;
    margin-left:70%;
}

</style>


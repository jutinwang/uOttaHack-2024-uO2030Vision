<template>
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
                  >{{ message.text }}</div>
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
</template>

<script>
import axios from "axios";
import { StreamChat } from "stream-chat";

export default {
  name: "app",
  data() {
    return {
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
    async joinChat() {
       const response = await axios.get(`http://localhost:2000/join?username=${this.username}`);
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
    }

  }
};
</script>

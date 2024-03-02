<template>
    <head>
  </head>
  <body>
    <main>
        <h1>Welcome to My Website</h1>  
        <form action="">
            <input type="text" name="message" id="message">
            <button type="submit">Send</button>
        </form>
    </main>
  </body>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { main } from './openai-test.js'; // Adjust the path as per your project structure

export default {
  mounted() {
    this.callOpenAI();
  },
  methods: {
    async callOpenAI() {
      await main(); // Call the main function from your imported JS file
    },
  },
};

</script>
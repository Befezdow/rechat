<template>
  <div>
    <v-btn @click="onSendMessageClick">Send "GL HF"</v-btn>
  </div>
</template>

<script>
  export default {
    sockets: {
      connect() {
        console.log('Client IO connected');
      }
    },
    methods: {
      onSendMessageClick() {
        const messageText = 'GL HF';
        this.$socket.emit('request', { text: messageText });
        console.log(`Client: ${messageText}`);
      }
    }
  }
</script>>

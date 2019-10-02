<template>
  <div class="wrapper">
    <div class="chat-history" ref="chat">
      <Message v-for="message in messages" :key="message.id"
               :author="message.senderName"
               :text="message.text"
               :is-system="message.isSystem"
               :owned="message.senderId === user.id"
      />
    </div>

    <SendForm ref="sendForm" class="send-form" @send="onSend"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Message from '../components/Message';
  import SendForm from '../components/SendForm';
  import { SignalTypes } from '../server/helper';

  export default {
    components: { Message, SendForm },
    head() {
      return {
        title: `Room: ${ this.user ? this.user.room: 'Unknown' }`
      };
    },
    middleware: ['chat'],
    computed: {
      ...mapState(['user', 'messages'])
    },
    methods: {
      onSend(text) {
        this.$socket.emit(SignalTypes.NEW_MESSAGE, {text}, response => {
          if (response.ok) {
            this.$refs.sendForm.clearForm();
          } else {
            this.$router.push(`/?message=${response.error}`);
          }
        });
      }
    },
    watch: {
      messages() {
        setTimeout(() => {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        }, 0);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .wrapper {
    position: relative;
    height: 100%;
  }

  .chat-history {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
    padding: 10px;
    overflow-y: auto;
  }

  .send-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
  }
</style>

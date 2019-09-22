<template>
  <div class="wrapper">
    <div class="chat-history">
      <Message v-for="message in messages" :key="message.id"
               :author="message.sender"
               :text="message.text"
               :is-system="message.isSystem"
      />
    </div>

    <SendForm class="send-form"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Message from '../components/Message';
  import SendForm from '../components/SendForm';

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

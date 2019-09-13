<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
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

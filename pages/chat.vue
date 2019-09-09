<template>
  <h1>
    Chat page {{ user ? user.name : 'Unknown' }}
  </h1>
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
      ...mapState(['user'])
    }
  }
</script>

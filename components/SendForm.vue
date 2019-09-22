<template>
  <div class="root">
    <v-text-field
      v-model="text"
      class="input-field"
      label="New message"
      outlined
      :hide-details="true"
    ></v-text-field>

    <v-btn color="primary" @click="sendMessage">
      Send
    </v-btn>
  </div>
</template>

<script>
 export default {
   data: () => ({
     text: ''
   }),
   methods: {
     sendMessage() {
       this.$emit('send', this.text);
     }
   }
 }
</script>

<style scoped lang="stylus">
  .root {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #424242;
    padding: 10px;

    .input-field {
      flex-grow: 1;
      margin-right: 10px;
    }
  }
</style>

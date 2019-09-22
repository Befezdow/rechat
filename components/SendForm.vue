<template>
  <div class="root">
    <v-text-field
      class="input-field"
      label="New message"
      outlined
      hide-details="true"
    ></v-text-field>

    <v-btn color="primary">
      Send
    </v-btn>
  </div>
</template>

<script>
 export default {

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

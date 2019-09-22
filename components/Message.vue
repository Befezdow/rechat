<template>
  <div>
    <div v-if="isSystem" class="system-message">
      <div class="text">
        {{ text }}
      </div>
      <hr>
    </div>
    <div v-else style="display: flex">
      <div class="user-message" :class="{ owned }">
        <div class="author">
          {{ author }}
        </div>
        <div class="text">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      author: {
        type: String,
        required: false,
        default: 'Admin'
      },
      text: {
        type: String,
        required: true
      },
      isSystem: {
        type: Boolean,
        required: false,
        default: false
      },
      owned: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<style scoped lang="stylus">
  .system-message {
    margin-bottom: 10px;

    .text {
      text-align: center;
    }
  }

  .user-message {
    max-width: 50%;
    width: auto;
    border-radius: 5px;
    background: #424242;
    display: inline-block;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)
    padding: 5px;
    margin-bottom: 10px;

    &.owned {
      background: #425063;
      margin-left: auto;
      margin-right: 0;
    }

    .author {
      font-size: small;
      font-weight bold;
      margin-bottom: 3px;
    }

    .text {

    }
  }
</style>

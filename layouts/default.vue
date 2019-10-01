<template>
  <v-app app dark>
    <v-app-bar app>
      <v-app-bar-nav-icon v-if="loggedIn" @click="switchDrawer" />

      <v-btn icon v-if="loggedIn" @click="leaveRoom">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>
        ReChat {{ roomLabel }}
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" mobile-break-point="650">
      <v-list subheader>
        <v-subheader>Room users</v-subheader>

        <v-list-item
          v-for="roomUser in roomUsers"
          :key="roomUser.id"
          @click.prevent
        >
          <v-list-item-content>
            <v-list-item-title>{{ roomUser.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="roomUser.id === user.id ? 'primary' : 'grey'">mdi-message</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { SignalTypes } from '../server/helper';

  export default {
    data: () => ({
      drawer: false
    }),
    computed: {
      ...mapState(['user', 'roomUsers']),
      loggedIn() {
        return this.user !== null;
      },
      roomLabel() {
        return this.loggedIn ? `/ ${ this.user.room }` : '';
      }
    },
    methods: {
      ...mapMutations(['clearUser']),
      leaveRoom() {
        this.$socket(SignalTypes.USER_LEFT, {}, response => {
          if (response.ok) {
            this.$router.push('/?message=left_chat');
            this.clearUser();
          } else {
            this.$router.push(`/?message=${response.error}`);
          }
        });
      },
      switchDrawer() {
        this.drawer = !this.drawer;
      }
    },
    mounted() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'setUser' && state.user != null) {
          this.drawer = true;
        }
        if (mutation.type === 'clearUser') {
          this.drawer = false;
        }
      })
    }
  }
</script>

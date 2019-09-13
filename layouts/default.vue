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

    <v-navigation-drawer app v-model="drawer">
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
            <v-icon :color="roomUser.id === 1 ? 'primary' : 'grey'">mdi-message</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <div>
        <nuxt/>
      </div>
    </v-content>

    <v-footer app>

    </v-footer>
  </v-app>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data: () => ({
      drawer: false,
      roomUsers: [
        {
          id: 1,
          name: 'Pol'
        },
        {
          id: 2,
          name: 'Chuks'
        }
      ],
    }),
    computed: {
      ...mapState(['user']),
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
        this.$router.push('/?message=leftChat');
        this.clearUser();
        console.log('leave room');
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

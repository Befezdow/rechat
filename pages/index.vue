<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">
        <v-card-title>
          ReChat
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="16"
              label="Ваше имя"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              :counter="16"
              label="Название комнаты"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="submit"
            >
              Войти
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    sockets: {
      connect() {
        console.log('Client IO connected');
      }
    },
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Введите имя',
        v => (v && v.length <= 16) || 'Имя не должно превышать 16 символов'
      ],
      room: '',
      roomRules: [
        v => !!v || 'Введите название комнаты',
        v => (v && v.length <= 16) || 'Название комнаты не должно превышать 16 символов'
      ]
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {

        }
      }
    }
  }
</script>

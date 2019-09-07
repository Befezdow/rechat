import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import config from '../config';

export default function({ store }) {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: `http://${config.host}:${config.port}`,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  }));
}

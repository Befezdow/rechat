export const state = () => ({
  user: null,
  messages: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
    state.messages = [];
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  }
};

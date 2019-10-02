export const state = () => ({
  user: null,
  messages: [],
  roomUsers: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
    state.messages = [];
    state.roomUsers = [];
  },
  SOCKET_newMessage(state, message) {
    console.log(message);
    state.messages.push(message);
  },
  SOCKET_updateUsers(state, data) {
    state.roomUsers = data.users;
  }
};

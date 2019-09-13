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
  }
};

export const actions = {
  SOCKET_response(ctx, data) {
    console.log(`Server: ${data.text}`);
  }
};

export const state = () => ({
  user: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

export const actions = {
  SOCKET_response(ctx, data) {
    console.log(`Server: ${data.text}`);
  }
};

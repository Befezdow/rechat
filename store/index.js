export const state = () => {};

export const actions = {
  SOCKET_response(ctx, data) {
    console.log(`Server: ${data.text}`);
  }
};

const IO = require('koa-socket-2');
const io = new IO();

io.on('request', (ctx, data) => {
  console.log(`Client: ${data.text}`);
  setTimeout(() => {
    const messageText = 'U2!';
    ctx.socket.emit('response', { text: messageText });
    console.log(`Server: ${messageText}`);
  }, 1000);
});

module.exports = io;

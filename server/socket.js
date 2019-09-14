const IO = require('koa-socket-2');
const io = new IO();
const { Validator, ErrorTypes } = require('./validator');
const { SignalTypes } = require('./helper');

io.on(SignalTypes.USER_JOINED, (ctx, data) => {
  if (!Validator.validateUserJoined(data)) {
    ctx.acknowledge({
      ok: false,
      error: ErrorTypes.INVALID_DATA
    });
  }

  const userId = ctx.socket.id;
  const response = {
    ok: true,
    data: {
      userId: userId
    }
  };
  ctx.acknowledge(response);
  ctx.socket.emit(SignalTypes.NEW_MESSAGE, {
    sender: 'admin',
    text: `Welcome ${data.name}.`
  });
  ctx.socket.join(data.room);
  ctx.socket.broadcast.to(data.room).emit(SignalTypes.NEW_MESSAGE, {
    sender: 'admin',
    text: `User ${data.name} has joined.`
  });
});

module.exports = io;

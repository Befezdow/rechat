const IO = require('koa-socket-2');
const io = new IO();
const { Validator, ErrorTypes } = require('./validator');
const { SignalTypes } = require('./helper');
const UsersStorage = require('./users');

io.on(SignalTypes.USER_JOINED, (ctx, user) => {
  if (!Validator.validateUserJoined(user)) {
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
    text: `Welcome ${user.name}`,
    isSystem: true
  });
  ctx.socket.join(user.room);

  UsersStorage.removeUser(userId);
  UsersStorage.addUser(userId, user);

  io.to(user.room).emit(SignalTypes.UPDATE_USERS, {
    users: UsersStorage.getUsersByRoomId(user.room)
  });

  ctx.socket.broadcast.to(user.room).emit(SignalTypes.NEW_MESSAGE, {
    text: `User ${user.name} has joined`,
    isSystem: true
  });
});

io.on(SignalTypes.NEW_MESSAGE, (ctx, data) => {
  const userId = ctx.socket.id;
  const user = UsersStorage.getUserById(userId);
  if (!user) {
    ctx.acknowledge({
      ok: false,
      error: ErrorTypes.USER_NOT_FOUND
    });
    return;
  }

  ctx.acknowledge({
    ok: true
  });

  io.to(user.room).emit(SignalTypes.NEW_MESSAGE, {
    senderId: userId,
    senderName: user.name,
    text: data.text,
    isSystem: false
  });
});

io.on(SignalTypes.USER_LEFT, (ctx) => {
  const userId = ctx.socket.id;
  const user = UsersStorage.getUserById(userId);
  if (!user) {
    ctx.acknowledge({
      ok: true,
      error: ErrorTypes.USER_NOT_FOUND
    });
    return;
  }

  UsersStorage.removeUser(userId);

  ctx.socket.broadcast.to(user.room).emit(SignalTypes.UPDATE_USERS, {
    users: UsersStorage.getUsersByRoomId(user.room)
  });

  ctx.socket.broadcast.to(user.room).emit(SignalTypes.NEW_MESSAGE, {
    text: `User ${user.name} has left`,
    isSystem: true
  });

  ctx.acknowledge({
    ok: true
  });
});

module.exports = io;

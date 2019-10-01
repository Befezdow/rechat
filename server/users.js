class UsersStorage {
  constructor() {
    this.users = {};
  }

  addUser(userId, user) {
    this.users[userId] = (user);
  }

  getUserById(userId) {
    const user = this.users[userId];
    return user ? user : null;
  }

  removeUser(userId) {
    delete this.users[userId];
  }

  getUsersByRoomId(roomId) {
    return Object.entries(this.users)
      .filter(([key, value]) => value.room === roomId)
      .map(([key, value]) => ({ id: key, ...value }));
  }
}

module.exports = new UsersStorage();

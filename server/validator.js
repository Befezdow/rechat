const ErrorTypes = {
  INVALID_DATA: 'invalid_data',
  USER_NOT_FOUND: 'user_not_found'
};

class Validator {
  static validateUserJoined(data) {
    return data.name && data.room;
  }
}

module.exports = {
  Validator,
  ErrorTypes: Object.freeze(ErrorTypes)
};

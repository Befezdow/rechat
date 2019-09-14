const ErrorTypes = {
  INVALID_DATA: 'INVALID_DATA'
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

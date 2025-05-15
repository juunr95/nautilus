class MissingObjectKeys extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingObjectKeys';
  }
}

module.exports = MissingObjectKeys;
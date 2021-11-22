module.exports = class ErrorHandle extends Error{
  constructor(title, message) {
      super(message);
      this.title = title;
  }
}
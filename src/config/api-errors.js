class APIError extends Error {
  constructor({ code, message, httpCode }) {
    super(message);
    this.code = code;
    this.httpCode = httpCode;
  }

  response() {
    return { code: this.code, message: this.message };
  }
}

const USER_DOES_NOT_EXIST = new APIError({
  code: "USER_DOES_NOT_EXIST",
  message: "User does not exist",
  httpCode: 401,
});

const EMAIL_ALREADY_IN_USE = new APIError({
  code:"EMAIL_ALREADY_IN_USE",
  message: "The email provided is already in use",
  httpCode: 401
});

const WRONG_PASSWORD = new APIError({
  code:"WRONG_PASSWORD",
  message: "Wrong Password",
  httpCode: 401
});

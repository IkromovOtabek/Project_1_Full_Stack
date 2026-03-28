export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
  SOMETHING_WENT_WRONG = "Something went wrong!",
  NO_DATA_FOUND = "No data is found!",
  CREATED_FAILED = "Created is failed!",
  UPDATE_FAILED = "Update is failed!!",

  USED_NICK_PHONE = "You are inserting already used nick or phone!",
  NO_USER_NICK = "No user with that user Nick!",
  WRONG_PASSWORD = "Wrong password, please try again!",
}

class Errors extends Error {
  public code: HttpCode;
  public message: Message;

  static stadanrd = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: Message.SOMETHING_WENT_WRONG
  }

  constructor(statusCode: HttpCode, statusMessage: Message) {
    super();
    this.code = statusCode;
    this.message = statusMessage;
  }
}

export default Errors;

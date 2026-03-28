import UserModel from "../schema/User.model";
import { LoginInput, User, UserInput } from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { UserType } from "../libs/enums/user.enum";
import * as bcrypt from "bcryptjs";

class UserService {
  private readonly userModel;
  constructor() {
    this.userModel = UserModel;
  }

  /** SPA **/

  public async signup(input: UserInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    input.userPassword = await bcrypt.hash(input.userPassword, salt); //passwordni hash qlib beradi
    
    try {
      const result = await this.userModel.create(input);
      return result.toJSON();
    } catch (err) {
      console.error("Error model:signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<User> {
    //TODO: Consider user status later
    const user = await this.userModel
      .findOne({ userNick: input.userNick }, { userNick: 1, userPassword: 1 })
      .exec();

    if (!user) throw new Errors(HttpCode.NOT_FOUND, Message.NO_USER_NICK);

    const isMatch = await bcrypt.compare(input.userPassword, user.userPassword);

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.userModel.findById(user._id).lean().exec(); //Muvaffaqaiyatli login bolgan Adminga web site ochilishini oladi
  }

  /** SSR **/

  public async processSignup(input: UserInput): Promise<User> {
    const exist = await this.userModel //ADMIN 1 ta bo'lishini taminlaydi
      .findOne({ userType: UserType.ADMIN })
      .exec();
    console.log("exist:", exist); //2 chi ADMIN signup bo'lsa keladgan error
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);

    console.log("before:", input.userPassword);
    const salt = await bcrypt.genSalt();
    input.userPassword = await bcrypt.hash(input.userPassword, salt);
    console.log("after:", input.userPassword);

    try {
      const result = await this.userModel.create(input);
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<User> {
    const user = await this.userModel
      .findOne({ userNick: input.userNick }, { userNick: 1, userPassword: 1 })
      .exec();

    if (!user) throw new Errors(HttpCode.NOT_FOUND, Message.NO_USER_NICK);

    const isMatch = await bcrypt.compare(input.userPassword, user.userPassword);

    // const isMatch = input.userPassword === user.userPassword;

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.userModel.findById(user._id).exec(); //Muvaffaqaiyatli login bolgan Adminga web site ochilishini oladi
  }
}

export default UserService;

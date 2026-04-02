import UserModel from "../schema/User.model";
import { LoginInput, User, UserInput, UserUpdateInput } from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { UserStatus, UserType } from "../libs/enums/user.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/types/config";

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
    const user = await this.userModel
      .findOne(
        { userNick: input.userNick },
        { userNick: 1, userPassword: 1, userStatus: 1 },
      )
      .exec();

    if (!user) throw new Errors(HttpCode.NOT_FOUND, Message.NO_USER_NICK);
    if (user.userStatus === UserStatus.BLOCK || user.userStatus === UserStatus.DELETE) {
      throw new Errors(HttpCode.FORBIDDEN, Message.USER_BLOCKED);
    }

    const isMatch = await bcrypt.compare(input.userPassword, user.userPassword);

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.userModel.findById(user._id).lean().exec(); //Muvaffaqaiyatli login bolgan Adminga web site ochilishini oladi
  }

  public async getTopUsers(limit: number = 5): Promise<User[]> {
    const result = (await this.userModel
      .find({ userType: UserType.USER })
      .sort({ userPoints: -1, createdAt: -1 })
      .limit(Math.min(50, Math.max(1, limit)))
      .lean()
      .exec()) as User[];

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async getStoreContact(): Promise<User | null> {
    const admin = (await this.userModel
      .findOne({ userType: UserType.ADMIN })
      .lean()
      .exec()) as User | null;
    return admin;
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
      console.log(err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<User> {
    const user = await this.userModel
      .findOne(
        { userNick: input.userNick },
        { userNick: 1, userPassword: 1, userStatus: 1 },
      )
      .exec();

    if (!user) throw new Errors(HttpCode.NOT_FOUND, Message.NO_USER_NICK);
    if (user.userStatus === UserStatus.BLOCK || user.userStatus === UserStatus.DELETE) {
      throw new Errors(HttpCode.FORBIDDEN, Message.USER_BLOCKED);
    }

    const isMatch = await bcrypt.compare(input.userPassword, user.userPassword);

    // const isMatch = input.userPassword === user.userPassword;

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.userModel.findById(user._id).exec(); //Muvaffaqaiyatli login bolgan Adminga web site ochilishini oladi
  }

  public async getUsers(): Promise<User[]> {
    const result = await this.userModel
      .find({ userType: UserType.USER })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateChosenUser(input: UserUpdateInput): Promise<User> {
    input._id = shapeIntoMongooseObjectId(input._id); // ObjectId ga aylantirish shapeIntoMongooseObjectId nima qiladi - bu funksiya inputdagi _id ni mongoose ObjectId ga aylantiradi
    const result = await this.userModel
      .findByIdAndUpdate({ _id: input._id }, input, {
        new: true,
        runValidators: true,
      })
      .exec(); //input ni yangilaydi va yangi holatini qaytaradi

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }

}

export default UserService;

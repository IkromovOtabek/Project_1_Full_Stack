import { ObjectId } from "mongoose";
import { UserStatus, UserType } from "../enums/user.enum";
import { Request } from "express";
import { Session } from "express-session";

//Databsega Yuboriladgan malumotlar shu ko'rinishda boradi
export interface User {
  _id: ObjectId;
  userType: UserType;
  userStatus?: UserStatus;
  userNick: string;
  userPhone: string;
  userPassword?: string;
  userAddress?: string;
  userDesc?: string;
  userImage?: string;
  userPoints: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  userType?: UserType;
  userStatus?: UserStatus;
  userNick: string;
  userPhone: string;
  userPassword: string;
  userAddress?: string;
  userDesc?: string;
  userImage?: string;
  userPoints?: string;
}

export interface LoginInput {
  userNick: string;
  userPassword: string;
}

export interface AdminRequest extends Request {
  user: User;
  session: Session & { user: User };
}

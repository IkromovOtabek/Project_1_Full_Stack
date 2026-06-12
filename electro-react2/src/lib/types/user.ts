import { UserStatus, UserType } from "../enums/user.enum";

/** electro/src/libs/types/user.ts bilan mos (clientda _id string) */
export interface User {
  _id: string;
  userType: UserType;
  userStatus?: UserStatus;
  userNick: string;
  userPhone: string;
  userPassword?: string;
  userAddress?: string;
  userDesc?: string;
  userImage?: string;
  userPoints: number;
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
  userPoints?: number;
}

export interface LoginInput {
  userNick: string;
  userPassword: string;
}

export interface UserUpdateInput {
  _id?: string;
  userStatus?: UserStatus;
  userNick?: string;
  userPhone?: string;
  userPassword?: string;
  userAddress?: string;
  userDesc?: string;
  userImage?: string | File;
}

import mongoose, { Schema } from "mongoose";
import { UserStatus, UserType } from "../libs/enums/user.enum";

// memberschemani 2 xil usulda qursa buladi 1-Schema first va Code first orqali quriladi bu qurganimiz schama based
const userSchema = new Schema(
  {
    userType: {
      type: String,
      enum: UserType,
      default: UserType.USER,
    },

    userStatus: {
      type: String,
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    },

    userNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    userPhone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    userPassword: {
      type: String,
      select: false,
      required: true,
    },
    userAddress: {
      type: String,
    },

    userDesc: {
      type: String,
    },

    userImage: {
      type: String,
    },

    userPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }, // updatedAt, createdAt bu bizda updatedAt va createdAt qachon hosil bulganini quyib beradi
);

export default mongoose.model('User', userSchema);
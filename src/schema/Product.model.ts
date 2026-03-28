import mongoose, { Schema } from "mongoose";
import {
  ProductCollection,
  ProductCondission,
  ProductStatus,
  ProductVolume,
} from "../libs/enums/product.enum";
// memberschemani 2 xil usulda qursa buladi 1-Schema first va Code first orqali quriladi bu qurganimiz schama based
const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PAUSE,
    },
    productCollection: {
      type: String,
      enum: ProductCollection,
      required: true,
    },
    productCondission: {
      type: String,
      required: true,
      default: ProductCondission.OLD,
    },
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productLeftCount: {
      type: Number,
      required: true,
    },
    productVolume: {
      type: Number,
      enum: ProductVolume,
      default: ProductVolume.ONE,
    },
    productDesc: {
      type: String,
    },
    productImages: {
      type: [String], // Rasm URL-larini saqlash uchun massiv
      default: [],
    },
    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }, // updatedAt, createdAt bu bizda updatedAt va createdAt qachon hosil bulganini quyib beradi
);
productSchema.index(
  { productName: 1, productCondission: 1, productVolume: 1 },
  { unique: true },
);

export default mongoose.model("Product", productSchema);

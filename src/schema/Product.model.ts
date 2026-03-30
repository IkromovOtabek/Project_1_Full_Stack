import mongoose, { Schema } from "mongoose";
import {
  ProductCollection,
  ProductCondission,
  ProductStatus,
} from "../libs/enums/product.enum";

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
    // YANGI QO'SHILGAN MAYDONLAR:
    productmemory: {
      type: String, // Masalan: "128GB", "256GB"
    },
    productSize: {
      type: String, // Agar kiyim yoki boshqa narsa bo'lsa: "S", "M", "L"
    },
    productDesc: {
      type: String,
    },
    productImages: {
      type: [String],
      default: [],
    },
    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Diqqat: index qismidagi unique: true faqat mahsulot nomi uchun bo'lishi tavsiya etiladi.
// Rasm massivi va Tavsif bo'yicha unique qilish xatolik berishi mumkin.
productSchema.index(
  { productName: 1, productPrice: 1 }, 
  { unique: true }
);

export default mongoose.model("Product", productSchema);
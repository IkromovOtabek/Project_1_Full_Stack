import mongoose, { Schema } from "mongoose";
import { OrderStatus } from "../libs/enums/order.enum";

const orderItemSchema = new Schema(
  {
    itemQuantity: { type: Number, required: true, min: 1 },
    itemPrice: { type: Number, required: true, min: 0 },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { _id: true },
);

const orderSchema = new Schema(
  {
    orderTotal: { type: Number, required: true, min: 0 },
    orderDelivery: { type: Number, required: true, min: 0, default: 0 },
    orderStatus: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PAUSE,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    orderItems: { type: [orderItemSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);

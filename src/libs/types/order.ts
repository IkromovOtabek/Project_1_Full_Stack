import { ObjectId } from "mongoose";
import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: ObjectId | string;
}

export interface OrderItem {
  _id: ObjectId;
  itemQuantity: number;
  itemPrice: number;
  productId: ObjectId | string;
}

export interface Order {
  _id: ObjectId;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  userId: ObjectId | string;
  orderItems: OrderItem[];
  productData?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus?: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: ObjectId | string;
  orderStatus: OrderStatus;
}

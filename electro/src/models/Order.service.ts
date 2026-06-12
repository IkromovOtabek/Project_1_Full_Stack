import Errors, { HttpCode, Message } from "../libs/Errors";
import { OrderStatus } from "../libs/enums/order.enum";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../libs/types/order";
import ProductModel from "../schema/Product.model";
import OrderModel from "../schema/Order.model";
import { T } from "../libs/types/common";

class OrderService {
  private readonly orderModel;
  private readonly productModel;

  constructor() {
    this.orderModel = OrderModel;
    this.productModel = ProductModel;
  }

  public async createOrder(userId: string, items: OrderItemInput[]): Promise<Order> {
    if (!items.length) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }

    const normalizedItems = items.map((item) => ({
      itemQuantity: Math.max(1, Number(item.itemQuantity || 0)),
      itemPrice: Math.max(0, Number(item.itemPrice || 0)),
      productId: shapeIntoMongooseObjectId(item.productId),
    }));

    const orderTotal = normalizedItems.reduce(
      (sum, item) => sum + item.itemQuantity * item.itemPrice,
      0,
    );
    const orderDelivery = orderTotal > 0 && orderTotal < 100 ? 5 : 0;

    const result = (await this.orderModel.create({
      userId: shapeIntoMongooseObjectId(userId),
      orderItems: normalizedItems,
      orderTotal: Number((orderTotal + orderDelivery).toFixed(2)),
      orderDelivery,
      orderStatus: OrderStatus.PAUSE,
    })) as Order;

    return result;
  }

  public async getMyOrders(userId: string, inquiry: OrderInquiry): Promise<Order[]> {
    const page = Math.max(1, Number(inquiry.page ?? 1));
    const limit = Math.min(50, Math.max(1, Number(inquiry.limit ?? 10)));
    const skip = (page - 1) * limit;

    const query: T = {
      userId: shapeIntoMongooseObjectId(userId),
      orderStatus: { $ne: OrderStatus.DELETE },
    };
    if (inquiry.orderStatus) query.orderStatus = inquiry.orderStatus;

    const orders = (await this.orderModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec()) as Order[];

    const productIds = orders.flatMap((order) =>
      order.orderItems.map((item) => String(item.productId)),
    );
    const products = await this.productModel
      .find({ _id: { $in: productIds.map((id) => shapeIntoMongooseObjectId(id)) } })
      .lean()
      .exec();
    const productMap = new Map(products.map((product: any) => [String(product._id), product]));

    return orders.map((order) => ({
      ...order,
      productData: order.orderItems
        .map((item) => productMap.get(String(item.productId)))
        .filter(Boolean),
    }));
  }

  public async updateOrder(userId: string, input: OrderUpdateInput): Promise<Order> {
    const result = (await this.orderModel
      .findOneAndUpdate(
        {
          _id: shapeIntoMongooseObjectId(input.orderId),
          userId: shapeIntoMongooseObjectId(userId),
        },
        { orderStatus: input.orderStatus },
        { new: true },
      )
      .lean()
      .exec()) as Order | null;

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result;
  }
}

export default OrderService;

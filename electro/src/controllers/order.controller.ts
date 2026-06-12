import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import OrderService from "../models/Order.service";
import { OrderInquiry, OrderItemInput, OrderUpdateInput } from "../libs/types/order";

const orderService = new OrderService();
const orderController: T = {};

orderController.createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as T)?.user?._id;
    if (!userId) throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

    const items = req.body as OrderItemInput[];
    const result = await orderService.createOrder(String(userId), items);
    res.json(result);
  } catch (err) {
    console.log("Error createOrder", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

orderController.getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as T)?.user?._id;
    if (!userId) throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

    const inquiry: OrderInquiry = {
      page: Number((req.query as T).page ?? 1),
      limit: Number((req.query as T).limit ?? 5),
      orderStatus: (req.query as T).orderStatus,
    };

    const result = await orderService.getMyOrders(String(userId), inquiry);
    res.json(result);
  } catch (err) {
    console.log("Error getMyOrders", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

orderController.updateOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as T)?.user?._id;
    if (!userId) throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

    const input = req.body as OrderUpdateInput;
    const result = await orderService.updateOrder(String(userId), input);
    res.json(result);
  } catch (err) {
    console.log("Error updateOrder", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

export default orderController;

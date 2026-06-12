import axios from "axios";
import { serverApi } from "../lib/config";
import { Order, OrderInquery, OrderItemInput, OrderUpdateInput } from "../lib/types/order";
import { CardItem } from "../lib/types/search";

class OrderService{
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async createOrder(input: CardItem[]): Promise<Order> {
        try {
            const orderItems:OrderItemInput[] = input.map((cartItem: CardItem) => {
                return{
                    itemQuantity: Number(cartItem.quantity) || 0,
                    itemPrice: Number(cartItem.price) || 0,
                    productId: cartItem._id,

                }
            }).filter((item) => item.itemQuantity > 0 && item.itemPrice >= 0 && !!item.productId);

            if (orderItems.length === 0) {
                throw new Error("Basket is empty");
            }

            const url = this.path + "/order/create";
            const result = await axios.post(url, orderItems, {
                withCredentials: true
            });
            console.log("createOrder", result);
            return result.data;



        } catch(err) {
            console.log("Error. createOrder", err)
            throw err;
        }


    }

    public async getMyOrders(input: OrderInquery): Promise<Order[]> {
        try {

        const url = `${this.path}/order/all`;
        const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
        const result = await axios.get(url+query, {withCredentials: true});

        console.log("getMyOrders:", result);
        
        return result.data

        } catch(err) {
            console.log("Error. getMyOrders", err);
            throw err;
        }


    }

     public async updateOrder(input: OrderUpdateInput): Promise<Order> {
        try {

        const url = `${this.path}/order/update`;
        const result = await axios.post(url, input,{withCredentials: true});
        console.log("updateOrder:", result);
        return result.data
            


        } catch(err) {
            console.log("Error. updateOrder", err);
            throw err;
        }


    }






}


export default OrderService;
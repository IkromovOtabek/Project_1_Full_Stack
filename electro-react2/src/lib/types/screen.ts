import { User } from "./user";
import { Order } from "./order";
import { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/** HOME PAGE **/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: User[];
}

/** PRODUCTS PAGE **/
export interface ProductsPageState {
  restaurant: User | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** ORDER PAGE **/
export interface OrdersPageState {
  pausedOrders: Order[];
  proccessOrders: Order[];
  finishedOrders: Order[];
}

import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState = {
  pausedOrders: [],
  proccessOrders: [],
  finishedOrders: [],
};

const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPausedOrders(state, action) {
      state.pausedOrders = action.payload;
    },
    setProccessOrders(state, action) {
      state.proccessOrders = action.payload;
    },
    setFinishedOrders(state, action) {
      state.finishedOrders = action.payload;
    },
  },
});

export const { setPausedOrders, setProccessOrders, setFinishedOrders } =
  ordersPageSlice.actions;

const ordersPageReducer = ordersPageSlice.reducer;
export default ordersPageReducer;
 
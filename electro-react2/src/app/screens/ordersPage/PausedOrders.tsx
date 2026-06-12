import React from "react";
import { Box, Stack, Button, Typography, Divider } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { serverApi, Messages } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const pausedOrdersRetriever = createSelector(retrievePausedOrders, (p) => ({ pausedOrders: p }));

export default function PausedOrders({ setValue }: { setValue: (v: string) => void }) {
  const { authUser, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  const updateStatus = async (orderId: string, status: OrderStatus, msg: string, tab?: string) => {
    try {
      if (!authUser) throw new Error(Messages.error2);
      if (window.confirm(msg)) {
        const order = new OrderService();
        await order.updateOrder({ orderId, orderStatus: status });
        if (tab) setValue(tab);
        setOrderBuilder(new Date());
      }
    } catch (err) { sweetErrorHandling(err).then(); }
  };

  return (
    <TabPanel value="1" sx={{ p: 0 }}>
      <Stack spacing={3}>
        {pausedOrders?.map((order: Order) => (
          <Box key={order._id} sx={{ background: "rgba(255,255,255,0.05)", borderRadius: "24px", p: 3, border: "1px solid rgba(255,255,255,0.08)" }}>
            <Stack spacing={2} sx={{ mb: 3 }}>
              {order.orderItems.map((item: OrderItem) => {
                const product = order.productData.find(p => p._id === item.productId);
                return (
                  <Stack key={item._id} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <img src={`${serverApi}/${product?.productImages[0]}`} style={{ width: 50, height: 50, borderRadius: "12px", objectFit: "cover" }} alt="dish" />
                      <Typography sx={{ color: "#fff", fontWeight: "600", fontSize: "14px" }}>{product?.productName}</Typography>
                    </Stack>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                      ${item.itemPrice} x {item.itemQuantity} = <span style={{ color: "#3b82f6" }}>${item.itemQuantity * item.itemPrice}</span>
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.05)", mb: 2 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>TOTAL AMOUNT</Typography>
                <Typography sx={{ color: "#3b82f6", fontWeight: "900", fontSize: "20px" }}>${order.orderTotal}</Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button onClick={() => updateStatus(order._id, OrderStatus.DELETE, "Cancel order?")} sx={{ color: "#ef4444", fontWeight: "bold", textTransform: 'none' }}>Cancel</Button>
                <Button onClick={() => updateStatus(order._id, OrderStatus.PROCESS, "Proceed to payment?", "2")} variant="contained" sx={{ bgcolor: "#3b82f6", borderRadius: "12px", px: 4 }}>Pay Now</Button>
              </Stack>
            </Stack>
          </Box>
        ))}
        {(!pausedOrders || pausedOrders.length === 0) && <Stack alignItems="center" sx={{ py: 5, opacity: 0.2 }}><img src="/icons/noimage-list.svg" width="200" alt="empty" /></Stack>}
      </Stack>
    </TabPanel>
  );
}
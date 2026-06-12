import React from "react";
import { Box, Stack, Button, Typography, Divider } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProccessOrders } from "./selector";
import { serverApi, Messages } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../../services/OrderService";

const processOrdersRetriever = createSelector(retrieveProccessOrders, (p) => ({ processOrders: p }));

export default function ProcessOrders({ setValue }: { setValue: (v: string) => void }) {
  const { authUser, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  const finishOrder = async (orderId: string) => {
    try {
      if (!authUser) throw new Error(Messages.error2);
      if (window.confirm("Have you received your order?")) {
        const order = new OrderService();
        await order.updateOrder({ orderId, orderStatus: OrderStatus.FINISH });
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) { sweetErrorHandling(err).then(); }
  };

  return (
    <TabPanel value="2" sx={{ p: 0 }}>
      <Stack spacing={3}>
        {processOrders?.map((order: Order) => (
          <Box key={order._id} sx={{ background: "rgba(255,255,255,0.05)", borderRadius: "24px", p: 3, border: "1px solid rgba(255,255,255,0.08)" }}>
            <Stack spacing={2} sx={{ mb: 2 }}>
              {order.orderItems.map((item: OrderItem) => {
                const product = order.productData.find(p => p._id === item.productId);
                return (
                  <Stack key={item._id} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <img src={`${serverApi}/${product?.productImages[0]}`} style={{ width: 45, height: 45, borderRadius: "10px", objectFit: "cover" }} alt="dish" />
                      <Typography sx={{ color: "#fff", fontSize: "14px" }}>{product?.productName}</Typography>
                    </Stack>
                    <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Qty: {item.itemQuantity}</Typography>
                  </Stack>
                );
              })}
            </Stack>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.05)", my: 2 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>ESTIMATED AT</Typography>
                <Typography sx={{ color: "#fff", fontSize: "13px" }}>{moment(order.createdAt).add(30, 'minutes').format("HH:mm")}</Typography>
              </Box>
              <Typography sx={{ color: "#3b82f6", fontWeight: "bold", fontSize: "18px" }}>${order.orderTotal}</Typography>
              <Button onClick={() => finishOrder(order._id)} variant="contained" sx={{ bgcolor: "#10b981", borderRadius: "12px", "&:hover": { bgcolor: "#059669" } }}>Verify Receive</Button>
            </Stack>
          </Box>
        ))}
        {(!processOrders || processOrders.length === 0) && <Stack alignItems="center" sx={{ py: 5, opacity: 0.2 }}><img src="/icons/noimage-list.svg" width="200" alt="empty" /></Stack>}
      </Stack>
    </TabPanel>
  );
}
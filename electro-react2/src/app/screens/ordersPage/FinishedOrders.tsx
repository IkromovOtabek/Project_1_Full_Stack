import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";

const finishedOrdersRetriever = createSelector(retrieveFinishedOrders, (p) => ({ finishedOrders: p }));

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value="3" sx={{ p: 0 }}>
      <Stack spacing={3}>
        {finishedOrders?.map((order: Order) => (
          <Box key={order._id} sx={{ background: "rgba(255,255,255,0.03)", borderRadius: "24px", p: 3, border: "1px solid rgba(255,255,255,0.05)", opacity: 0.7 }}>
            <Stack spacing={1} sx={{ mb: 2 }}>
              {order.orderItems.map((item: OrderItem) => {
                const product = order.productData?.find(p => p._id === item.productId);
                return (
                  <Stack key={item._id} direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>{product?.productName} x {item.itemQuantity}</Typography>
                    <Typography sx={{ color: "#fff", fontWeight: "600" }}>${item.itemQuantity * item.itemPrice}</Typography>
                  </Stack>
                );
              })}
            </Stack>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.05)", mb: 2 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>COMPLETED</Typography>
              <Typography sx={{ color: "#10b981", fontWeight: "bold" }}>Total: ${order.orderTotal}</Typography>
            </Stack>
          </Box>
        ))}
        {(!finishedOrders || finishedOrders.length === 0) && <Stack alignItems="center" sx={{ py: 5, opacity: 0.1 }}><img src="/icons/noimage-list.svg" width="200" alt="empty" /></Stack>}
      </Stack>
    </TabPanel>
  );
}
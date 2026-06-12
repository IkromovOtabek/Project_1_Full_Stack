import React, { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box, Tabs, Tab, Typography, Divider, TextField } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProccessOrders, setFinishedOrders } from "./slice";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { Order, OrderInquery } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import OrderService from "../../../services/OrderService";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProccessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
  const { orderBuilder, authUser } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry] = useState<OrderInquery>({ page: 1, limit: 5, orderStatus: OrderStatus.PAUSE });

  /** 
   * 404 va boshqa xatolarni oldini olish uchun useEffect ichida 
   * so'rovlarni async/await va try/catch bilan yozamiz
   */
  useEffect(() => {
    // Agar user login qilmagan bo'lsa so'rov yubormaslik (401/404 oldini olish)
    if (!authUser) return;

    const order = new OrderService();
    
    const fetchAllOrders = async () => {
      try {
        // Hammasini parallel yuboramiz, lekin har birini alohida ushlaymiz
        const [paused, process, finished] = await Promise.all([
          order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE }).catch(e => { console.error("Paused error:", e); return []; }),
          order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS }).catch(e => { console.error("Process error:", e); return []; }),
          order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH }).catch(e => { console.error("Finish error:", e); return []; }),
        ]);

        setPausedOrders(paused);
        setProcessOrders(process);
        setFinishedOrders(finished);
      } catch (err) {
        console.log("Global fetch orders error:", err);
      }
    };

    fetchAllOrders();
  }, [orderInquiry, orderBuilder, authUser, setPausedOrders, setProcessOrders, setFinishedOrders]);

  const handleChange = (e: SyntheticEvent, newValue: string) => setValue(newValue);

  // User auth bo'lmasa redirect
  if (!authUser) {
    history.push("/");
    return null;
  }

  return (
    <Box sx={{ 
      background: "radial-gradient(circle at center, #111827 0%, #020617 100%)", 
      minHeight: "100vh", 
      pt: "120px", // Navbar uchun 120px joy
      pb: 10 
    }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="flex-start">
          
          {/* LEFT: Order Lists */}
          <Stack sx={{ flex: 1, width: "100%" }}>
            <TabContext value={value}>
              <Box sx={{ 
                background: "rgba(255,255,255,0.03)", 
                backdropFilter: "blur(20px)", 
                borderRadius: "24px", 
                border: "1px solid rgba(255,255,255,0.1)",
                mb: 4, p: 1
              }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  sx={{
                    "& .MuiTabs-indicator": { bgcolor: "#3b82f6", height: 3, borderRadius: '3px' },
                    "& .MuiTab-root": { color: "rgba(255,255,255,0.4)", fontWeight: "bold", py: 2 },
                    "& .Mui-selected": { color: "#3b82f6 !important" }
                  }}
                >
                  <Tab label="PAUSED" value="1" />
                  <Tab label="PROCESS" value="2" />
                  <Tab label="FINISHED" value="3" />
                </Tabs>
              </Box>

              <Stack spacing={3}>
                <PausedOrders setValue={setValue} />
                <ProcessOrders setValue={setValue} />
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Stack>

          {/* RIGHT: Profile & Payment (Sticky) */}
          <Stack spacing={4} sx={{ 
            width: { xs: "100%", md: "380px" }, 
            position: { md: "sticky" }, 
            top: "120px" // Scroll bo'lganda Navbar ostida qotib turishi uchun
          }}>
            {/* User Profile Card */}
            <Box sx={{ 
              background: "rgba(255,255,255,0.03)", 
              backdropFilter: "blur(20px)", 
              borderRadius: "32px", p: 4, textAlign: "center",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <Box sx={{ position: "relative", width: 90, height: 90, margin: "0 auto 15px" }}>
                <img 
                  src={authUser?.userImage ? `${serverApi}/${authUser.userImage}` : "/icons/default-user.svg"} 
                  style={{ width: "100%", height: "100%", borderRadius: "50%", border: "2px solid #3b82f6", objectFit: "cover" }} 
                  alt="me" 
                  onError={(e) => { (e.target as any).src = "/icons/default-user.svg" }} // Rasm 404 bo'lsa defaultni qo'yish
                />
              </Box>
              <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "800" }}>{authUser?.userNick}</Typography>
              <Typography sx={{ color: "#3b82f6", fontWeight: "bold", fontSize: "13px", mb: 2 }}>{authUser?.userType}</Typography>
              <Divider sx={{ bgcolor: "rgba(255,255,255,0.05)", my: 2 }} />
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ color: "rgba(255,255,255,0.5)" }}>
                <LocationOnIcon fontSize="small" sx={{ color: "#3b82f6" }} />
                <Typography variant="body2">{authUser?.userAddress || "No address"}</Typography>
              </Stack>
            </Box>

            {/* Payment Input Card */}
            <Box sx={{ 
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", 
              borderRadius: "24px", p: 4, 
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}>
              <Typography sx={{ color: "#3b82f6", fontSize: "12px", fontWeight: "900", mb: 3, letterSpacing: 1.5 }}>SECURE PAYMENT</Typography>
              <Stack spacing={2.5}>
                <TextField 
                  fullWidth size="small" label="Card Number" defaultValue="5243 4090 2002 7495"
                  variant="outlined"
                  sx={{ 
                    '& label': { color: 'rgba(255,255,255,0.4)' },
                    '& input': { color: '#fff' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                      '&:hover fieldset': { borderColor: '#3b82f6' },
                    }
                  }} 
                />
                <Stack direction="row" spacing={2}>
                  <TextField 
                    size="small" label="Expiry Date" defaultValue="07/24"
                    sx={{ 
                      '& label': { color: 'rgba(255,255,255,0.4)' },
                      '& input': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                      }
                    }} 
                  />
                  <TextField 
                    size="small" label="CVV" defaultValue="010"
                    sx={{ 
                      '& label': { color: 'rgba(255,255,255,0.4)' },
                      '& input': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                      }
                    }} 
                  />
                </Stack>
              </Stack>
              
              {/* Card Icons - Default rangda */}
              <Stack direction="row" justifyContent="space-between" mt={4}>
                {["western-card", "master-card", "paypal-card", "visa-card"].map(c => (
                  <img key={c} src={`/icons/${c}.svg`} width="38" alt={c} style={{ filter: "none", opacity: 1 }} />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
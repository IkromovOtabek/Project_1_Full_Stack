import React from "react";
import { Box, Stack, Typography, Card, CardCover, CardContent } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import { Container } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const popularDishesRetriever = createSelector(
  retrievePopularDishes, 
  (popularDishes) => ({ popularDishes })
);

export default function PopularProducts() {
  const { popularDishes } = useSelector(popularDishesRetriever);

  // Faqat eng mashhur top 4 ta mahsulotni olish
  const topFourProducts = popularDishes.slice(0, 4);

  return (
    <CssVarsProvider>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="flex-end" 
            sx={{ mb: 4 }}
          >
            <Box>
              <Typography 
                sx={{ 
                  color: "#3b82f6", 
                  fontWeight: "bold", 
                  letterSpacing: "2px", 
                  fontSize: "14px", 
                  textTransform: "uppercase",
                  mb: 1
                }}
              >
                Exclusive Choice
              </Typography>
              <Typography 
                level="h2" 
                sx={{ color: "#fff", fontWeight: "800", fontSize: "36px" }}
              >
                Popular Products
              </Typography>
            </Box>
          </Stack>

          <Stack 
            direction="row" 
            spacing={3} 
            sx={{ 
              display: "flex",
              justifyContent: "space-between",
              flexWrap: { xs: "nowrap", md: "nowrap" },
              overflowX: { xs: "auto", md: "visible" },
              pb: { xs: 2, md: 0 },
              "&::-webkit-scrollbar": { display: "none" }
            }}
          >
            {topFourProducts.length !== 0 ? (
              topFourProducts.map((product: Product) => (
                <Card 
                  key={product._id} 
                  sx={{ 
                    width: { xs: "280px", md: "25%" }, // 4 ta bo'lgani uchun 25% (spacing bilan hisoblanadi)
                    minWidth: "260px",
                    height: 400, // Karta balandligi
                    border: "none", 
                    borderRadius: "32px",
                    background: "#000", // Rasm yuklanguncha qora bo'lib turadi
                    overflow: "hidden", 
                    transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": { 
                      transform: "translateY(-10px)", 
                      boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                      "& img": { transform: "scale(1.1)" } // Hoverda rasm yaqinlashadi
                    }
                  }}
                >
                  {/* RASM QISMI - KARTANI TO'LIQ EGALLAYDI */}
                  <CardCover>
                    <img 
                      src={`${serverApi}/${product.productImages[0]}`} 
                      loading="lazy" 
                      alt={product.productName} 
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover", // Rasmni proporsiyasini buzmasdan to'ldiradi
                        transition: "0.6s ease" 
                      }}
                    />
                  </CardCover>
                  
                  {/* Badge - O'ng yuqori burchak */}
                  <Box sx={{ 
                    position: "absolute", 
                    top: 20, 
                    right: 20, 
                    bgcolor: "rgba(59, 130, 246, 0.9)", 
                    backdropFilter: "blur(10px)",
                    px: 1.8, 
                    py: 0.6, 
                    borderRadius: "14px", 
                    color: "#fff",
                    fontSize: "11px", 
                    fontWeight: "800", 
                    zIndex: 2,
                    textTransform: "uppercase"
                  }}>
                    {product.productCondission || "Top"}
                  </Box>

                  {/* Gradient qatlam - Matnlar o'qilishi uchun pastdan yuqoriga qoraytirish */}
                  <CardCover 
                    sx={{ 
                      background: "linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.3) 50%, transparent 100%)",
                      zIndex: 1
                    }} 
                  />
                  
                  {/* Kontent qismi */}
                  <CardContent sx={{ justifyContent: "flex-end", p: 3, zIndex: 2 }}>
                    <Typography 
                      level="title-lg" 
                      sx={{ color: "#fff", mb: 0.5, fontWeight: "700", fontSize: "19px" }}
                    >
                      {product.productName}
                    </Typography>
                    
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography 
                        sx={{ color: "#3b82f6", fontWeight: "800", fontSize: "22px" }}
                      >
                        ${product.productPrice}
                      </Typography>
                      
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ opacity: 0.8 }}>
                         <VisibilityIcon sx={{ fontSize: "18px", color: "#fff" }} />
                         <Typography sx={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>
                           {product.productViews}
                         </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            ) : null}
          </Stack>
        </Container>
      </Box>
    </CssVarsProvider>
  );
}
import React from "react";
import { Box, Stack, Typography, Card, CardOverflow, AspectRatio } from "@mui/joy";
import { Container } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({ newDishes }));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Typography level="h2" sx={{ mb: 4, color: "#fff", fontWeight: "700" }}>New Releases</Typography>
        <Stack direction="row" spacing={3} sx={{ overflowX: "auto", pb: 3, scrollSnapType: "x mandatory", "&::-webkit-scrollbar": { display: "none" } }}>
          {newDishes.map((product: Product) => (
            <Card key={product._id} sx={{ 
              width: { xs: "280px", md: "25%" },
              minWidth: "260px",
              height: 400,
              borderRadius: "28px",
              p: 2,
              background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255,255,255,0.1)",
              scrollSnapAlign: "start"
            }}>
              <CardOverflow sx={{ position: "relative" }}>
                <AspectRatio ratio="1" sx={{ borderRadius: "20px", overflow: "hidden" }}>
                  <img src={`${serverApi}/${product.productImages[0]}`} alt="" />
                </AspectRatio>
                {/* Badge Top Right */}
                <Box sx={{ 
                    position: "absolute", top: 12, right: 12, 
                    bgcolor: "#3b82f6", px: 1.5, py: 0.4, 
                    borderRadius: "10px", color: "#fff", fontSize: "11px", fontWeight: "800"
                }}>
                  {product.productCondission || "NEW"}
                </Box>
              </CardOverflow>
              <Stack sx={{ mt: 2 }}>
                <Typography sx={{ color: "#fff", fontWeight: "600", fontSize: "18px" }}>{product.productName}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                  <Typography sx={{ color: "#3b82f6", fontWeight: "bold" }}>${product.productPrice}</Typography>
                  <Typography startDecorator={<VisibilityIcon fontSize="small" />} sx={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                    {product.productViews}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
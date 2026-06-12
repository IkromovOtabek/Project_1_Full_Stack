import React, { useEffect, useState } from "react";
import { 
  Box, Container, Stack, Typography, Button, AspectRatio, 
  Divider 
} from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setChosenProduct } from "./slice";
import ProductService from "../../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { CardItem } from "../../../lib/types/search";
import { createSelector } from "reselect";
import { retrieveChosenProduct } from "./selector";
import "../../../css/product.css";

const chosenProductRetriever = createSelector(retrieveChosenProduct, (p) => ({ chosenProduct: p }));

export default function ChosenProduct({ onAdd }: { onAdd: (item: CardItem) => void }) {
  const { productId } = useParams<{ productId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { chosenProduct } = useSelector(chosenProductRetriever);

  // States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (!productId) {
      history.push("/products");
      return;
    }

    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => dispatch(setChosenProduct(data)))
      .catch((err) => {
        console.error("Chosen product load failed:", err);
        history.push("/products");
      });
  }, [productId, dispatch, history]);

  if (!chosenProduct) return null;

  return (
    <CssVarsProvider>
      <Box className="products-page" sx={{ pt: 15, pb: 10 }}>
        <Container>
          <Stack 
            direction={{ xs: "column", md: "row" }} 
            spacing={8} 
            alignItems="center" 
            justifyContent="center" 
            sx={{ 
              background: "rgba(255, 255, 255, 0.03)", 
              backdropFilter: "blur(20px)", 
              borderRadius: "40px", 
              p: { xs: 3, md: 8 }, 
              border: "1px solid rgba(255, 255, 255, 0.08)" 
            }}
          >
            {/* Slider Section */}
            <Box sx={{ 
              flex: 0.8, 
              maxWidth: "400px", 
              width: "100%", 
              borderRadius: "32px", 
              overflow: "hidden"
            }}>
              <Swiper loop navigation modules={[Navigation, Autoplay]} autoplay={{ delay: 3500 }}>
                {chosenProduct.productImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <AspectRatio ratio="1">
                      <img src={`${serverApi}/${img}`} style={{ objectFit: "cover" }} alt="product" />
                    </AspectRatio>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            {/* Info Section */}
            <Stack sx={{ flex: 1.2 }} spacing={3}>
              <Box>
                <Typography sx={{ color: "#3b82f6", fontWeight: "bold", fontSize: "14px", letterSpacing: "2px", mb: 1 }}>
                  {chosenProduct.productCollection}
                </Typography>
                <Typography sx={{ color: "#fff", fontSize: { xs: "32px", md: "44px" }, fontWeight: "800", mb: 1 }}>
                  {chosenProduct.productName}
                </Typography>
                
                {/* Reyting Tizimi (KO'K RANGGA O'ZGARTIRILDI) */}
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon 
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      sx={{ 
                        fontSize: "32px", 
                        cursor: "pointer",
                        transition: "0.2s",
                        transform: (hoverRating || rating) >= star ? "scale(1.2)" : "scale(1)",
                        // Tanlanganda ham, mouse borganda ham KO'K rang
                        color: (hoverRating || rating) >= star ? "#3b82f6" : "rgba(255,255,255,0.2)" 
                      }}
                    />
                  ))}
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", ml: 2, fontSize: "14px", fontWeight: "600" }}>
                    {rating > 0 ? `Rating: ${rating}/5` : "Rate this product"}
                  </Typography>
                </Stack>

                <Typography startDecorator={<VisibilityIcon sx={{ color: "#3b82f6" }} />} sx={{ color: "rgba(255,255,255,0.4)" }}>
                  {chosenProduct.productViews} Views
                </Typography>
              </Box>

              <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", lineHeight: 1.6 }}>
                {chosenProduct.productDesc || "Premium device with cutting-edge technology and exceptional build quality."}
              </Typography>

              {/* Price & Basket */}
              <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                sx={{ mt: 4, p: 3, borderRadius: "24px", bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "1px" }}>PRICE</Typography>
                  <Typography sx={{ color: "#fff", fontSize: "34px", fontWeight: "900" }}>${chosenProduct.productPrice}</Typography>
                </Box>
                <Button 
                  onClick={() => onAdd({ _id: chosenProduct._id, quantity: 1, name: chosenProduct.productName, price: chosenProduct.productPrice, image: chosenProduct.productImages[0] })} 
                  sx={{ 
                    borderRadius: "20px", px: 6, py: 1.5, bgcolor: "#3b82f6", fontWeight: "bold",
                    "&:hover": { bgcolor: "#2563eb" } 
                  }}
                >
                  Add To Basket
                </Button>
              </Stack>
            </Stack>
          </Stack>

        </Container>
      </Box>
    </CssVarsProvider>
  );
}
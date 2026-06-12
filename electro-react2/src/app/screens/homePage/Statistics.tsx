import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Swiper stillari
import "swiper/css";

const brands = [
  { name: "Apple", icon: "/icons/apple.png" },
  { name: "Samsung", icon: "/icons/samsung.png" },
  { name: "Tesla", icon: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { name: "Sony", icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { name: "Beats", icon: "/icons/beats.png" },
  { name: "Bose", icon: "/icons/bose.png" },
  { name: "Meta", icon: "/icons/meta.svg" },
  { name: "Asus", icon: "/icons/asus.png" },
  { name: "Lg", icon: "/icons/lgl.png" },
  { name: "JBL", icon: "/icons/jbl.png" },
];

export default function BrandCarousel() {
  return (
    <Box sx={{ py: 6, width: "100%", overflow: "hidden" }}>
      {/* Yuqori yozuv */}
      <Typography 
        textAlign="center" 
        sx={{ 
          color: "rgba(255,255,255,0.2)", 
          fontSize: "13px", 
          fontWeight: 800, 
          letterSpacing: "5px", 
          mb: 4,
          textTransform: "uppercase",
        }}
      >
        Official Tech Partners
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          // Bo'yi 40px ga oshirildi (50px dan 70px ga: 20px tepa + 20px past = 40px)
          p: "70px 0", 
          background: "transparent",
          overflow: "hidden",
          
          /* Chekkalarni "yo'qotish" va kirib-chiqish effekti uchun gradient mask */
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            width: { xs: "100px", md: "250px" },
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          },

          /* Swiper to'xtamasdan (linear) harakatlanishi uchun */
          "& .swiper-wrapper": {
            transitionTimingFunction: "linear !important",
          }
        }}
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={2}
          loop={true}
          speed={5000}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
            1440: { slidesPerView: 6 },
          }}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <Stack alignItems="center" spacing={4}>
                <Box
                  component="img"
                  src={brand.icon}
                  alt={brand.name}
                  sx={{
                    height: { xs: "100px", md: "95px" }, 
                    maxWidth: "150px",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1) opacity(0.4)",
                    transition: "0.4s",
                    "&:hover": {
                      filter: "brightness(0) invert(1) opacity(1)",
                      transform: "scale(1.1)"
                    }
                  }}
                />
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase"
                  }}
                >
                  {brand.name}
                </Typography>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
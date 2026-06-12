import React from "react";
import { Box, Stack, Typography, Card, Container } from "@mui/joy";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper";

// Swiper stillari
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { plans } from "../../../lib/data/plans";

export default function Events() {
  return (
    <Box sx={{ py: 10, overflow: "hidden" }}>
      <Container>
        <Stack direction="column" alignItems="center" sx={{ mb: 6 }} spacing={1}>
          <Typography 
            sx={{ 
              color: "#3b82f6", 
              fontWeight: "bold", 
              letterSpacing: "3px", 
              fontSize: "13px", 
              textTransform: "uppercase" 
            }}
          >
            Always Active
          </Typography>
          <Typography 
            level="h2" 
            sx={{ 
              color: "#fff", 
              fontWeight: "800", 
              fontSize: { xs: "32px", md: "42px" },
              textAlign: "center"
            }}
          >
            Exclusive Events
          </Typography>
        </Stack>

        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          speed={4000} // Slaydning biridan ikkinchisiga o'tish davomiyligi (4 sekund)
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 0, // TO'XTAMASDAN harakatlanishi uchun 0 qilinadi
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // MOUSE KELGANDA TO'XTAYDI
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          className="events-continuous-swiper"
        >
          {plans.map((value, index) => (
            <SwiperSlide key={index} style={{ width: "320px", height: "460px" }}>
              <Card 
                sx={{ 
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(25px)",
                  borderRadius: "32px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  overflow: "hidden",
                  p: 0,
                  transition: "0.4s ease",
                  "&:hover": {
                    borderColor: "#3b82f6",
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
                  }
                }}
              >
                {/* Image */}
                <Box sx={{ position: "relative", height: "220px" }}>
                  <img 
                    src={value.img} 
                    alt={value.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                  <Box 
                    sx={{ 
                      position: "absolute", top: 15, right: 15, 
                      bgcolor: "#3b82f6", px: 2, py: 0.6, 
                      borderRadius: "14px", color: "#fff", fontSize: "12px", 
                      fontWeight: "800", boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                    }}
                  >
                    {value.date}
                  </Box>
                </Box>

                {/* Content */}
                <Stack sx={{ p: 3, flexGrow: 1 }} spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: "600" }}>
                      BY {value.author.toUpperCase()}
                    </Typography>
                  </Stack>

                  <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "700" }}>
                    {value.title}
                  </Typography>

                  <Typography 
                    sx={{ 
                      color: "rgba(255,255,255,0.5)", 
                      fontSize: "14px", 
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {value.desc}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: "auto" }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#3b82f6" }} />
                    <Typography sx={{ color: "#3b82f6", fontSize: "13px", fontWeight: "600" }}>
                      {value.location}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* MUHIM: Bir tekis (linear) harakat uchun CSS */}
      <style>{`
        .events-continuous-swiper .swiper-wrapper {
          transition-timing-function: linear !important; /* To'xtovsiz harakat siri */
        }
        .events-continuous-swiper .swiper-slide {
          opacity: 0.3;
          transition: 0.5s;
        }
        .events-continuous-swiper .swiper-slide-active {
          opacity: 1;
        }
        .swiper-button-next, .swiper-button-prev {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          opacity: 0; /* Standart holatda yashirin, hoverda chiqadi */
          transition: 0.3s;
        }
        .events-continuous-swiper:hover .swiper-button-next,
        .events-continuous-swiper:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2) !important;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
          width: 20px;
          border-radius: 4px;
        }
      `}</style>
    </Box>
  );
}
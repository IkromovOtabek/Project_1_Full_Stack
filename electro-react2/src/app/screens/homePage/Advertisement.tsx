import React from "react";
import { Container, Box, Typography, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import styled from "styled-components";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { NavLink } from "react-router-dom";

/** STYLED COMPONENTS **/
const PromoWrapper = styled(Box)`
  width: 100%;
  min-height: 500px;
  border-radius: 40px;
  overflow: hidden;
  position: relative;
  background: #020617; /* To'q fon */
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  transition: all 0.5s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    height: auto;
    padding-top: 40px;
  }
`;

const ContentSide = styled(Box)`
  flex: 1.2;
  padding: 60px;
  z-index: 2;

  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;

const ImageSide = styled(Box)`
  flex: 1;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    /* Rasmni chap tomonga silliq o'tkazish uchun gradient */
    background: linear-gradient(to right, #020617 0%, transparent 20%, transparent 80%, #020617 100%);
    z-index: 1;
  }

  @media (max-width: 900px) {
    width: 100%;
    height: 350px;
    &::before {
        background: linear-gradient(to bottom, #020617 0%, transparent 20%);
    }
  }
`;

export default function Advertisement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container sx={{ my: 12 }}>
      <PromoWrapper>
        {/* CHAP TOMON: MATN VA TUGMALAR */}
        <ContentSide>
          <Stack spacing={4} alignItems={isMobile ? 'center' : 'flex-start'}>
            {/* FLASH SALE BADGE */}
            <Box sx={{ 
              display: 'flex', alignItems: 'center', gap: 1, 
              bgcolor: 'rgba(59, 130, 246, 0.1)', width: 'fit-content', 
              px: 2, py: 0.8, borderRadius: '50px', border: '1px solid rgba(59, 130, 246, 0.3)' 
            }}>
              <FlashOnIcon sx={{ color: '#3b82f6', fontSize: 16 }} />
              <Typography sx={{ color: '#3b82f6', fontSize: '11px', fontWeight: 900, letterSpacing: '2px' }}>
                LIMITED TIME OFFER
              </Typography>
            </Box>

            <Typography variant="h2" sx={{ 
                color: '#fff', 
                fontWeight: 900, 
                lineHeight: 1, 
                letterSpacing: '-2px',
                fontSize: { xs: '2.5rem', md: '3.5rem' } 
            }}>
              Unleash the <br /> 
              <span style={{ 
                background: "linear-gradient(90deg, #3b82f6, #2dd4bf)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Power of Tech.</span>
            </Typography>

            <Typography sx={{ 
                color: 'rgba(255,255,255,0.5)', 
                fontSize: '18px', 
                lineHeight: 1.6, 
                fontWeight: 400,
                maxWidth: '450px'
            }}>
              Discover the next generation of smartphones and innovative gadgets. 
              Get an exclusive 20% discount on your first order.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%', pt: 2 }}>
              <Button 
                variant="contained" 
                sx={{ 
                  borderRadius: '16px', px: 5, py: 2, 
                  bgcolor: '#3b82f6', fontWeight: 800, textTransform: 'none',
                  fontSize: '16px',
                  '&:hover': { bgcolor: '#2563eb', transform: 'scale(1.02)' },
                  transition: '0.3s',
                  color: '#fff',
                  
                }}
              >
                Get Started Now
              </Button>
              <Button 
                variant="outlined" 
                sx={{ 
                  borderRadius: '16px', px: 4, py: 2, color: '#fff', 
                  borderColor: 'rgba(255,255,255,0.1)', textTransform: 'none',
                  fontWeight: 600, fontSize: '16px',
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                View Details
              </Button>
            </Stack>
          </Stack>
        </ContentSide>

        {/* O'NG TOMON: RASM */}
        <ImageSide>
            <Box
                component="img"
                src="/icons/d04d1741-2bd4-4ffc-9ac3-8fba624218ed.jpg"
                alt="PrimeGadget Promo"
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    // Rasmni o'ng tomonda joylashtirish va chapga gradient bilan "yeyish"
                    maskImage: isMobile ? 'none' : 'linear-gradient(to left, black 70%, transparent 100%)',
                    WebkitMaskImage: isMobile ? 'none' : 'linear-gradient(to left, black 70%, transparent 100%)',
                }}
            />
        </ImageSide>

        {/* BEZAK: ORQA FONDA SHAFTOF LOGO */}
        <Box sx={{ 
          position: 'absolute', top: -50, right: -50, 
          opacity: 0.05, transform: 'rotate(15deg)', zIndex: 1,
          pointerEvents: 'none', color: '#3b82f6'
        }}>
          <svg width="300" height="300" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" />
          </svg>
        </Box>
      </PromoWrapper>
    </Container>
  );
}
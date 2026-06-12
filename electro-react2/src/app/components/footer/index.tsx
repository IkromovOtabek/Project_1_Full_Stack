import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useGlobals } from "../../hooks/useGlobals";

/** STYLED COMPONENTS **/
const FooterContainer = styled.footer`
  width: 100%;
  padding: 80px 0 30px 0;
  background: radial-gradient(circle at top, #111827 0%, #020617 100%);
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  color: #ffffff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  font-size: 15px;
  transition: 0.3s;
  margin-bottom: 12px;
  display: block;
  &:hover {
    color: #3b82f6;
    transform: translateX(8px);
  }
`;

const SocialButton = styled(IconButton)`
  background: rgba(255, 255, 255, 0.03) !important;
  color: rgba(255, 255, 255, 0.6) !important;
  margin-right: 12px !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: 0.4s !important;
  &:hover {
    background: #3b82f6 !important;
    color: #fff !important;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
  }
`;

/** FOOTER LOGO COMPONENT **/
const FooterLogo = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "15px", mb: 3 }}>
    <Box
      sx={{
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(59, 130, 246, 0.1)",
        borderRadius: "15px",
        border: "1px solid rgba(59, 130, 246, 0.3)",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
        <path
          d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
          stroke="#3b82f6"
          strokeWidth="8"
        />
        <path d="M55 25L35 55H50L45 75L65 45H50L55 25Z" fill="#fff" />
      </svg>
    </Box>
    <Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}
      >
        PRIME<span style={{ color: "#3b82f6" }}>GADGET</span>
      </Typography>
      <Typography
        sx={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "3px", fontWeight: 700 }}
      >
        FUTURE ELECTRONICS
      </Typography>
    </Box>
  </Box>
);

export default function Footer() {
  const { authUser } = useGlobals();

  return (
    <FooterContainer>
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={8}
        >
          {/* Brand & Description */}
          <Stack spacing={3} sx={{ maxWidth: "400px" }}>
            <FooterLogo />
            <Typography
              sx={{
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.8,
                fontSize: "15px",
                fontWeight: 400,
              }}
            >
              Your premium destination for the latest smartphones, high-end electronics, 
              and futurist gadgets. PrimeGadget brings the future of technology 
              directly to your hands with 24/7 global support and quality guarantee.
            </Typography>
            <Stack direction="row" sx={{ pt: 1 }}>
              <SocialButton size="small"><FacebookIcon fontSize="small" /></SocialButton>
              <SocialButton size="small"><TwitterIcon fontSize="small" /></SocialButton>
              <SocialButton size="small"><InstagramIcon fontSize="small" /></SocialButton>
              <SocialButton size="small"><YouTubeIcon fontSize="small" /></SocialButton>
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={3} sx={{ minWidth: "180px" }}>
            <Typography
              sx={{ color: "#fff", fontWeight: "800", fontSize: "18px", letterSpacing: "1px", mb: 1 }}
            >
              QUICK LINKS
            </Typography>
            <Stack direction="column">
              <StyledLink to="/">Home Page</StyledLink>
              <StyledLink to="/products">All Products</StyledLink>
              <StyledLink to="/help">Help Center</StyledLink>
              {authUser && <StyledLink to="/orders">My Orders</StyledLink>}
              {authUser && <StyledLink to="/user-page">My Profile</StyledLink>}
            </Stack>
          </Stack>

          {/* Contact Info */}
          <Stack spacing={3} sx={{ minWidth: "250px" }}>
            <Typography
              sx={{ color: "#fff", fontWeight: "800", fontSize: "18px", letterSpacing: "1px", mb: 1 }}
            >
              CONTACT US
            </Typography>
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ p: 1, bgcolor: "rgba(59, 130, 246, 0.1)", borderRadius: "12px", display: "flex" }}>
                  <LocationOnIcon sx={{ color: "#3b82f6", fontSize: 20 }} />
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                  Uzbekistan Tashkent Oybek street 77
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ p: 1, bgcolor: "rgba(59, 130, 246, 0.1)", borderRadius: "12px", display: "flex" }}>
                  <PhoneIcon sx={{ color: "#3b82f6", fontSize: 20 }} />
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                  +82 10 7772 0450
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ p: 1, bgcolor: "rgba(59, 130, 246, 0.1)", borderRadius: "12px", display: "flex" }}>
                  <EmailIcon sx={{ color: "#3b82f6", fontSize: 20 }} />
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                  otabekikromov32@gmail.com
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ p: 1, bgcolor: "rgba(59, 130, 246, 0.1)", borderRadius: "12px", display: "flex" }}>
                  <AccessTimeIcon sx={{ color: "#3b82f6", fontSize: 20 }} />
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                  Open 24/7 for Online Orders
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ mt: 8, mb: 4, borderColor: "rgba(255,255,255,0.05)" }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
            © {new Date().getFullYear()} PrimeGadget by Owen. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={4}>
            <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", cursor: "pointer", "&:hover": { color: "#3b82f6" } }}>
              Privacy Policy
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", cursor: "pointer", "&:hover": { color: "#3b82f6" } }}>
              Terms of Service
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", cursor: "pointer", "&:hover": { color: "#3b82f6" } }}>
              Cookies Settings
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </FooterContainer>
  );
}
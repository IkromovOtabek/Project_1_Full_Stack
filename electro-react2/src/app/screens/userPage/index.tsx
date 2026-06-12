import React from "react";
import { Box, Container, Stack, Typography, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { UserType } from "../../../lib/enums/user.enum";
import UserSettingsForm from "./Settings";
import "../../../css/userPage.css";

export default function UserPage() {
  const history = useHistory();
  const { authUser } = useGlobals();

  if (!authUser) {
    history.push("/");
    return null;
  }

  return (
    <Box className="user-page-main">
      <Container maxWidth="lg">
        {/* Sahifa sarlavhasi - Ikkala karta bir xil balandlikda boshlanishi uchun tepada */}
        <Typography variant="h4" className="page-header-text">
          Settings
        </Typography>

        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={4} 
          pb={10}
          alignItems="flex-start" // O'ng tomon cho'zilib ketmasligi uchun shart
        >
          {/* CHAP TOMON: Sozlamalar formasi */}
          <Box flex={2} sx={{ width: "100%" }}>
            <Box className="glass-card">
              <UserSettingsForm />
            </Box>
          </Box>

          {/* O'NG TOMON: Profil Prevyusi (STICKY - Qotirilgan) */}
          <Box 
            className="sticky-sidebar"
            flex={1} 
            sx={{ 
              width: "100%", 
              position: { md: "sticky" }, 
              top: "120px", // Navbar balandligiga qarab
              zIndex: 10 
            }}
          >
            <Box className="glass-card profile-preview-wrapper">
              <Box className="profile-top-section">
                <Box className="avatar-frame">
                  <img
                    src={authUser?.userImage ? `${serverApi}/${authUser.userImage}` : "/icons/default-user.svg"}
                    className="avatar-img"
                    alt="User"
                  />
                  <Box className="type-badge">
                    <img
                      src={authUser?.userType === UserType.ADMIN ? "/icons/restaurant.svg" : "/icons/user-badge.svg"}
                      alt="Badge"
                    />
                  </Box>
                </Box>
                <Typography variant="h5" className="user-nick-text">
                  {authUser?.userNick}
                </Typography>
                <Typography className="user-type-label">
                  {authUser?.userType}
                </Typography>
              </Box>

              <Divider sx={{ bgcolor: "rgba(255,255,255,0.05)", my: 3 }} />

              <Stack spacing={3}>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <FacebookIcon className="social-icon-btn" />
                  <InstagramIcon className="social-icon-btn" />
                  <TelegramIcon className="social-icon-btn" />
                  <YouTubeIcon className="social-icon-btn" />
                </Stack>
                
                <Typography className="bio-text">
                  {authUser?.userDesc || "No bio information provided yet."}
                </Typography>

                <Box className="address-info-box">
                  <Typography variant="caption" className="info-label">
                    DELIVERY ADDRESS
                  </Typography>
                  <Typography variant="body2" className="info-value">
                    {authUser?.userAddress || "Address not specified"}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
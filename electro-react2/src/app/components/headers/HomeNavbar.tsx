import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CardItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import PrimeGadgetLogo from "./PrimeGadgetLogo";

interface HomeNavbarProps {
  cartItems: CardItem[];
  onAdd: (item: CardItem) => void;
  onRemove: (item: CardItem) => void;
  onDelete: (item: CardItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authUser } = useGlobals();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Help", to: "/help" },
    ...(authUser
      ? [
          { label: "Order", to: "/orders" },
          { label: "My Page", to: "/user-page" },
        ]
      : []),
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="home-navbar">
      <video
        autoPlay
        loop
        muted
        className="bg-video"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: -1,
        }}
      />

      <Container className="hero-container" maxWidth="lg">
        <Stack
          className="hero-nav hero-nav-stack"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            p: { xs: "12px 20px", md: "15px 30px" },
            borderRadius: { xs: "20px", md: "30px" },
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Box>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <PrimeGadgetLogo />
            </NavLink>
          </Box>

          {isMobile ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Basket
                CardItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{ color: "#fff" }}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row" spacing={4} alignItems="center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                  activeStyle={{ color: "#3b82f6" }}
                >
                  {link.label}
                </NavLink>
              ))}
              <Basket
                CardItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />

              {!authUser ? (
                <Button
                  variant="contained"
                  onClick={() => setLoginOpen(true)}
                  sx={{
                    borderRadius: "20px",
                    bgcolor: "#3b82f6",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Button>
              ) : (
                <img
                  className="user-avatar"
                  src={
                    authUser?.userImage
                      ? `${serverApi}/${authUser?.userImage}`
                      : "/icons/default-user.svg"
                  }
                  onClick={handleLogoutClick}
                  alt="user avatar"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: "2px solid #3b82f6",
                    objectFit: "cover",
                  }}
                />
              )}
            </Stack>
          )}
        </Stack>

        <Stack className="hero-content" spacing={{ xs: 3, md: 4 }}>
          <Typography className="hero-title" component="h1">
            The Future of Tech <br />
            <Box
              component="span"
              sx={{
                color: "#3b82f6",
                textShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
              }}
            >
              In Your Hands
            </Box>
          </Typography>

          <Typography className="hero-subtitle">
            Next-gen electronics for those who demand excellence. Premium quality
            gadgets with 24-hour innovation and global support.
          </Typography>

          {!authUser && (
            <Button
              variant="contained"
              onClick={() => setSignupOpen(true)}
              sx={{
                width: "fit-content",
                p: { xs: "12px 32px", md: "15px 50px" },
                borderRadius: "16px",
                bgcolor: "#3b82f6",
                color: "#fff",
                fontSize: { xs: "16px", md: "18px" },
                fontWeight: "900",
                textTransform: "none",
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "#2563eb",
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 40px rgba(59, 130, 246, 0.6)",
                },
              }}
            >
              Start Upgrading Now
            </Button>
          )}
        </Stack>
      </Container>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        PaperProps={{
          sx: {
            width: 280,
            background: "rgba(17, 24, 39, 0.98)",
            color: "#fff",
            backdropFilter: "blur(12px)",
          },
        }}
      >
        <List sx={{ pt: 3 }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={NavLink}
                to={link.to}
                exact={link.to === "/"}
                onClick={closeMobileMenu}
                sx={{ color: "#fff" }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ px: 2, pb: 3 }}>
          {!authUser ? (
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setLoginOpen(true);
                closeMobileMenu();
              }}
              sx={{
                borderRadius: "16px",
                bgcolor: "#3b82f6",
                textTransform: "none",
                fontWeight: "bold",
                py: 1.5,
              }}
            >
              Login
            </Button>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={
                  authUser?.userImage
                    ? `${serverApi}/${authUser?.userImage}`
                    : "/icons/default-user.svg"
                }
                onClick={(e) => {
                  handleLogoutClick(e);
                  closeMobileMenu();
                }}
                alt="user avatar"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "2px solid #3b82f6",
                  objectFit: "cover",
                }}
              />
              <Typography sx={{ fontWeight: 600 }}>
                {authUser.userNick}
              </Typography>
            </Stack>
          )}
        </Box>
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseLogout}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            borderRadius: "15px",
            mt: 1.5,
            background: "rgba(17, 24, 39, 0.95)",
            color: "#fff",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleLogoutRequest();
            handleCloseLogout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "#3b82f6" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

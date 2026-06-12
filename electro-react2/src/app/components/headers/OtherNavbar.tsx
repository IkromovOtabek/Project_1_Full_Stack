import React from "react";
import { Box, Button, Container, Stack, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CardItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import PrimeGadgetLogo from "./PrimeGadgetLogo";

interface OtherNavbarProps {
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

export default function OtherNavbar(props: OtherNavbarProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll, setLoginOpen, handleLogoutClick, anchorEl, handleCloseLogout, handleLogoutRequest } = props;
  const { authUser } = useGlobals();

  return (
    <Box sx={{ 
      width: "100%", 
      position: "fixed", 
      top: 0, 
      zIndex: 1000, 
      py: 2,
      background: "rgba(2, 6, 23, 0.8)", // Boshqa sahifalarda video yo'qligi uchun fon biroz to'qroq
      backdropFilter: "blur(10px)"
    }}>
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ 
          background: 'rgba(255,255,255,0.05)', 
          backdropFilter: 'blur(20px)', 
          p: '12px 30px', 
          borderRadius: '30px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <PrimeGadgetLogo /> {/* LOGO SHU YERDA */}
            </NavLink>
          </Box>
          
          <Stack direction="row" spacing={4} alignItems="center">
            {["Home", "Products", "Help"].map((link) => (
              <NavLink 
                key={link}
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`} 
                style={{ color: "#fff", textDecoration: "none", fontWeight: "500" }} 
                activeStyle={{ color: "#3b82f6" }}
              >
                {link}
              </NavLink>
            ))}
            
            {authUser && (
              <>
                <NavLink to="/orders" style={{ color: "#fff", textDecoration: "none" }} activeStyle={{ color: "#3b82f6" }}>Order</NavLink>
                <NavLink to="/user-page" style={{ color: "#fff", textDecoration: "none" }} activeStyle={{ color: "#3b82f6" }}>My Page</NavLink>
              </>
            )}

            <Basket CardItems={cartItems} onAdd={onAdd} onRemove={onRemove} onDelete={onDelete} onDeleteAll={onDeleteAll} />

            {!authUser ? (
              <Button 
                variant="contained" 
                onClick={() => setLoginOpen(true)}
                sx={{ borderRadius: "20px", bgcolor: "#3b82f6", color: "#fff", textTransform: "none", fontWeight: "bold" }}
              >
                Login
              </Button>
            ) : (
              <img 
                src={authUser?.userImage ? `${serverApi}/${authUser?.userImage}` : "/icons/default-user.svg"} 
                onClick={handleLogoutClick}
                alt="user avatar"
                style={{ width: 35, height: 35, borderRadius: "50%", cursor: "pointer", border: "2px solid #3b82f6", objectFit: 'cover' }}
              />
            )}
          </Stack>
        </Stack>
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseLogout}
        disableScrollLock={true}
        PaperProps={{
          sx: { borderRadius: "15px", mt: 1.5, background: "rgba(17, 24, 39, 0.95)", color: "#fff", backdropFilter: "blur(10px)" },
        }}
      >
        <MenuItem onClick={() => { handleLogoutRequest(); handleCloseLogout(); }}>
          <ListItemIcon><Logout fontSize="small" sx={{ color: "#3b82f6" }} /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
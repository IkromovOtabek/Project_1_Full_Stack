import React from "react";
import { 
  Box, 
  Button, 
  Stack, 
  IconButton, 
  Badge, 
  Menu, 
  Typography, 
  Divider 
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useHistory } from "react-router-dom";
import { CardItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../../services/OrderService";

interface BasketProps {
  CardItems: CardItem[];
  onAdd: (item: CardItem) => void;
  onRemove: (item: CardItem) => void;
  onDelete: (item: CardItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { CardItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authUser, setOrderBuilder } = useGlobals();
  const history = useHistory();
  
  // NaN xatosini oldini olish va turlarni aniqlashtirish
  const itemsPrice = CardItems.reduce((a: number, c: CardItem) => a + (Number(c.quantity) || 0) * (Number(c.price) || 0), 0);
  const shippingCost = itemsPrice < 100 && itemsPrice > 0 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const proceedOrderHandlar = async () => {
    try {
      handleClose();
      if (!authUser) throw new Error(Messages.error2);
      const order = new OrderService();
      await order.createOrder(CardItems);
      onDeleteAll();
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box>
      <IconButton onClick={handleClick} sx={{ p: '12px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
        <Badge badgeContent={CardItems.length} color="primary" sx={{ "& .MuiBadge-badge": { bgcolor: "#3b82f6" } }}>
          <img src={"/icons/shopping-cart.svg"} alt="shopping cart" />
        </Badge>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true} // Scroll muzlab qolishini oldini oladi
        PaperProps={{
          sx: {
            width: '350px',
            maxHeight: '500px',
            mt: 2,
            borderRadius: '24px',
            background: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(25px)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            p: 2,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: '800', fontSize: '18px' }}>Your Cart</Typography>
            {CardItems.length > 0 && (
              <IconButton onClick={onDeleteAll} size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                <DeleteForeverIcon />
              </IconButton>
            )}
          </Stack>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <Box sx={{ maxHeight: '300px', overflowY: 'auto', pr: 1 }}>
            {CardItems.length === 0 ? (
              <Typography sx={{ textAlign: 'center', py: 4, color: 'rgba(255,255,255,0.4)' }}>Cart is empty!</Typography>
            ) : (
              CardItems.map((item, idx) => (
                <Stack key={idx} direction="row" spacing={2} sx={{ mb: 2, position: 'relative', bgcolor: 'rgba(255,255,255,0.03)', p: 1.5, borderRadius: '16px' }}>
                  <img 
                    src={item.image ? `${serverApi}/${item.image}` : "/icons/default-food.svg"} 
                    style={{ width: 60, height: 60, borderRadius: '12px', objectFit: 'cover' }} 
                    onError={(e: any) => { e.target.src="/icons/default-food.svg" }}
                    alt={item.name}
                  />
                  <Stack flexGrow={1} spacing={0.5}>
                    <Typography sx={{ fontWeight: '600', fontSize: '14px' }}>{item.name}</Typography>
                    <Typography sx={{ color: '#3b82f6', fontWeight: 'bold' }}>${Number(item.price) || 0}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <IconButton size="small" onClick={() => onRemove(item)} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.1)', width: 24, height: 24 }}>
                        <RemoveIcon sx={{ fontSize: 16 }}/>
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => onAdd(item)} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.1)', width: 24, height: 24 }}>
                        <AddIcon sx={{ fontSize: 16 }}/>
                      </IconButton>
                    </Stack>
                  </Stack>
                  <IconButton onClick={() => onDelete(item)} size="small" sx={{ position: 'absolute', top: 5, right: 5, color: 'rgba(255,255,255,0.2)' }}>
                    <CancelIcon fontSize="small"/>
                  </IconButton>
                </Stack>
              ))
            )}
          </Box>

          {CardItems.length > 0 && (
            <Stack spacing={2} sx={{ pt: 2 }}>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>Total</Typography>
                <Typography sx={{ fontWeight: '800', fontSize: '20px', color: '#3b82f6' }}>${totalPrice}</Typography>
              </Stack>
              <Button 
                fullWidth 
                variant="contained" 
                onClick={proceedOrderHandlar}
                sx={{ borderRadius: '16px', bgcolor: '#3b82f6', textTransform: 'none', fontWeight: 'bold', py: 1.5, "&:hover": { bgcolor: '#2563eb' } }}
                startIcon={<ShoppingCartIcon />}
              >
                Place Order
              </Button>
            </Stack>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
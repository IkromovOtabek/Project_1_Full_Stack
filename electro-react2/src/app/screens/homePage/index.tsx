import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CssVarsProvider } from "@mui/joy/styles";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewProducts";
import PopularProducts from "./PopularProducts";
import Statistics from "./Statistics";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import ProductService from "../../../services/ProductService";
import UserService from "../../../services/UserService";
import { Box } from "@mui/joy";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({ page: 1, limit: 4, order: "productViews" })
      .then((data) => dispatch(setPopularDishes(data)));
    product
      .getProducts({ page: 1, limit: 4, order: "createdAt" })
      .then((data) => dispatch(setNewDishes(data)));
    const userService = new UserService();
    userService.getTopUsers(4).then((data) => dispatch(setTopUsers(data)));
  }, [dispatch]);

  return (
    <Box sx={{ 
      background: "radial-gradient(circle at center, #111827 0%, #020617 100%)",
      minHeight: "100vh",
    }}>
      <CssVarsProvider>
        <Statistics />
        <PopularProducts />
        <NewDishes />
        <Advertisement />
        <ActiveUsers />
        <Events />
      </CssVarsProvider>
    </Box>
  );
}
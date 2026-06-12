import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Badge,
  IconButton,
  AspectRatio,
  Card,
  CardOverflow,
  CardContent,
  Divider,
  Chip,
} from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  Pagination,
  PaginationItem,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CardItem } from "../../../lib/types/search";
import "../../../css/product.css";

const materialTheme = createTheme({
  palette: { mode: "dark", primary: { main: "#3b82f6" } },
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products({
  onAdd,
}: {
  onAdd: (item: CardItem) => void;
}) {
  const dispatch = useDispatch();
  const { products } = useSelector(productsRetriever);
  const history = useHistory();
  const [searchText, setsearchText] = useState("");
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.SMARTPHONE,
    search: "",
  });

  const pageSize = productSearch.limit;
  const hasNextPage = products.length === pageSize;
  // Backend total count qaytarmaganda, keyingi sahifa bor-yo'qligini
  // joriy sahifa to'liq kelganiga qarab taxmin qilamiz.
  const totalPages = hasNextPage ? productSearch.page + 1 : productSearch.page;
  const shouldShowPagination = productSearch.page > 1 || hasNextPage;

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        const normalizedData =
          productSearch.order === "productPrice"
            ? [...data].sort((a, b) => a.productPrice - b.productPrice)
            : data;
        dispatch(setProducts(normalizedData));
      });
  }, [productSearch, dispatch]);

  const handleSearch = () => {
    setProductSearch((prev) => ({
      ...prev,
      search: searchText,
      page: 1,
      productCollection: undefined,
    }));
    setsearchText("");
  };

  return (
    <CssVarsProvider>
      <Box className="products-page" sx={{ py: 12 }}>
        <Container>
          <Stack alignItems="center" spacing={4} sx={{ mb: 6 }}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: "40px", md: "56px" },
                fontWeight: "900",
                textAlign: "center",
              }}
            >
              Gadget <span style={{ color: "#3b82f6" }}>Collections</span>
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "700px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                p: "8px 12px",
              }}
            >
              <SearchIcon sx={{ color: "rgba(255,255,255,0.4)", mx: 1.5 }} />
              <input
                placeholder="Search across all categories..."
                value={searchText}
                onChange={(e) => setsearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  width: "100%",
                  fontSize: "17px",
                }}
              />
              <Button
                onClick={handleSearch}
                sx={{ borderRadius: "16px", bgcolor: "#3b82f6", px: 3 }}
              >
                Search
              </Button>
            </Box>
          </Stack>

          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              borderRadius: "32px",
              p: 4,
              mb: 5,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Stack spacing={4}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ overflowX: "auto", pb: 1 }}
                mt={3}
              >
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  <FilterListIcon
                    fontSize="small"
                    sx={{ verticalAlign: "middle",}}
                  />{" "}
                  CATEGORY:
                </Typography>
                {Object.values(ProductCollection).map((coll) => (
                  <Chip
                    key={coll}
                    variant="solid"
                    onClick={() =>
                      setProductSearch((p) => ({
                        ...p,
                        productCollection: coll as ProductCollection,
                        page: 1,
                      }))
                    }
                    sx={{
                      borderRadius: "14px",
                      px: 2.5,
                      py: 1,
                      cursor: "pointer",
                      fontWeight: "700",
                      bgcolor:
                        productSearch.productCollection === coll
                          ? "#3b82f6"
                          : "#3b82f6",
                      color:
                        productSearch.productCollection === coll
                          ? "#3b82f6"
                          : "#ffffff",
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "0.3s all ease",
                      "&:hover": {
                        bgcolor:
                          productSearch.productCollection === coll
                            ? "#f0f0f0"
                            : "#2563eb",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                      },
                    }}
                  >
                    {coll}
                  </Chip>
                ))}
              </Stack>

              <Divider sx={{ bgcolor: "rgba(255,255,255,0.05)" }} />

              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.4)",
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}
                  >
                    SORT BY:
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{
                      bgcolor: "rgba(0,0,0,0.3)",
                      borderRadius: "15px",
                      p: 0.5,
                    }}
                  >
                    {["createdAt", "productPrice", "productViews"].map(
                      (order) => (
                        <Button
                          key={order}
                          onClick={() =>
                            setProductSearch((p) => ({ ...p, order, page: 1 }))
                          }
                          sx={{
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: "13px",
                            bgcolor:
                              productSearch.order === order
                                ? "#3b82f6"
                                : "transparent",
                            color: "#fff",
                          }}
                        >
                          {order === "createdAt"
                            ? "New"
                            : order === "productPrice"
                              ? "Price"
                              : "Views"}
                        </Button>
                      ),
                    )}
                  </Stack>
                </Stack>

                <Button
                  variant="outlined"
                  onClick={() =>
                    setProductSearch((p) => ({
                      ...p,
                      productCollection: undefined,
                      page: 1,
                    }))
                  }
                  startDecorator={<CheckCircleIcon />}
                  sx={{
                    borderRadius: "20px",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  All Items
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Typography sx={{ color: "rgba(255,255,255,0.5)", mb: 4, ml: 1 }}>
            Found:{" "}
            <span style={{ color: "#3b82f6", fontWeight: "bold" }}>
              {products.length}
            </span>{" "}
            products
          </Typography>

          <Box className="product-grid">
            <AnimatePresence mode="wait">
              {products.length > 0 ? (
                products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card
                      className="product-card"
                      onClick={() => history.push(`/products/${product._id}`)}
                      sx={{
                        borderRadius: "28px",
                        background: "rgba(255,255,255,0.05)",
                        p: 0,
                        overflow: "hidden",
                      }}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img
                            src={`${serverApi}/${product.productImages[0]}`}
                            alt={product.productName}
                          />
                        </AspectRatio>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            bgcolor: "#3b82f6",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "10px",
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: "800",
                          }}
                        >
                          {product.productCondission || "NEW"}
                        </Box>
                      </CardOverflow>
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: "600",
                            fontSize: "16px",
                            mb: 1,
                          }}
                        >
                          {product.productName}
                        </Typography>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            sx={{
                              color: "#3b82f6",
                              fontWeight: "800",
                              fontSize: "20px",
                            }}
                          >
                            ${product.productPrice}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                onAdd({
                                  _id: product._id,
                                  quantity: 1,
                                  name: product.productName,
                                  price: product.productPrice,
                                  image: product.productImages[0],
                                });
                              }}
                              sx={{
                                bgcolor: "rgba(59, 130, 246, 0.1)",
                                color: "#3b82f6",
                                borderRadius: "10px",
                              }}
                            >
                              <ShoppingCartIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                            <Badge
                              badgeContent={product.productViews}
                              sx={{
                                "& .MuiBadge-badge": {
                                  bgcolor: "#3b82f6",
                                  fontSize: "10px",
                                },
                              }}
                            >
                              <VisibilityIcon
                                sx={{
                                  color: "rgba(255,255,255,0.2)",
                                  fontSize: 20,
                                }}
                              />
                            </Badge>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Stack
                  alignItems="center"
                  sx={{ py: 10, gridColumn: "1 / -1" }}
                >
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.2)", fontSize: "20px" }}
                  >
                    No products found...
                  </Typography>
                </Stack>
              )}
            </AnimatePresence>
          </Box>

          {shouldShowPagination && (
            <ThemeProvider theme={materialTheme}>
              <Stack alignItems="center" sx={{ py: 4 }}>
                <Pagination
                  count={totalPages}
                  page={productSearch.page}
                  onChange={(e, v) =>
                    setProductSearch((p) => ({ ...p, page: v }))
                  }
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                      sx={{ color: "#fff" }}
                    />
                  )}
                />
              </Stack>
            </ThemeProvider>
          )}
        </Container>
      </Box>
    </CssVarsProvider>
  );
}
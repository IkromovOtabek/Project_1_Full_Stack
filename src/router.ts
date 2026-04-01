import express from "express";
const router = express.Router();
import userController from "../src/controllers/user.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

router.post("/login", userController.login);

router.post("/signup", userController.signup);

// SPA API (electro-react uchun)
router.get("/user/top-users", userController.getTopUsers);
router.get("/user/store", userController.getStoreContact);
router.post(
  "/user/update",
  makeUploader("users").single("userImage"),
  userController.updateUser,
);

router.get("/product/all", productController.getProducts);
router.get("/product/:id", productController.getProduct);

export default router;

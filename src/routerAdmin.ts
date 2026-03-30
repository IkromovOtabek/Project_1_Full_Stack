import express, { Request, Response } from "express";
const routerAdmin = express.Router();
import adminController from "../src/controllers/admin.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

/** ADMIN **/
routerAdmin.get("/", adminController.goHome);
routerAdmin
  .get("/login", adminController.getLogin)
  .post("/login", adminController.processLogin);

routerAdmin
  .get("/signup", adminController.getSignup)
  .post(
    "/signup",
    makeUploader("users").single("userImage"),
    adminController.processSignup,
  ); // Middleware hisoblanadi, adminController.processSignup);
routerAdmin.get("/logout", adminController.logout);

routerAdmin.get("/check-me", adminController.checkAuthSesson);

/** PRODUCT **/
routerAdmin.get(
  "/product/all",
  adminController.verifyAdmin,
  productController.getAllProducts,
);
routerAdmin.post(
  "/product/create",
  adminController.verifyAdmin,
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct,
);
routerAdmin.post(
  "/product/:id",
  adminController.verifyAdmin,
  productController.updateChosenProduct,
);

/** USER **/

routerAdmin.get(
  "/user/all",
//   adminController.verifyRestaurant,
  adminController.getUsers,
);
routerAdmin.post(
  "/user/edit",
//   adminController.verifyRestaurant,
  adminController.updateChosenUser,
);

export default routerAdmin;

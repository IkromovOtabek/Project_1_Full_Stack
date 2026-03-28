import express, { Request, Response } from "express";
const routerAdmin = express.Router();
import adminController from "../src/controllers/admin.controller";

/** ADMIN **/
routerAdmin.get("/", adminController.goHome);
routerAdmin
  .get("/login", adminController.getLogin)
  .post("/login", adminController.processLogin);

routerAdmin
  .get("/signup", adminController.getSignup)
  .post("/signup", adminController.processSignup);
routerAdmin.get("/logout", adminController.logout);

routerAdmin.get("/check-me", adminController.checkAuthSesson);
/** PRODUCT **/

/** USER **/

export default routerAdmin;

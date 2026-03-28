import ProductService from "../models/Product.service";
import Errors from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";

const productService = new ProductService();
const productController: T = {};

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    res.render("products");
  } catch (err) {
    console.log("Error getAllProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

productController.createNewProduct = async (req: Request, res: Response) => {
  try {
    console.log("createNewProduct");
    res.send("DONE!");
  } catch (err) {
    console.log("Error createNewProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
  } catch (err) {
    console.log("Error updateChosenProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

export default productController;

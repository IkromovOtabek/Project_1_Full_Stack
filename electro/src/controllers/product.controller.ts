import ProductService from "../models/Product.service";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { ProductInput } from "../libs/types/product";
import { AdminRequest } from "../libs/types/user";

const productService = new ProductService();
const productController: T = {};

/** SPA **/
productController.getProducts = async (req: Request, res: Response) => {
  try {
    const { order, page, limit, productCollection, search } = req.query as T;
    const data = await productService.getProducts({
      order: String(order ?? "createdAt"),
      page: Number(page ?? 1),
      limit: Number(limit ?? 10),
      productCollection: productCollection as any,
      search: typeof search === "string" ? search : undefined,
    });
    res.json(data);
  } catch (err) {
    console.log("Error getProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

productController.getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = await productService.getProductById(id);
    res.json(data);
  } catch (err) {
    console.log("Error getProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

/** SSR **/

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();

    res.render("products", { products: data });
  } catch (err) {
    console.log("Error getAllProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("createNewProduct");
    console.log("req.file:", req.files);

    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATED_FAILED);

    const data: ProductInput = req.body;

    data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });

    await productService.createNewProduct(data);

    return res.redirect("/admin/product/all");

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
    const id = req.params.id as string;

    const result = await productService.updateChosenProduct(id, req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error updateChosenProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

export default productController;

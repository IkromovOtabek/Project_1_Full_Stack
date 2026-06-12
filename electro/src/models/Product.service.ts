import Errors, { HttpCode, Message } from "../libs/Errors";
import ProductModel from "../schema/Product.model";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";
import {
  Product,
  ProductInput,
  ProductInquiry,
  ProductUpdateInput,
} from "../libs/types/product";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  /** SPA **/
  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    const page = Math.max(1, Number(input.page ?? 1));
    const limit = Math.min(50, Math.max(1, Number(input.limit ?? 10)));
    const skip = (page - 1) * limit;

    const sortKey = String(input.order ?? "createdAt");
    const allowedSort = new Set([
      "createdAt",
      "updatedAt",
      "productViews",
      "productPrice",
    ]);
    const sort = allowedSort.has(sortKey) ? { [sortKey]: -1 } : { createdAt: -1 };

    const query: T = {};
    if (input.productCollection) query.productCollection = input.productCollection;
    if (input.search) query.productName = { $regex: input.search, $options: "i" };

    const result = (await this.productModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec()) as Product[];

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async getProductById(id: string): Promise<Product> {
    id = shapeIntoMongooseObjectId(id);
    const result = (await this.productModel.findById(id).lean().exec()) as
      | Product
      | null;
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  /** SSR **/
  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.log("Error, model:CreateNewPruduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput,
  ): Promise<Product> {
    // string => ObjectId qilishimisz kerak
    id = shapeIntoMongooseObjectId(id);

    const result = await this.productModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}
export default ProductService;

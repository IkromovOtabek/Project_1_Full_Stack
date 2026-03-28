import ProductModel from "src/schema/Product.model";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }
}
export default ProductService;

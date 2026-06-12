import {
  ProductCollection,
  ProductCondission,
  ProductStatus,
} from "../enums/product.enum";

/** electro/src/libs/types/product.ts bilan mos */
export interface Product {
  _id: string;
  productStatus?: ProductStatus;
  productCollection: ProductCollection;
  productCondission: ProductCondission;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productmemory?: string;
  productSize?: string;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  search?: string;
}

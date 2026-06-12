import { ObjectId } from "mongoose";
import { ProductCollection, ProductCondission, ProductStatus } from "../enums/product.enum";

export interface Product {
    _id: ObjectId;
     productStatus?: ProductStatus;
    productCollection: ProductCollection;
    productCondission: ProductCondission;
    productName: string;
    productPrice: number;
    productLeftCount: number;
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

export interface ProductInput {
    productStatus?: ProductStatus;
    productCollection: ProductCollection;
    productCondission: ProductCondission;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
}

export interface ProductUpdateInput {
    productStatus?: ProductStatus;
    productCollection?: ProductCollection;
    productName?: string;
    productPrice?: number;
    productLeftCount?: number;
    productVolume?: string;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
}
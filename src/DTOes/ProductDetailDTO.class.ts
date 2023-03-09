/* eslint-disable prettier/prettier */
import { VariantProductDetailDTO } from "./VariantProductDetailDTO.class";

export class ProductDetailDTO{
    productName: string;
    price: number;
    categoryName:string;
    variants: VariantProductDetailDTO[];
}
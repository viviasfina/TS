/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ProductDTO } from "./ProductDTO.class";
import { VariantDTO } from "./VariantDTO.class";

export class OrderItemDTO{
    orderId:number;
    product:ProductDTO;
    itemVariantPrice:number;
    variants:VariantDTO[];
}
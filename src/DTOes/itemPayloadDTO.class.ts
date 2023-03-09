/* eslint-disable prettier/prettier */
import { CategoryPayloadDTO } from "./categoryPayloadDTO.class";
import { VariantPayloadDTO } from "./VariantPayloadDTO.class";

export class itemPayloadDTO{
    productId:number;
    productName:string;
    price:number;
    category:CategoryPayloadDTO;
    variants:VariantPayloadDTO[];
}
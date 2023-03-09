/* eslint-disable prettier/prettier */
import { IsArray, IsNumber } from "class-validator";
import { itemPayloadDTO } from "./itemPayloadDTO.class";

export class ProductPayloadDTO{
    @IsNumber()
    discount:number;
    @IsNumber()
    paymentAmount:number;
    @IsArray()
    items:itemPayloadDTO[];
}


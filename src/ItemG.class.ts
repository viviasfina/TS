import { Category } from "./Category.class";
import { Variants } from "./Variants.class";

export class ItemG{
    productId:string;
    productName:string;
    discountPerItem:number;
    price:number;
    order:number;
    category:Category;
    variants:Variants[];
}
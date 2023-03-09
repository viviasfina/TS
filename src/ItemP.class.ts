import { Category } from "./Category.class";
import { Variants } from "./Variants.class";

export class ItemP{
    productId:string;
    productName:string;
    price:number;
    order:number;
    category:Category;
    variants:Variants[];
}
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable, Ip } from '@nestjs/common';
import { ProductP } from './ProductP.class';
import { ProductG } from './ProductG.class';
import { ItemP } from "./ItemP.class";
import { InvoiceNumber } from './invoiceNumber.class';
import { ItemG } from './ItemG.class';


let productList :ProductG[]=[];
@Injectable()
export class AppService {
  
  addProduct(product:ProductP): InvoiceNumber {
    let totalPrice=0;
    // Sort Product POST
    const respons=this.modifyProduct(product, totalPrice);

    return{
      invoiceNumber:respons.invoiceNumber
    }
  }

  getItemPrice(product:ProductP,totalPrice:number,itemPrice:number[]):ItemG[]{
    let item1:ItemG;
    let itemList:ItemG[]=[];
      for (const [idx,item] of product.items.entries()) {
        let temp:number=parseFloat((itemPrice[idx]/totalPrice*product.discount).toFixed(2));
        item1={
          productId:item.productId,
          productName:item.productName,
          discountPerItem:temp,
          price:item.price,
          order:item.order,
          category:item.category,
          variants:item.variants
        }
        itemList.push(item1);
      }
    return itemList;
  }
  private modifyProduct(product: ProductP, totalPrice:number): ProductG{
    let itemPrice:number[]=[];
    let itemList:ItemG[];
      for (let [idx,item] of product.items.entries()) {
        this.swapProduct(item, product, idx);
      }
      for(let item of product.items){
        let price=0;
        price+=item.price
        totalPrice+=item.price;
        for (const variants of item.variants) {
          for (let [id,op] of variants.options.entries()) {
            //swap option di varians
            if(variants.options[id].order>variants.options[variants.options.length-1].order){
              const temp = variants.options[id];
              variants.options[id]=variants.options[variants.options.length-1];
              variants.options[variants.options.length-1]=temp;
            }
            if(variants.options[id].isSelected===true){
              totalPrice+=variants.options[id].priceDifference;
              price+=variants.options[id].priceDifference;
            }
          }
        }
        itemPrice.push(price);
      }

      itemList=this.getItemPrice(product,totalPrice,itemPrice);
      const iProduct: ProductG = {
        total:totalPrice,
        discount:product.discount,
        paymentAmount:product.paymentAmount,
        items:itemList,
        invoiceNumber:this.getInvoiceNum()
      }
      productList.push(iProduct)
      return iProduct;
    }

  private swapProduct(item: ItemP, product: ProductP, indexProduct: number): void{
    if(item.order>product.items[product.items.length-1].order){
      const temp = item;
      product.items[indexProduct]=product.items[product.items.length-1];
      product.items[product.items.length-1]=temp;
    }
  }

  private getInvoiceNum():string{
    let num:number=(Math.floor(Math.random() * 90000) + 10000)
    let invoice:string="ORD-2022-02-24-"+num;
    return invoice;
  }

  getDetail(invoiceNumber):ProductG{
    return productList.find(product=> product.invoiceNumber===invoiceNumber);
  }
}

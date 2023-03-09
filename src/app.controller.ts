/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InvoiceNumber } from './invoiceNumber.class';
import { ProductP } from './ProductP.class';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('product')
  addProduct(@Body() product: ProductP): InvoiceNumber {
    const x = this.appService.addProduct(product);
    return {
      invoiceNumber: x.invoiceNumber,
    };
  }
}

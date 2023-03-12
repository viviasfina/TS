/* eslint-disable prettier/prettier */
import { Body, CACHE_MANAGER, Controller, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InvoiceNumber } from './invoiceNumber.class';
import { ProductP } from './ProductP.class';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly appService: AppService,
  ) {}

  @Post('product')
  addProduct(@Body() product: ProductP): InvoiceNumber {
    const x = this.appService.addProduct(product);
    return {
      invoiceNumber: x.invoiceNumber,
    };
  }
}

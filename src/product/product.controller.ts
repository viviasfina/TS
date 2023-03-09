/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductDetailDTO } from 'src/DTOes/ProductDetailDTO.class';
import { ProductPutRequestDTO } from 'src/DTOes/ProductPutRequestDTO.class';
import { ProductRequestDTO } from 'src/DTOes/ProductRequestDTO.class';
import { Product } from 'src/entities/product.entity';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //1
  @Post('products')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addProduct(@Body() productRequest: ProductRequestDTO): Promise<void> {
    //console.log(productRequest);
    await this.productService.addProduct(productRequest);
  }

  //2
  @Get('/products/:id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return await this.productService.getProduct(id);
  }

  //7
  @Get('/products/:id/detail')
  async getProductDetail(@Param('id') id: number): Promise<ProductDetailDTO> {
    return await this.productService.getProductDetail(id);
  }

  //8
  @Put('/products/:id')
  async editProduct(
    @Body() productPutRequest: ProductPutRequestDTO,
    @Param('id') id: number,
  ): Promise<void> {
    await this.productService.editProduct(productPutRequest, id);
  }
}

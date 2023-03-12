/* eslint-disable prettier/prettier */
import {
  Body,
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ProductDetailDTO } from 'src/DTOes/ProductDetailDTO.class';
import { ProductPutRequestDTO } from 'src/DTOes/ProductPutRequestDTO.class';
import { ProductRequestDTO } from 'src/DTOes/ProductRequestDTO.class';
import { Product } from 'src/entities/product.entity';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly productService: ProductService,
  ) {}

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
  @UseInterceptors(CacheInterceptor)
  @Get('/products/:id/detail')
  async getProductDetail(@Param('id') id: number): Promise<ProductDetailDTO> {
    let detail = await this.cacheManager.get<ProductDetailDTO>(id.toString());
    console.info('ini hasil cache: ', detail);
    if (!detail) {
      detail = await this.productService.getProductDetail(id);
      await this.cacheManager.set(id.toString(), detail, 60);
    }
    return detail;
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

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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ApiKeyAuthGuard } from 'src/auth/apiKey-auth.guard';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
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
  @UseGuards(ApiKeyAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async addProduct(@Body() productRequest: ProductRequestDTO): Promise<void> {
    //console.log(productRequest);
    await this.productService.addProduct(productRequest);
  }

  //2
  @Get('/products/:id')
  @UseGuards(BasicAuthGuard)
  async getProduct(@Param('id') id: number): Promise<Product> {
    return await this.productService.getProduct(id);
  }

  //7
  //@UseInterceptors(CacheInterceptor)
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

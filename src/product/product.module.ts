/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/orderItem.entity';
import { Product } from 'src/entities/product.entity';
import { Variant } from 'src/entities/variant.entity';
import { VariantOption } from 'src/entities/variantOption.entity';
import { RedisRepository } from 'src/repositories/redis.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Variant,
      VariantOption,
      Order,
      OrderItem,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, RedisRepository],
  exports: [ProductService],
})
export class ProductModule {}

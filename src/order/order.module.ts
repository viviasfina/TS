/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { OrderItem } from "src/entities/orderItem.entity";
import { Product } from "src/entities/product.entity";
import { Variant } from "src/entities/variant.entity";
import { VariantOption } from "src/entities/variantOption.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Variant,
      VariantOption,
      Order,
      OrderItem
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
  ],
  exports: [
      OrderService,
  ],
})
export class OrderModule {}
  
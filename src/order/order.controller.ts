/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductPayloadDTO } from 'src/DTOes/ProductPayloadDTO.class';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //11
  @Post('orders')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addOrder(@Body() productPayload: ProductPayloadDTO): Promise<void> {
    await this.orderService.addOrder(productPayload);
  }
}

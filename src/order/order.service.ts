/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
const moment = require('moment');
import { OrderDTO } from '../DTOes/OrderDTO.class';
import { OrderItemDTO } from '../DTOes/OrderItemDTO.class';
import { ProductDTO } from '../DTOes/ProductDTO.class';
import { ProductPayloadDTO } from 'src/DTOes/ProductPayloadDTO.class';
import { VariantDTO } from '../DTOes/VariantDTO.class';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/orderItem.entity';
import { Product } from '../entities/product.entity';
import { Variant } from '../entities/variant.entity';
import { VariantOption } from '../entities/variantOption.entity';
import { Connection, Repository } from 'typeorm';
import { validateProductPaymentAmounts } from './utils/validation/validateOrderPaymentAmounts';
import { validateProductId } from './utils/validation/validateProductId';
import { validateProductPrice } from './utils/validation/validateProductPrice';
import { validateVariantId } from './utils/validation/validateVariantId';
import { validateVariantOptionId } from './utils/validation/validateVariantOption';

@Injectable()
export class OrderService {
  manager = this.connection.manager;

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Variant) private variantRepository: Repository<Variant>,
    @InjectRepository(VariantOption)
    private variantOptionRepository: Repository<VariantOption>,
  ) {}

  async addOrder(productPayload: ProductPayloadDTO): Promise<void> {
    let total = 0;
    for (const item of productPayload.items) {
      const findProductId = await this.productRepository.findOne({
        where: {
          id: item.productId,
          productName: item.productName,
        },
      });
      validateProductId(findProductId);

      const findProductPrice = await this.productRepository.findOne({
        where: {
          id: item.productId,
          price: item.price,
        },
      });
      validateProductPrice(findProductPrice);

      total += item.price;
      for (const variant of item.variants) {
        const findVariantId = await this.variantRepository.findOne({
          variantName: variant.variantName,
        });
        validateVariantId(findVariantId);

        for (const option of variant.options) {
          const findvariantOptionId =
            await this.variantOptionRepository.findOne({
              name: option.name,
            });
          validateVariantOptionId(findvariantOptionId);
          if (option.isSelected === true) {
            total += option.priceDifference;
          }
        }
      }
    }
    validateProductPaymentAmounts(
      total,
      productPayload.paymentAmount,
      productPayload.discount,
    );
    await this.insertOrder(total, productPayload);
  }

  private async insertOrder(
    total: number,
    productPayload: ProductPayloadDTO,
  ): Promise<void> {
    const order = new OrderDTO();
    order.discount = productPayload.discount;
    order.paymentAmounts = productPayload.paymentAmount;
    order.total = total;
    order.invoiceNumber = this.getInvoiceNum();
    await this.orderRepository.insert(order);

    const orderId = await this.orderRepository.findOneOrFail({
      invoiceNumber: order.invoiceNumber,
    });

    await this.insertOrderItem(productPayload, orderId.id);
  }

  private async insertOrderItem(
    productPayload: ProductPayloadDTO,
    orderId: number,
  ): Promise<void> {
    for (const item of productPayload.items) {
      const orderItem = new OrderItemDTO();
      orderItem.orderId = orderId;

      let itemPrice = 0;
      const product = new ProductDTO();
      product.id = item.productId;
      product.productName = item.productName;
      product.price = item.price;
      product.categoryName = item.category.name;
      orderItem.product = product;

      const variantTemp = new VariantDTO();
      variantTemp.productId = item.productId;

      itemPrice += item.price;
      orderItem.variants = [];
      for (const variant of item.variants) {
        variantTemp.variantName = variant.variantName;
        orderItem.variants.push(variantTemp);
        for (const option of variant.options) {
          if (option.isSelected === true) {
            itemPrice += option.priceDifference;
          }
        }
      }
      orderItem.itemVariantPrice = itemPrice;
      await this.orderItemRepository.insert(orderItem);
    }
  }

  private getInvoiceNum(): string {
    const num: number = Math.floor(Math.random() * 90000) + 10000;
    const invoice: string = 'ORD-' + moment().format('YYYY-MM-DD') + '-' + num;
    return invoice;
  }
}

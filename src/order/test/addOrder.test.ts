import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMock } from '../../mocks/mock.connection';
import {
  orderItemRepoMock,
  orderRepoMock,
  productRepoMock,
  variantOptionRepoMock,
  variantRepoMock,
} from '../../mocks/repositories.mock';
import { Connection } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderService } from '../order.service';
import { Order } from '../../entities/order.entity';
import { fakePayloadReq, fakePayloadReq2 } from '../fakeData/fakePayloadReq';
import {
  fakeProductResp,
  fakeProductRespWrongPrice,
} from '../../product/fakeData/fakeProductResp';
import { fakeVariantResp } from '../../variant/fakeData/fakeVariantResp';
import { OrderItem } from '../../entities/orderItem.entity';
import { Variant } from '../../entities/variant.entity';
import { VariantOption } from '../../entities/variantOption.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { fakeVariantOptionResp } from '../../variant-option/fakeData/fakeVariantOptionResp';
import { fakeOrderResp } from '../fakeData/fakeOrderResp';

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: Connection,
          useClass: ConnectionMock,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: productRepoMock,
        },
        {
          provide: getRepositoryToken(Order),
          useValue: orderRepoMock,
        },
        {
          provide: getRepositoryToken(OrderItem),
          useValue: orderItemRepoMock,
        },
        {
          provide: getRepositoryToken(Variant),
          useValue: variantRepoMock,
        },
        {
          provide: getRepositoryToken(VariantOption),
          useValue: variantOptionRepoMock,
        },
      ],
    }).compile();

    orderService = app.get<OrderService>(OrderService);
  });

  describe('addOrder', () => {
    it('should fail when validate product Id throw error', async () => {
      productRepoMock.findOne.mockImplementation(() => undefined);
      expect(productRepoMock.findOne.call.length).toEqual(1);
      await expect(orderService.addOrder(fakePayloadReq)).rejects.toThrow(
        new HttpException('Product Id not found!', HttpStatus.BAD_REQUEST),
      );
    });

    it('should fail when validate price throw error', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      productRepoMock.findOne.mockImplementationOnce(() => undefined);
      expect(productRepoMock.findOne.call.length).toEqual(1);
      await expect(orderService.addOrder(fakePayloadReq)).rejects.toThrow(
        new HttpException('Product price not match!', HttpStatus.BAD_REQUEST),
      );
    });

    it('should fail when validate variantId throw error', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      variantRepoMock.findOne.mockImplementationOnce(() => undefined);
      expect(productRepoMock.findOne.call.length).toEqual(1);
      expect(variantRepoMock.findOne.call.length).toEqual(1);
      await expect(orderService.addOrder(fakePayloadReq)).rejects.toThrow(
        new HttpException('Invalid variantId', HttpStatus.BAD_REQUEST),
      );
    });

    it('should fail when validate variantOptionId throw error', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      variantRepoMock.findOne.mockImplementationOnce(() => fakeVariantResp);
      variantOptionRepoMock.findOne.mockImplementationOnce(() => undefined);
      expect(productRepoMock.findOne.call.length).toEqual(1);
      expect(variantRepoMock.findOne.call.length).toEqual(1);
      expect(variantOptionRepoMock.findOne.call.length).toEqual(1);
      await expect(orderService.addOrder(fakePayloadReq)).rejects.toThrow(
        new HttpException('Variant option not found!', HttpStatus.BAD_REQUEST),
      );
    });

    it('should fail when validate product paymentamount throw error', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      variantRepoMock.findOne.mockImplementationOnce(() => fakeVariantResp);
      variantOptionRepoMock.findOne.mockImplementationOnce(
        () => fakeVariantOptionResp,
      );
      expect(productRepoMock.findOne.call.length).toEqual(1);
      expect(variantRepoMock.findOne.call.length).toEqual(1);
      expect(variantOptionRepoMock.findOne.call.length).toEqual(1);
      await expect(orderService.addOrder(fakePayloadReq)).rejects.toThrow(
        new HttpException('payment amount is invalid', HttpStatus.BAD_REQUEST),
      );
    });

    it('should success when validate product paymentamount throw error', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      variantRepoMock.findOne.mockImplementationOnce(() => fakeVariantResp);
      variantOptionRepoMock.findOne.mockImplementationOnce(
        () => fakeVariantOptionResp,
      );
      orderRepoMock.findOneOrFail.mockImplementationOnce(() => fakeOrderResp);
      expect(productRepoMock.findOne.call.length).toEqual(1);
      expect(variantRepoMock.findOne.call.length).toEqual(1);
      expect(variantOptionRepoMock.findOne.call.length).toEqual(1);
      expect(orderRepoMock.findOneOrFail.call.length).toEqual(1);
      expect(await orderService.addOrder(fakePayloadReq2)).toBeUndefined();
    });

    // it('should pass', async () => {
    //   productRepoMock.count.mockImplementationOnce(() => 0);
    //   expect(await orderService.addProduct(fakeNewProductReq)).toBeUndefined();
    //   expect(productRepoMock.insert.call.length).toEqual(1);
    // });
  });
});

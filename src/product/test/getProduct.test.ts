import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMock } from '../../mocks/mock.connection';
import { productRepoMock } from '../../mocks/repositories.mock';
import { Connection } from 'typeorm';
import {
  fakeExistProductReq,
  fakeNewProductReq,
} from '../fakeData/fakeProductReq';
import { ProductService } from '../product.service';
import { Product } from '../../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { fakeProductResp } from '../fakeData/fakeProductResp';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: Connection,
          useClass: ConnectionMock,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: productRepoMock,
        },
      ],
    }).compile();

    productService = app.get<ProductService>(ProductService);
  });

  describe('getProduct', () => {
    productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
    it('should return product', async () => {
      expect(productRepoMock.findOne.call.length).toEqual(1);
      expect(await productService.getProduct(1)).toEqual(fakeProductResp);
    });

    it('should throw error', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => undefined);
      await expect(productService.getProduct(1000)).rejects.toThrowError(
        new HttpException('Id not found!', HttpStatus.BAD_REQUEST),
      );
    });
  });
});

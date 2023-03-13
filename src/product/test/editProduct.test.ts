import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMock } from '../../mocks/mock.connection';
import { productRepoMock, redisRepoMock } from '../../mocks/repositories.mock';
import { Connection } from 'typeorm';
import {
  fakeExistProductReq,
  fakeNewProductReq,
} from '../fakeData/fakeProductReq';
import { ProductService } from '../product.service';
import { Product } from '../../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { fakeProductEditReq } from '../fakeData/fakeProductEditReq';
import { fakeProductResp } from '../fakeData/fakeProductResp';
import { RedisRepository } from '../../repositories/redis.repository';

describe('ProductService', () => {
  let productService: ProductService;
  let redisRepository: RedisRepository;

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
        {
          provide: RedisRepository,
          useValue: redisRepoMock,
        },
      ],
    }).compile();

    productService = app.get<ProductService>(ProductService);
    redisRepository = app.get<RedisRepository>(RedisRepository);
  });

  describe('editProduct', () => {
    it('should pass and success update edit', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      productRepoMock.count.mockImplementationOnce(() => 0);
      expect(productRepoMock.save.call.length).toEqual(1);
      expect(await productService.editProduct(fakeProductEditReq, 1))
        .toBeUndefined;
    });

    it('throw error product name exist', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => fakeProductResp);
      productRepoMock.count.mockImplementationOnce(() => 1);
      await expect(
        productService.editProduct(fakeProductEditReq, 1),
      ).rejects.toThrow(new Error('Product name exist!'));
    });

    it('throw error Id not found', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => undefined);
      await expect(
        productService.editProduct(fakeProductEditReq, 1),
      ).rejects.toThrow(new Error('Id not found!'));
    });
  });
});

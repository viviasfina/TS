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

  describe('addProduct', () => {
    it('should throw error', async () => {
      await expect(
        productService.addProduct(fakeExistProductReq),
      ).rejects.toEqual(
        new HttpException('Product exist!', HttpStatus.BAD_REQUEST),
      );
    });

    it('should pass', async () => {
      productRepoMock.count.mockImplementationOnce(() => 0);
      expect(
        await productService.addProduct(fakeNewProductReq),
      ).toBeUndefined();
      expect(productRepoMock.insert.call.length).toEqual(1);
    });
  });
});

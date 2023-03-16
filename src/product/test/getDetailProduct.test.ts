import { Test, TestingModule } from '@nestjs/testing';
import { productRepoMock, redisRepoMock } from '../../mocks/repositories.mock';
import { ProductService } from '../product.service';
import { Product } from '../../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { fakeProductDetailResp } from '../fakeData/fakeProductResp';
import { RedisRepository } from '../../repositories/redis.repository';
import { Connection } from 'typeorm';
import {
  fakeProductDetailResp2,
  fakeProductDetailResult,
} from '../fakeData/fakeProductDetailResp';

describe('ProductService', () => {
  let productService: ProductService;
  const mockConnectionValue = {
    manager: {
      query: jest.fn(),
    },
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: Connection,
          useValue: mockConnectionValue,
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
  });

  describe('getDetailProduct', () => {
    it('should success get from redis', async () => {
      redisRepoMock.getCache.mockImplementationOnce(
        () => fakeProductDetailResp,
      );
      expect(await redisRepoMock.getCache.call.length).toEqual(1);
      expect(await productService.getProductDetail(1)).toEqual(
        fakeProductDetailResp,
      );
    });
    it('should fail get from redis and success retrieve from db', async () => {
      mockConnectionValue.manager.query.mockImplementationOnce(
        () => fakeProductDetailResult,
      );
      expect(await productService.getProductDetail(1)).toEqual(
        fakeProductDetailResp2,
      );
    });
  });
});

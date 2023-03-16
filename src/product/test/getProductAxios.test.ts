/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMock } from '../../mocks/mock.connection';
import { Connection } from 'typeorm';

import { ProductService } from '../product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { productRepoMock, redisRepoMock } from '../../mocks/repositories.mock';
import { RedisRepository } from '../../repositories/redis.repository';
import axios, { Axios } from 'axios';
import { fakeApiResponses } from '../fakeData/fakeApiResponses';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

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
        {
          provide: RedisRepository,
          useValue: redisRepoMock,
        },
      ],
    }).compile();

    productService = app.get<ProductService>(ProductService);
  });

  describe('getProduct using Axios', () => {
    it('should success and return', async () => {
      const data = mockAxios.post.mockResolvedValueOnce({
        data: {
          data: fakeApiResponses.data,
        },
      });
      //jest.mockAxios.post.mockResolvedValue(fakeApiResponses);
      //console.log(await productService.getProductAxios());
      expect(await productService.getProductAxios()).toEqual(fakeApiResponses);
    });
  });
});

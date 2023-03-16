/* eslint-disable @typescript-eslint/no-var-requires */
import { Test, TestingModule } from '@nestjs/testing';
import { RedisRepository } from '../../repositories/redis.repository';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ProductDetailDTO } from 'src/DTOes/ProductDetailDTO.class';

describe('ProductService', () => {
  const mockRes = {
    on: () =>
      jest.fn().mockImplementation((event, cb) => {
        if (event === 'error') {
          cb(new Error('errorrr'));
        }
      }),
    end: () => jest.fn(),
  };

  let redisRepository: RedisRepository;
  let cacheManager: Cache;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RedisRepository,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => 'any value',
            set: () => jest.fn(),
            store: {
              getClient: () => mockRes,
              // on: () => jest.fn(),
              // // jest.fn().mockImplementation((event, cb) => {
              // //   if (event == 'connect') {
              // //     cb();
              // //   }
              // // }),
              // end: () => jest.fn(),
            },
          },
        },
      ],
    }).compile();
    redisRepository = app.get<RedisRepository>(RedisRepository);
    cacheManager = app.get(CACHE_MANAGER);
  });

  describe('getCache', () => {
    it('should pass', async () => {
      await redisRepository.getCache<ProductDetailDTO>('1');
      //expect(mockRes.on).toHaveBeenCalledWith('error', expect.any(Function));
      //expect(await redisRepoMock.getCache('1')).toEqual(fakeProductDetailResp);
      //expect(productRepoMock.insert.call.length).toEqual(1);
    });
  });
});

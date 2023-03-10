/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { CACHE_MANAGER, Global, Module } from '@nestjs/common';
import * as cacheManager from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisRepository } from './repositories/redis.repository';

export function redisModuleFactory(
  host: string,
  port: number,
  ttl: number,
): any {
  @Global()
  @Module({
    providers: [
      {
        provide: CACHE_MANAGER,
        useFactory: (): any =>
          cacheManager.caching({
            store: redisStore,
            host,
            port,
            ttl,
          }),
      },
      RedisRepository,
    ],
    exports: [CACHE_MANAGER, RedisRepository],
  })
  class RedisModule {}

  return RedisModule;
}

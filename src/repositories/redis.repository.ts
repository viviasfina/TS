import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';

import { RedisCache } from '../interfaces/IRedisCache.interface';

const redisNotAvailable = 'Redis is not available';
@Injectable()
export class RedisRepository {
  private REDIS_AVAILABLE = true;
  private ttlRedisDefault = 60;

  constructor(
    @Inject(CACHE_MANAGER)
    private manager: RedisCache & { ignoreCacheErrors: boolean },
  ) {
    const client = this.manager.store.getClient();

    this.setClient(client);

    this.manager.ignoreCacheErrors = true;
  }

  isAvailable(): boolean {
    return this.REDIS_AVAILABLE;
  }

  async getCache<T = any>(key: string): Promise<T> {
    const cacheKey = `${key}`;

    if (!this.isAvailable()) {
      console.info(redisNotAvailable);

      return;
    }

    const result: T = await this.manager.get(cacheKey);

    if (result) {
      return result;
    } else {
      return;
    }
  }

  async getKeyWildCard<T = any>(wildCard: string): Promise<T> {
    if (!this.isAvailable()) {
      console.info(redisNotAvailable);

      return;
    }

    const result: T = await this.manager.store.keys(`*${wildCard}*`);
    return result;
  }

  async delCache(keys: string | string[]): Promise<void | boolean> {
    if (!this.isAvailable()) {
      console.info(redisNotAvailable);

      return false;
    }

    console.info('keys', keys);
    const result = await this.manager.store.del(keys);
    console.info('result', result);
  }

  async setCache(
    key: string,
    value: any,
    ttl = this.ttlRedisDefault,
  ): Promise<boolean> {
    const cacheKey = `${key}`;

    if (!this.isAvailable()) {
      console.info(redisNotAvailable);
      return false;
    }

    await this.manager.set(cacheKey, value, { ttl });

    return true;
  }

  private setRedisAvailability(value: boolean): void {
    this.REDIS_AVAILABLE = value;
  }

  private setClient(client: RedisClient): void {
    if (this.isAvailable()) {
      client.on('error', (error) => {
        console.error("Can't connect to redis server", error);

        this.setRedisAvailability(false);

        client.end(true);
      });

      client.on('connect', () => {
        console.info('Connected to redis server');
      });
    } else {
      console.info('Skip connection to redis server');

      const endConnection = (): void => {
        client.end(true);
      };

      client.on('error', endConnection);

      client.on('connect', endConnection);
    }
  }
}

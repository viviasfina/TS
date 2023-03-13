import { Cache } from 'cache-manager';

import { RedisStore } from './IRedisStore.interface';

export interface RedisCache extends Cache {
  store: RedisStore;
}

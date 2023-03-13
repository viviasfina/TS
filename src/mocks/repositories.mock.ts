import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/orderItem.entity';
import { Product } from 'src/entities/product.entity';
import { Variant } from 'src/entities/variant.entity';
import { VariantOption } from 'src/entities/variantOption.entity';
import { TypeOrmMockRepository } from './typeOrmRepositories.mock';

export const productRepoMock = new TypeOrmMockRepository<Product>();
export const variantRepoMock = new TypeOrmMockRepository<Variant>();
export const orderRepoMock = new TypeOrmMockRepository<Order>();
export const variantOptionRepoMock = new TypeOrmMockRepository<VariantOption>();
export const orderItemRepoMock = new TypeOrmMockRepository<OrderItem>();
export const redisRepoMock = {
  delCache: jest.fn(),
  setCache: jest.fn(),
  getCache: jest.fn(),
  getKeyWildCard: jest.fn(),
};

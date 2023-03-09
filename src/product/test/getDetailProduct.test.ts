import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMock, mockQueryRunner } from '../../mocks/mock.connection';
import { productRepoMock } from '../../mocks/repositories.mock';
import { Connection } from 'typeorm';
import { ProductService } from '../product.service';
import { Product } from '../../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { fakeProductDetailResp } from '../fakeData/fakeProductResp';
import { mockEntityManager } from '../../mocks/typeOrmRepositories.mock';

describe('ProductService', () => {
  let productService: ProductService;
  let connection: Connection;
  beforeEach(async () => {
    Object.defineProperty(ConnectionMock, 'manager', {});
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
    connection = app.get<Connection>(Connection);
  });

  describe('getDetailProduct', () => {
    it('should success ', async () => {
      const mockedManager = {
        query: jest.fn(),
      };
      mockEntityManager.query.getMockImplementation;
      expect(await productService.getProductDetail(1)).toBeUndefined();
    });
  });
});

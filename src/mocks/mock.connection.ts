import { EntityManager, QueryRunner } from 'typeorm';

export const mockQueryRunner: Partial<QueryRunner> = {
  manager: {} as EntityManager,
  connect: jest.fn(),
  release: jest.fn(),
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
};
export class ConnectionMock {
  manager: EntityManager;
  query(): Partial<QueryRunner> {
    return mockQueryRunner;
  }
  createQueryRunner(): Partial<QueryRunner> {
    return mockQueryRunner;
  }
}

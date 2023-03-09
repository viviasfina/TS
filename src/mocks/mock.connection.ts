import { EntityManager, QueryRunner } from 'typeorm';

export const mockQueryRunner: Partial<QueryRunner> = {
  manager: {} as EntityManager,
  connect: jest.fn(),
  release: jest.fn(),
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
};
// const entityManagerMock = { createQueryBuilder: () => mockQueryRunner };
// const queryMock = jest.fn(
//   async (passedFunction) => await passedFunction(entityManagerMock),
// );

// jest.mock('typeorm', () => ({
//   getConnection: () => ({ query: queryMock }),
// }));
export class ConnectionMock {
  manager: EntityManager;
  query(): Promise<any> {
    return undefined;
  }
  createQueryRunner(): Partial<QueryRunner> {
    return mockQueryRunner;
  }
}

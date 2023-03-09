import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMock } from '../../mocks/mock.connection';
import {
  productRepoMock,
  variantRepoMock,
} from '../../mocks/repositories.mock';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Variant } from '../../entities/variant.entity';
import { VariantService } from '../variant.service';
import { fakeVariantResp } from '../fakeData/fakeVariantResp';
import { Product } from '../../entities/product.entity';

describe('VariantService', () => {
  let variantService: VariantService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        VariantService,
        {
          provide: Connection,
          useClass: ConnectionMock,
        },
        {
          provide: getRepositoryToken(Variant),
          useValue: variantRepoMock,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: productRepoMock,
        },
      ],
    }).compile();

    variantService = app.get<VariantService>(VariantService);
  });

  describe('getVariant', () => {
    variantRepoMock.findOne.mockImplementationOnce(() => fakeVariantResp);
    it('should return variant', async () => {
      expect(variantRepoMock.findOne.call.length).toEqual(1);
      expect(await variantService.getVariant(1)).toEqual(fakeVariantResp);
    });

    it('should throw error id not found', async () => {
      variantRepoMock.findOne.mockImplementationOnce(() => undefined);
      await expect(variantService.getVariant(1000)).rejects.toThrowError(
        new HttpException('Variant not found', HttpStatus.BAD_REQUEST),
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMock } from '../../mocks/mock.connection';
import {
  productRepoMock,
  variantRepoMock,
} from '../../mocks/repositories.mock';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { VariantService } from '../variant.service';
import { Variant } from '../../entities/variant.entity';
import {
  fakeEditVariantReq,
  fakeExistVariantReq,
  fakeIdVariantReq,
  fakeNewVariantReq,
  fakeVariantFindResp,
} from '../fakeData/fakeVariantReq';
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

  describe('editVariant', () => {
    it('should pass and update req]', async () => {
      variantRepoMock.findOne.mockImplementationOnce(() => fakeVariantFindResp);
      variantRepoMock.count.mockImplementationOnce(() => 0);
      expect(variantRepoMock.save.call.length).toEqual(1);
      expect(await variantRepoMock.count.call.length).toEqual(1);
      expect(
        await variantService.editVariant(fakeEditVariantReq, 1),
      ).toBeUndefined();
    });

    it('should throw error variant exist]', async () => {
      variantRepoMock.findOne.mockImplementationOnce(() => fakeVariantFindResp);
      variantRepoMock.count.mockImplementationOnce(() => 1);
      expect(await variantRepoMock.count.call.length).toEqual(1);
      await expect(
        variantService.editVariant(fakeEditVariantReq, 1),
      ).rejects.toThrow(new Error('Variant name exist!'));
    });

    it('should throw error variant exist]', async () => {
      variantRepoMock.findOne.mockImplementationOnce(() => undefined);
      await expect(
        variantService.editVariant(fakeEditVariantReq, 1000),
      ).rejects.toThrow(
        new HttpException('Id not found!', HttpStatus.BAD_REQUEST),
      );
    });
  });
});

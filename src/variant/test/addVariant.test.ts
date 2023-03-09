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
  fakeExistVariantReq,
  fakeIdVariantReq,
  fakeNewVariantReq,
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

  describe('addVariant', () => {
    it('should throw error Id not found', async () => {
      productRepoMock.findOne.mockImplementationOnce(() => undefined);
      await expect(variantService.addVariant(fakeIdVariantReq)).rejects.toEqual(
        new HttpException('Id not found', HttpStatus.BAD_REQUEST),
      );
    });

    it('should pass', async () => {
      productRepoMock.findOne.mockImplementationOnce(
        (product) =>
          (product = {
            id: 6,
            price: 40000,
            position: 0,
            productName: 'Tes',
            categoryName: 'Electronic',
          }),
      );
      variantRepoMock.count.mockImplementation(() => 0);
      expect(
        await variantService.addVariant(fakeNewVariantReq),
      ).toBeUndefined();
      expect(variantRepoMock.insert.call.length).toEqual(1);
    });

    it('should throw error Variant exist', async () => {
      productRepoMock.findOne.mockImplementationOnce(
        (product) =>
          (product = {
            id: 6,
            price: 40000,
            position: 0,
            productName: 'Tes',
            categoryName: 'Electronic',
          }),
      );
      variantRepoMock.count.mockImplementation(() => 1);
      await expect(
        variantService.addVariant(fakeExistVariantReq),
      ).rejects.toEqual(
        new HttpException('Variant exist!', HttpStatus.BAD_REQUEST),
      );
    });
  });
});

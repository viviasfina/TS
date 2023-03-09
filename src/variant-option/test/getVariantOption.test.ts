import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMock } from '../../mocks/mock.connection';
import { variantOptionRepoMock } from '../../mocks/repositories.mock';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { VariantOptionService } from '../variantOption.service';
import { VariantOption } from '../../entities/variantOption.entity';
import {
  fakeVariantOptionResp,
  fakeVariantOptionResp1,
} from '../fakeData/fakeVariantOptionResp';

describe('VariantOptionService', () => {
  let variantOptionService: VariantOptionService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        VariantOptionService,
        {
          provide: Connection,
          useClass: ConnectionMock,
        },
        {
          provide: getRepositoryToken(VariantOption),
          useValue: variantOptionRepoMock,
        },
      ],
    }).compile();

    variantOptionService = app.get<VariantOptionService>(VariantOptionService);
  });

  describe('getVariantOption', () => {
    it('should return variant', async () => {
      variantOptionRepoMock.findOne.mockImplementationOnce(
        () => fakeVariantOptionResp1,
      );
      expect(variantOptionRepoMock.findOne.call.length).toEqual(1);
      expect(await variantOptionService.getVariantOption(1)).toEqual(
        fakeVariantOptionResp,
      );
    });

    it('should throw error id not found', async () => {
      variantOptionRepoMock.findOne.mockImplementationOnce(() => undefined);
      await expect(
        variantOptionService.getVariantOption(1000),
      ).rejects.toThrowError(
        new HttpException('Id not found!', HttpStatus.BAD_REQUEST),
      );
    });
  });
});

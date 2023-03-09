import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMock } from '../../mocks/mock.connection';
import { variantOptionRepoMock } from '../../mocks/repositories.mock';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { VariantOptionService } from '../variantOption.service';
import { VariantOption } from '../../entities/variantOption.entity';
import { fakeVariantOptionReq } from '../fakeData/fakeVariantOptionReq';

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

  describe('addVariantOption', () => {
    it('should throw error', async () => {
      variantOptionRepoMock.count.mockImplementationOnce(() => 1);
      await expect(
        variantOptionService.addVariantOption(fakeVariantOptionReq),
      ).rejects.toEqual(
        new HttpException('Variant Option exist!', HttpStatus.BAD_REQUEST),
      );
    });

    it('should pass', async () => {
      variantOptionRepoMock.count.mockImplementationOnce(() => 0);
      expect(
        await variantOptionService.addVariantOption(fakeVariantOptionReq),
      ).toBeUndefined();
      expect(variantOptionRepoMock.insert.call.length).toEqual(1);
    });
  });
});

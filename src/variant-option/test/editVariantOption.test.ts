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
import { fakeEditVariantOptionReq } from '../fakeData/fakeVariantOptionReq';

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

  describe('editVariantOption', () => {
    it('should pass and save update', async () => {
      variantOptionRepoMock.findOne.mockImplementationOnce(
        () => fakeVariantOptionResp1,
      );
      variantOptionRepoMock.count.mockImplementationOnce(() => 0);
      expect(variantOptionRepoMock.count.call.length).toEqual(1);
      expect(variantOptionRepoMock.save.call.length).toEqual(1);
      expect(variantOptionRepoMock.findOne.call.length).toEqual(1);
      expect(
        await variantOptionService.editVariantOption(
          fakeEditVariantOptionReq,
          1,
        ),
      ).toBeUndefined();
    });

    it('should error variantoption name exist', async () => {
      variantOptionRepoMock.findOne.mockImplementationOnce(
        () => fakeVariantOptionResp1,
      );
      variantOptionRepoMock.count.mockImplementationOnce(() => 1);
      expect(variantOptionRepoMock.count.call.length).toEqual(1);
      expect(variantOptionRepoMock.findOne.call.length).toEqual(1);
      await expect(
        variantOptionService.editVariantOption(fakeEditVariantOptionReq, 1),
      ).rejects.toThrow(new Error('VariantOption name exist!'));
    });

    it('should throw error id not found', async () => {
      variantOptionRepoMock.findOne.mockImplementationOnce(() => undefined);
      await expect(
        variantOptionService.editVariantOption(fakeEditVariantOptionReq, 1000),
      ).rejects.toThrowError(
        new HttpException('Id not found!', HttpStatus.BAD_REQUEST),
      );
    });
  });
});

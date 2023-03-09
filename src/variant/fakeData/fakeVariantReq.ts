import { VariantPutRequestDTO } from 'src/DTOes/VariantPutRequestDTO.class';
import { VariantRequestDTO } from 'src/DTOes/VariantRequestDTO.class';
import { Variant } from 'src/entities/variant.entity';

export const fakeIdVariantReq: VariantRequestDTO = {
  productId: 1000,
  variantName: 'Available-in',
};

export const fakeNewVariantReq: VariantRequestDTO = {
  productId: 6,
  variantName: 'Sugar Level',
};

export const fakeExistVariantReq: VariantRequestDTO = {
  productId: 3,
  variantName: 'Available-in',
};

export const fakeVariantFindResp = {
  id: 1,
  variantName: 'Essentials',
  productId: 1,
  variantOption: [],
};
export const fakeEditVariantReq: VariantPutRequestDTO = {
  variantName: 'Essentials',
};

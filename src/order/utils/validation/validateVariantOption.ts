/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { VariantOption } from 'src/entities/variantOption.entity';

export const validateVariantOptionId = (
  variantOption: VariantOption,
): number => {
  try {
    if (variantOption) {
      return variantOption.id;
    }
    throw new Error('Invalid variantOptionId');
  } catch (error) {
    throw new HttpException(
      'Variant option not found!',
      HttpStatus.BAD_REQUEST,
    );
  }
};

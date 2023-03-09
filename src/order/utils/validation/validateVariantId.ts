/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Variant } from 'src/entities/variant.entity';
import { Repository } from 'typeorm';

export const validateVariantId = (variant: Variant): number => {
  try {
    if (variant) {
      return variant.id;
    }
    throw new Error('Invalid variantId');
  } catch (error) {
    throw new HttpException('Invalid variantId', HttpStatus.BAD_REQUEST);
  }
};

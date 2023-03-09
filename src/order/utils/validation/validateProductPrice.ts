/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

export const validateProductPrice = (product: Product): void => {
  try {
    if (!product) {
      throw new Error('Invalid product price');
    }
  } catch (error) {
    throw new HttpException('Product price not match!', HttpStatus.BAD_REQUEST);
  }
};

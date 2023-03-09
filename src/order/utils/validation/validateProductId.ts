/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus } from '@nestjs/common';
import { async, throwError } from 'rxjs';
import { itemPayloadDTO } from 'src/DTOes/itemPayloadDTO.class';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

export const validateProductId = (product: Product): void => {
  try {
    if (!product) {
      throw new Error('Product Id not found');
    }
  } catch (error) {
    throw new HttpException('Product Id not found!', HttpStatus.BAD_REQUEST);
  }
};

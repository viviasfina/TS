import { HttpException, HttpStatus } from '@nestjs/common';

/* eslint-disable prettier/prettier */
export const validateProductPaymentAmounts = (
  total: number,
  paymentAmount: number,
  discount: number,
): void => {
  try {
     if (paymentAmount !== total - discount) {
       throw new Error("Payment amount is invalid")
     }
  } catch (error) {
    throw new HttpException(
      'payment amount is invalid',
      HttpStatus.BAD_REQUEST,
    );
  }
 
};

import { IsNumber, IsString } from 'class-validator';

export class VariantOptionReqDTO {
  @IsNumber()
  variantId: number;
  @IsString()
  variantOptionName: string;
  @IsNumber()
  priceDifference: number;
}

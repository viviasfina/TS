import { IsNumber, IsString } from 'class-validator';

export class VariantRequestDTO {
  @IsNumber()
  productId: number;
  @IsString()
  variantName: string;
}

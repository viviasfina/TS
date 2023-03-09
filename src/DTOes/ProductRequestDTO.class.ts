import { IsNumber, IsString } from 'class-validator';

export class ProductRequestDTO {
  @IsString()
  productName: string;
  @IsNumber()
  price: number;
  @IsString()
  categoryName: string;
}

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VariantPutRequestDTO } from 'src/DTOes/VariantPutRequestDTO.class';
import { VariantRequestDTO } from 'src/DTOes/VariantRequestDTO.class';
import { Variant } from 'src/entities/variant.entity';
import { VariantService } from './variant.service';

@Controller()
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  //3
  @Post('variants')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addVariant(@Body() variantRequest: VariantRequestDTO): Promise<void> {
    await this.variantService.addVariant(variantRequest);
  }

  //4
  @Get('variants/:id')
  async getVariant(@Param('id') id: number): Promise<Variant> {
    return await this.variantService.getVariant(id);
  }

  //9
  @Put('/variants/:id')
  async editProduct(
    @Body() variantPutRequest: VariantPutRequestDTO,
    @Param('id') id: number,
  ): Promise<void> {
    await this.variantService.editVariant(variantPutRequest, id);
  }
}

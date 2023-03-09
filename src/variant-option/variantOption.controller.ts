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
import { VariantOptionPutRequestDTO } from 'src/DTOes/VariantOptionPutRequestDTO.class';
import { VariantOptionReqDTO } from 'src/DTOes/VariantOptionReqDTO.class';
import { VariantOptionResponsesDTO } from 'src/DTOes/VariantOptionResponsesDTO.class';
import { VariantOptionService } from './variantOption.service';

@Controller()
export class VariantOptionController {
  constructor(private readonly variantOptionService: VariantOptionService) {}

  //5
  @Post('variant-option')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addVariantOption(
    @Body() variantOptionReq: VariantOptionReqDTO,
  ): Promise<void> {
    return await this.variantOptionService.addVariantOption(variantOptionReq);
  }

  //6
  @Get('/variant-option/:id')
  async getVariantOption(
    @Param('id') id: number,
  ): Promise<VariantOptionResponsesDTO> {
    return await this.variantOptionService.getVariantOption(id);
  }

  //10
  @Put('variant-options/:id')
  async editVariantOption(
    @Body() variantOptionPutRequest: VariantOptionPutRequestDTO,
    @Param('id') id: number,
  ): Promise<void> {
    await this.variantOptionService.editVariantOption(
      variantOptionPutRequest,
      id,
    );
  }
}

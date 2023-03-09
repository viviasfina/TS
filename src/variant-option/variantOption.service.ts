/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { VariantOptionDTO } from '../DTOes/VariantOptionDTO.class';
import { VariantOptionPutRequestDTO } from '../DTOes/VariantOptionPutRequestDTO.class';
import { VariantOptionReqDTO } from '../DTOes/VariantOptionReqDTO.class';
import { VariantOptionResponsesDTO } from '../DTOes/VariantOptionResponsesDTO.class';
import { VariantOption } from '../entities/variantOption.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class VariantOptionService {
  manager = this.connection.manager;
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(VariantOption)
    private variantOptionRepository: Repository<VariantOption>,
  ) {}

  //5
  async addVariantOption(variantOptionReq: VariantOptionReqDTO): Promise<void> {
    //console.log(variantOptionReq);
    try {
      const count = await this.variantOptionRepository.count({
        where: {
          name: variantOptionReq.variantOptionName,
        },
      });
      //console.log("ini count:",count);
      if (count === 0) {
        const variantOption = new VariantOptionDTO();
        variantOption.name = variantOptionReq.variantOptionName;
        variantOption.variantId = variantOptionReq.variantId;
        variantOption.priceDifference = variantOptionReq.priceDifference;
        this.variantOptionRepository.insert(variantOption);
      } else {
        throw new Error('Variant option exist!');
      }
    } catch (error) {
      throw new HttpException('Variant Option exist!', HttpStatus.BAD_REQUEST);
    }
  }

  //6
  async getVariantOption(id: number): Promise<VariantOptionResponsesDTO> {
    const findVariantOption = await this.variantOptionRepository.findOne({
      id,
    });
    if (findVariantOption) {
      const variantOption = new VariantOptionResponsesDTO();
      variantOption.id = findVariantOption.id;
      variantOption.variantOptionName = findVariantOption.name;
      variantOption.variantId = findVariantOption.variantId;
      variantOption.priceDifference = findVariantOption.priceDifference;
      return variantOption;
    } else {
      throw new HttpException('Id not found!', HttpStatus.BAD_REQUEST);
    }
  }

  //10
  async editVariantOption(
    variantOptionPutRequest: VariantOptionPutRequestDTO,
    id: number,
  ): Promise<void> {
    const variantOptionUpdate = await this.variantOptionRepository.findOne({
      id: id,
    });
    if (variantOptionUpdate) {
      const count = await this.variantOptionRepository.count({
        where: { name: variantOptionPutRequest.variantOptionName },
      });
      if (count === 0) {
        variantOptionUpdate.name = variantOptionPutRequest.variantOptionName;
        await this.variantOptionRepository.save(variantOptionUpdate);
      } else {
        throw new Error('VariantOption name exist!');
      }
    } else {
      throw new HttpException('Id not found!', HttpStatus.BAD_REQUEST);
    }
  }
}

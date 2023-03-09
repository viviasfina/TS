/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { VariantPutRequestDTO } from 'src/DTOes/VariantPutRequestDTO.class';
import { VariantRequestDTO } from 'src/DTOes/VariantRequestDTO.class';
import { Product } from '../entities/product.entity';
import { Variant } from '../entities/variant.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class VariantService {
  manager = this.connection.manager;
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  //3
  async addVariant(variantRequest: VariantRequestDTO): Promise<void> {
    const product = await this.productRepository.findOne({
      where: {
        id: variantRequest.productId,
      },
    });
    if (product) {
      const count = await this.variantRepository.count({
        where: {
          variantName: variantRequest.variantName,
        },
      });
      if (count === 0) {
        this.variantRepository.insert(variantRequest);
      } else {
        throw new HttpException('Variant exist!', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Id not found', HttpStatus.BAD_REQUEST);
    }
  }

  //4
  async getVariant(id: number): Promise<Variant> {
    const findVariant = await this.variantRepository.findOne({ id });
    if (findVariant) {
      return findVariant;
    } else {
      throw new HttpException('Variant not found', HttpStatus.BAD_REQUEST);
    }
  }

  //9
  async editVariant(
    variantPutRequest: VariantPutRequestDTO,
    id: number,
  ): Promise<void> {
    const variantUpdate = await this.variantRepository.findOne({ id: id });
    if (variantUpdate) {
      const count = await this.variantRepository.count({
        where: { variantName: variantPutRequest.variantName },
      });
      if (count === 0) {
        variantUpdate.variantName = variantPutRequest.variantName;
        await this.variantRepository.save(variantUpdate);
      } else {
        throw new Error('Variant name exist!');
      }
    } else {
      throw new HttpException('Id not found!', HttpStatus.BAD_REQUEST);
    }
  }
}

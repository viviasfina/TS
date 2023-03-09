/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { OptionProductDetailDTO } from '../DTOes/OptionProductDetailDTO.class';
import { ProductDetailDTO } from '../DTOes/ProductDetailDTO.class';
import { ProductPutRequestDTO } from '../DTOes/ProductPutRequestDTO.class';
import { ProductRequestDTO } from '../DTOes/ProductRequestDTO.class';
import { VariantProductDetailDTO } from '../DTOes/VariantProductDetailDTO.class';
import { Product } from '../entities/product.entity';
import {
  Connection,
  createQueryBuilder,
  getConnection,
  Repository,
} from 'typeorm';
import { disconnect } from 'process';

@Injectable()
export class ProductService {
  manager = this.connection.manager;

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  //1
  async addProduct(productRequest: ProductRequestDTO): Promise<void> {
    try {
      const count = await this.productRepository.count({
        where: {
          productName: productRequest.productName,
        },
      });
      if (count === 0) {
        this.productRepository.insert(productRequest);
      } else {
        throw new Error('Product exist!');
      }
    } catch (error) {
      throw new HttpException('Product exist!', HttpStatus.BAD_REQUEST);
    }
  }

  //2
  async getProduct(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOne(id);
      //console.info(product);
      if (product) {
        return product;
      } else {
        throw new Error('Id not found!');
      }
    } catch (error) {
      throw new HttpException('Id not found!', HttpStatus.BAD_REQUEST);
    }
  }

  //8
  async editProduct(
    productPutRequest: ProductPutRequestDTO,
    id: number,
  ): Promise<void> {
    const productUpdate = await this.productRepository.findOne({
      id: id,
    });
    if (productUpdate) {
      const count = await this.productRepository.count({
        where: { productName: productPutRequest.productName },
      });
      if (count === 0) {
        productUpdate.productName = productPutRequest.productName;
        productUpdate.categoryName = productPutRequest.categoryName;
        await this.productRepository.save(productUpdate);
      } else {
        throw new Error('Product name exist!');
      }
    } else {
      throw new Error('Id not found!');
    }
  }

  //7
  async getProductDetail(id: number): Promise<ProductDetailDTO> {
    //this.connection.createQueryRunner();
    console.info('ini connection: ', this.connection);
    this.productRepository.find({
      relations: {
        variants: true,
      },
    });
    const query = `SELECT productName, price,categoryName, v.variantName, vo.name as variantOptionName,vo.priceDifference  FROM orders_schema.products p join orders_schema.variants v on p.id =v.productId 
      JOIN orders_schema.variant_options vo on v.id =vo.variantId
      WHERE v.productId =?
      GROUP BY productName, price,categoryName, v.variantName, vo.name ,vo.priceDifference
      ORDER BY variantName ASC`;
    const param = [id];
    console.info('ini manager:', this.manager);
    const result = await this.manager.query(query, param);
    const responseProductDetail: ProductDetailDTO = {
      productName: '',
      price: 0,
      categoryName: '',
      variants: [],
    };

    for (const item of result) {
      responseProductDetail.productName = item.productName;
      responseProductDetail.price = parseInt(item.price);
      responseProductDetail.categoryName = item.categoryName;

      const checkVariant = responseProductDetail.variants.find(
        (variant) => variant.name === item.variantName,
      );
      if (!checkVariant) {
        const newVariant = new VariantProductDetailDTO();
        newVariant.name = item.variantName;
        newVariant.options = [];
        const newVariantOption = new OptionProductDetailDTO();
        newVariantOption.name = item.variantOptionName;
        newVariantOption.priceDifference = parseInt(item.priceDifference);

        newVariant.options.push(newVariantOption);
        responseProductDetail.variants.push(newVariant);
      } else {
        const getIndex = responseProductDetail.variants.findIndex(
          (variant) => variant.name === item.variantName,
        );
        const newVariantOption = new OptionProductDetailDTO();
        newVariantOption.name = item.variantOptionName;
        newVariantOption.priceDifference = parseInt(item.priceDifference);

        responseProductDetail.variants[getIndex].options.push(newVariantOption);
      }
    }
    return responseProductDetail;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { OptionProductDetailDTO } from '../DTOes/OptionProductDetailDTO.class';
import { ProductDetailDTO } from '../DTOes/ProductDetailDTO.class';
import { ProductPutRequestDTO } from '../DTOes/ProductPutRequestDTO.class';
import { ProductRequestDTO } from '../DTOes/ProductRequestDTO.class';
import { VariantProductDetailDTO } from '../DTOes/VariantProductDetailDTO.class';
import { Product } from '../entities/product.entity';
import { Connection, Repository } from 'typeorm';
import { RedisRepository } from '../repositories/redis.repository';
import { ApiResponsesDTO } from 'src/DTOes/ApiResponsesDTO.class';
import axios from 'axios';

@Injectable()
export class ProductService {
  manager = this.connection.manager;

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private readonly redisRepo: RedisRepository,
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
    const detail = await this.redisRepo.getCache<ProductDetailDTO>(
      id.toString(),
    );
    if (detail) {
      console.info('ini hasil cache redis dalam if :', detail);
      return detail;
    }

    console.info('Connection', this.connection);
    const query = `SELECT productName, price,categoryName, v.variantName, vo.name as variantOptionName,vo.priceDifference  FROM orders_schema.products p join orders_schema.variants v on p.id =v.productId 
      JOIN orders_schema.variant_options vo on v.id =vo.variantId
      WHERE v.productId =?
      GROUP BY productName, price,categoryName, v.variantName, vo.name ,vo.priceDifference
      ORDER BY variantName ASC`;
    const param = [id];
    //console.info('ini manager:', this.manager);
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
    await this.redisRepo.setCache(id.toString(), responseProductDetail);
    return responseProductDetail;
  }

  async getProductAxios(): Promise<ApiResponsesDTO> {
    console.log('ini link: ', process.env.API_LINK);
    console.log('ini value: ', process.env.API_LINK_VALUE);
    const { data } = await axios.post(
      process.env.API_LINK,
      {
        productIds: [
          '3432ad20-2365-432d-9fc2-cc79b67f2e65',
          '55165480-3e1a-11ed-9da6-0ad64c6be1ec',
        ],
      },
      {
        headers: {
          'x-api-key': process.env.API_LINK_VALUE,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { SuccessResponseDto } from '../../Commons/Responses/Swagger-response-dtos/Common/success-response.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(pages: number, limit: number) {
    const {data, page, pageCount, totalCount} = await this.productRepository.getAllproducts(pages, limit);
    return new SuccessResponseDto({products: data, page, pageCount, totalCount} , ['Get Products Success'], HttpStatus.OK);
  }

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
    return new SuccessResponseDto({}, ['Create New Product Success'], HttpStatus.CREATED);
  }
}

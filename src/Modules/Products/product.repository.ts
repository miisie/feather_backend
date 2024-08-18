import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  async getAllproducts(pages: number, limit: number){
    pages = Math.max(1, pages);
    limit = Math.max(1, limit);

    const products = await this.find({
        order: {
            title: 'ASC',
        },
    });

    const totalCount = products.length;

    const startIndex = (pages - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    const pageCount = paginatedProducts.length;

    const data = paginatedProducts.map(({ createdAt, ...props }) => props);
    return {data, page: pages, pageCount, totalCount};
  }
}
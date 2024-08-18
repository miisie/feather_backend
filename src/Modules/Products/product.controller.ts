import { Body, Controller, Get, HttpStatus, Post, Query, Request, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Public } from '../../Decorators/authen.decorators';
import { Response } from 'express';
import { CreateProductDto } from './dtos/create-product.dto';
import { InvalidInputDto } from '../../Commons/Responses/Swagger-response-dtos/Common/invalid-input.dto';
import { CreateProductSuccessDto } from '../../Commons/Responses/Swagger-response-dtos/Product/create-product-success.dto';
import { GetProductsSuccessDto } from '../../Commons/Responses/Swagger-response-dtos/Product/get-products-success.dto';
import { ImageService } from '../External Services/image.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imageService: ImageService,
  ) {}
  
  @Public()
  @ApiOkResponse({type: GetProductsSuccessDto})
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @Get()
  async getAllProducts(@Res() res: Response,  @Query('page') pages = 1,
  @Query('limit') limit = 10,) {
    const data = await this.productService.getAllProducts(pages, limit);
    return res.status(HttpStatus.OK).json(data);
  }

  @ApiBearerAuth()
  @ApiResponse({status: HttpStatus.UNPROCESSABLE_ENTITY, type: InvalidInputDto})
  @ApiResponse({status: HttpStatus.CREATED, type: CreateProductSuccessDto})
  @Post()
  async createProduct(@Res() res: Response, @Body() createProductDto: CreateProductDto) {
    const data = await this.productService.createProduct(createProductDto);
    return res.status(HttpStatus.CREATED).json(data);
  }


  @Public()
  @Post('images')
  @UseInterceptors(FilesInterceptor('images', 4))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.imageService.uploadImages(files);
  }
} 

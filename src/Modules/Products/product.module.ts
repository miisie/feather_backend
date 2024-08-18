import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";
import { ImageService } from "../External Services/image.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository, ImageService],
    exports: [ProductService]
})
export class ProductModule{}

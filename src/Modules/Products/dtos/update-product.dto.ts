import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsArrayOfStrings, IsEnumValue, IsText, Trim } from "../../../Decorators/transform.decorators";
import { ProductType } from "../../../Commons/Enum/Enums";

export class CreateProductDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Trim()
    title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnumValue(ProductType)
    @Trim()
    type: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsText()
    @Trim()
    description: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Trim()
    price: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArrayOfStrings()
    thumbnails: string[];
}
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsArrayOfStrings, IsEnumValue, IsText, Trim } from "../../../Decorators/transform.decorators";
import { ProductType } from "../../../Commons/Enum/Enums";

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Trim()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnumValue(ProductType)
    @Trim()
    type: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsText()
    @Trim()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Trim()
    price: string;

    @ApiProperty()
    @IsArrayOfStrings()
    thumbnails: string[];
}
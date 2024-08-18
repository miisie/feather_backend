import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";


export class CreateProductSuccessDto {
    @ApiProperty({default: ['Create New Product Success']})
    message: string[];

    @ApiProperty({default: ''})
    error: string;

    @ApiProperty({default: HttpStatus.CREATED})
    statusCode: number;

    @ApiProperty({default: {}})
    data: object;
}
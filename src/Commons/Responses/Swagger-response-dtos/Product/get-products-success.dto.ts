import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class GetProductsSuccessDto {
    @ApiProperty({default: ['Get Products Success']})
    message: string[];

    @ApiProperty({default: ''})
    error: string;

    @ApiProperty({default: HttpStatus.OK})
    statusCode: number;

    @ApiProperty({default: {product: [], page: 1, pageCount: 10, totalCount: 10}})
    data: object;
}
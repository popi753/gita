import { Transform } from "class-transformer"
import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateExpenseDto {
    @ApiProperty({ example: 'netflix', description: 'Product name' })
    @IsNotEmpty()
    @IsString()
    productName:string

    @ApiProperty({ example: 'entertainment', description: 'Expense category', enum: ["gym","shopping","entertainment"] })
    @IsNotEmpty()
    @IsString()
    @IsIn(["gym","shopping","entertainment"])
    category:string

    @ApiProperty({ example: 1, description: 'Quantity of items', minimum: 1 })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Number(value))
    quantity:number

    @ApiProperty({ example: 15, description: 'Price per unit', minimum: 0 })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Number(value))
    price:number

}
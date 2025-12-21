import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

// 1) ყველა პროდუქტს უნდა ჰპონდეს 
//          ფასი, სახელი, კატეგორია, აღწერა, რაოდენობა, ვალიდაციისთვის გამოიყენეთ class-validator class-transformer


export class CreateProductDto {
    @ApiProperty({ example: 'netflix', description: 'Product name' })
    @IsNotEmpty()
    @IsString()
    productName: string

    @ApiProperty({ example: 'entertainment', description: 'Product category' })
    @IsNotEmpty()
    @IsString()
    category:string

    @ApiProperty({ example: 'A great product', description: 'Product description' })
    @IsNotEmpty()
    @IsString()
    description:string

    @ApiProperty({ example: 1, description: 'Quantity of items', minimum: 1 })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value}) => Number(value))
    quantity:number

    @ApiProperty({ example: 12, description: 'Price per unit', minimum: 0 })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value}) => Number(value))
    price:number

}

import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

// 1) ყველა პროდუქტს უნდა ჰპონდეს 
//          ფასი, სახელი, კატეგორია, აღწერა, რაოდენობა, ვალიდაციისთვის გამოიყენეთ class-validator class-transformer


export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    productName: string

    @IsNotEmpty()
    @IsString()
    category:string

    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value}) => Number(value))
    quantity:number

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value}) => Number(value))
    price:number

}

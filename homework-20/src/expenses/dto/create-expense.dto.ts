import { Transform } from "class-transformer"
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    productName:string

    @IsNotEmpty()
    @IsString()
    @IsIn(["gym","shopping","entertainment"])
    category:string

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Number(value))
    quantity:number

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Number(value))
    price:number

}
import { Transform } from "class-transformer"
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"

export enum Gender {
    Male = "male",
    Female = "female",
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName:string

    @IsNotEmpty()
    @IsString()
    lastName:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    @Transform(({value}) => String(value))
    phoneNumber:string

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender
}

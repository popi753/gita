import { Transform } from "class-transformer"
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Gender } from "../schemas/user.schema"



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
    password:string

    @IsNotEmpty()
    @IsString()
    @Transform(({value}) => String(value))
    phoneNumber:string

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender
}
export { Gender }


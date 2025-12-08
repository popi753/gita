import { Transform } from "class-transformer"
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Gender } from "../schemas/user.schema"



export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender

    @IsNotEmpty()
    @Transform(({value})=> parseInt(value))
    age:number
}


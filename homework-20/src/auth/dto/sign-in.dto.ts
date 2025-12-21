import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"



export class SignInDto{
    @ApiProperty({example:"John@gmail.com", type:String})
    @IsNotEmpty()
    @IsEmail()
    email:string
   
    @ApiProperty({example:"pass1234JOhn", type:String})
    @IsNotEmpty()
    @IsString()
    password:string
}
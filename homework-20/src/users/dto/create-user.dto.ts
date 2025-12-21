import { Transform } from "class-transformer"
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Gender } from "../schemas/user.schema"
import { ApiProperty } from "@nestjs/swagger"



export class CreateUserDto {
    @ApiProperty({example:"John", description:"First name of the user",type:String})
    @IsNotEmpty()
    @IsString()
    firstName:string

    @ApiProperty({example:"doe", type:String})
    @IsNotEmpty()
    @IsString()
    lastName:string

    @ApiProperty({example:"John@gmail.com", type:String})
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty({example:"JohnPass123", type:String})
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty({example:15, type:Number})
    @IsNotEmpty()
    @IsNumber()
    age:number

    @ApiProperty({example:"645879465", type:String})
    @IsNotEmpty()
    @IsString()
    @Transform(({value}) => String(value))
    phoneNumber:string

    @ApiProperty({example: Gender.Male, type:String, enum: Gender})
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender
}
export { Gender }


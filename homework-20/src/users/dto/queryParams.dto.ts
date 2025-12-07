import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min, IsEnum } from "class-validator";
import { Gender } from "../schemas/user.schema"


export class QueryParamsDto {
    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Number(value))
    @Min(1)
    page:number = 1

    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Math.min(30, Number(value)))
    @Min(1)
    take:number = 30

    @IsOptional()
    @IsEnum(Gender)
    gender:Gender

    @IsOptional()
    @IsString()
    emailStartsWith:string
}
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min, IsEnum } from "class-validator";
import { Gender } from "../schemas/user.schema"
import { ApiPropertyOptional } from "@nestjs/swagger"


export class QueryParamsDto {
    @ApiPropertyOptional({ example: 1, description: 'Page number', minimum: 1, default: 1 })
    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Number(value))
    @Min(1)
    page:number = 1

    @ApiPropertyOptional({ example: 30, description: 'Items per page', minimum: 1, default: 30, maximum: 30 })
    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Math.min(30, Number(value)))
    @Min(1)
    take:number = 30

    @ApiPropertyOptional({ example: Gender.Male, enum: Gender, description: 'Filter by gender' })
    @IsOptional()
    @IsEnum(Gender)
    gender:Gender

    @ApiPropertyOptional({ example: 'john', description: 'Filter by email starting value' })
    @IsOptional()
    @IsString()
    emailStartsWith:string
} 
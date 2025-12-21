import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

    // 2) დაამატეთ ორივე რესურსზე ფეჯინეიშენი, page = 1, take.= 30,
//  არაფერს თუ არ გადასცემთ დიფოლატად პირველი 30 ჩანაწერი უნდა წამოიღოს
// 3) ხარჯებზე გააკეთეთ კატეგორიების ვალიდაცია, გქონდეთ რამე knowCategories 
// და როგორც ლექციაზე ვქენით ან დასერჩეთ როგორ უნდა გააეკთოთ ინამ ველიუების ვალიდაცია class-validator ის გამოყენებით

// 5) დაამატეთ query-ით ფილტრები ასევე ხარჯებზე, კატეგორით მაგალითად, priceFrom. priceTo


export class QueryParamsDto {
    @ApiPropertyOptional({ example: 1, description: 'Page number', minimum: 1, default: 1 })
    @IsOptional()
    @IsNumber()
    @Transform(({value})=> value ? Number(value) : 1)
    @Min(1)
    page:number = 1

    @ApiPropertyOptional({ example: 30, description: 'Items per page', minimum: 1, default: 30, maximum: 30 })
    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Math.min(30, Number(value)))
    @Min(1)
    take:number = 30

    @ApiPropertyOptional({ example: 10, description: 'Minimum price filter' })
    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Number(value))
    @Min(1)
    priceFrom:number

    @ApiPropertyOptional({ example: 100, description: 'Maximum price filter' })
    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Number(value))
    @Min(1)
    priceTo : number

    @ApiPropertyOptional({ example: 'gym', enum: ["gym","shopping","entertainment"], description: 'Category filter' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsIn(["gym","shopping","entertainment"])
    category:string
}
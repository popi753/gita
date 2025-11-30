import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

    // 2) დაამატეთ ორივე რესურსზე ფეჯინეიშენი, page = 1, take.= 30,
//  არაფერს თუ არ გადასცემთ დიფოლატად პირველი 30 ჩანაწერი უნდა წამოიღოს
// 3) ხარჯებზე გააკეთეთ კატეგორიების ვალიდაცია, გქონდეთ რამე knowCategories 
// და როგორც ლექციაზე ვქენით ან დასერჩეთ როგორ უნდა გააეკთოთ ინამ ველიუების ვალიდაცია class-validator ის გამოყენებით

// 5) დაამატეთ query-ით ფილტრები ასევე ხარჯებზე, კატეგორით მაგალითად, priceFrom. priceTo


export class QueryParamsDto {
    @IsOptional()
    @IsNumber()
    @Transform(({value})=> value ? Number(value) : 1)
    @Min(1)
    page:number = 1

    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Math.min(30, Number(value)))
    @Min(1)
    take:number = 30

    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Number(value))
    @Min(1)
    priceFrom:number

    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Number(value))
    @Min(1)
    priceTo : number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsIn(["gym","shopping","entertainment"])
    category:string
}
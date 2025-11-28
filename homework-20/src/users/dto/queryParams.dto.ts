import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min, IsEnum } from "class-validator";
import { Gender } from "./create-user.dto";

// 1) დაამატეთ ვალიდაციები იუზერებსაც და ხარჯებსაც(იქსდენსებს),
//  გამოიყენეთ DTO და class-validator, class-transformer

// 2) დაამატეთ ორივე რესურსზე ფეჯინეიშენი, page = 1, take.= 30,
//  არაფერს თუ არ გადასცემთ დიფოლატად პირველი 30 ჩანაწერი უნდა წამოიღოს

// 4) იუზერების გეთის დროს გაჰენდლეთ ფილტრები მაგალითად /users?gender=m უნდა დააბრუნოს ყველა მმამრობითი სქესის იუზერი, /users?gender=m&email=test
// უნდა დააბრუნოს ყველა მმარრობითი სქესის იუზერი და დამატებით ყველა ის იუზერი რომლის იმეილიც იწყება test ით.


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
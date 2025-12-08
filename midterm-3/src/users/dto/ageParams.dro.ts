import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min, IsEnum } from "class-validator";

// 4) ასაკზე დაადეთ ინდექსი და დაამატეთ ახალი ენდფოინთი რომესაც გადასცემთ ასაკს, თუ მხოლოდ ასაკი გადაეცით დაგიბრუნებთ იმ ასაკის ადამიანებს,
// თუ გადაეცით ageFrom და ageTo შესაბამისად გაფილტრავს ასაკის მიხედვით იუზერებს და დააბრუნებს. ასევე გაფილტერთ gender=m სქესის მიხედვით ფილტრი. დაამატეთ სახელის მიხედვით სერჩი, regex ის გამოყენებით.


export class AgeParamsDto {
        @IsOptional()
    @IsNumber()
    @Transform(({value})=> value ? Number(value) : 1)
    @Min(1)
    page:number = 1

@IsOptional()
@IsNumber()
@Transform(({value})=> value ? Math.min(30, Number(value)) : 30)
@Min(1)
take:number = 30


    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Number(value))
    @Min(0)
    age:number

    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Number(value))
    @Min(0)
    ageFrom:number

    @IsOptional()
    @IsNumber()
    @Transform(({value})=>Number(value))
    @Min(0)
    ageTo:number

}
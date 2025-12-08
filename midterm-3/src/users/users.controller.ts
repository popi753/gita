import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { isValidObjectid } from "../common/is-valid-objectId.dto";
import { AgeParamsDto } from "./dto/ageParams.dro";

// მოგესალმებით თქვენი დავალებაა შექმნათ ახალი ნესტის პროექტი და დააინტეგრიროთ შემდეგი ფუნქციები.

// 1) შექმენით იუზერების ქრადი და ბაზაში დაამატეთ 30_000 იუზერი ფეიქეირს გამოყენებით.

// 2)დაამატეთ მორგანი, ნახეთ რა დრო ჭირდება თითოეულ რექუესთს.

// 3) დაამატეთ ახალი ენდფოინთი რომელიც დაგიბრუნებთ სულ რამდენი იუზრია ბაზაში. /total-users

// 4) ასაკზე დაადეთ ინდექსი და დაამატეთ ახალი ენდფოინთი რომესაც გადასცემთ ასაკს, თუ მხოლოდ ასაკი გადაეცით დაგიბრუნებთ იმ ასაკის ადამიანებს,
// თუ გადაეცით ageFrom და ageTo შესაბამისად გაფილტრავს ასაკის მიხედვით იუზერებს და დააბრუნებს. ასევე გაფილტერთ gender=m სქესის მიხედვით ფილტრი. დაამატეთ სახელის მიხედვით სერჩი, regex ის გამოყენებით.

// 5)  დაამტეთ იუზერების რესურსზე ფეჯინეიშენი, შეზღუდეთ ზედა/ქვედა ლიმიტი.
// მინიშნება უნდა გამოიყენოთ model.find().skip().limit() ეს ორი მეთოდი შიგნით რაღაც უნდა ჩაწეროთ რიცხცვები ეგ თქვენზე მომინდია

@Controller("/users")
export class UsersController{
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto:CreateUserDto){
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(@Query() query:QueryParamsDto){
        return this.userService.findAll(query);
    }

    @Get("/by-age")
    findByAge(@Query() query:AgeParamsDto){
        return this.userService.findByAge(query);
    }

    @Get("/total-users")
    findTotalUsers(){
        return this.userService.findTotalUsers();
    }

    @Get("/:id")
    findOne(@Param() {id} : isValidObjectid){
        return this.userService.findOne(id);
    }

    
    @Patch("/:id")
    update(@Param() {id}:isValidObjectid, @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id, updateUserDto);
    }

    @Delete("/:id")
    remove(@Param() {id}:isValidObjectid){
        return this.userService.remove(id);
    }


}
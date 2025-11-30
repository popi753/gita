import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";

// 1) დაამატეთ ვალიდაციები იუზერებსაც და ხარჯებსაც(იქსდენსებს),
//  გამოიყენეთ DTO და class-validator, class-transformer

// 2) დაამატეთ ორივე რესურსზე ფეჯინეიშენი, page = 1, take.= 30,
//  არაფერს თუ არ გადასცემთ დიფოლატად პირველი 30 ჩანაწერი უნდა წამოიღოს

// 4) იუზერების გეთის დროს გაჰენდლეთ ფილტრები მაგალითად /users?gender=m უნდა დააბრუნოს ყველა მმამრობითი სქესის იუზერი, /users?gender=m&email=test
// უნდა დააბრუნოს ყველა მმარრობითი სქესის იუზერი და დამატებით ყველა ის იუზერი რომლის იმეილიც იწყება test ით.


@Controller("/users")
export class UsersController{
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers(@Query() query:QueryParamsDto){
        return this.userService.getAllUsers(query);
    }

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Get("/:id")
    getUserById(@Param("id", ParseIntPipe) id:number){
        return this.userService.getUserById(id);
    }

    @Delete("/:id")
    deleteUserById(@Param("id", ParseIntPipe) id:string){
        return this.userService.deleteUserById(Number(id));
    }

    @Patch("/:id")
    updateUserById(@Param("id", ParseIntPipe) id:string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.updateUserById(Number(id), updateUserDto);
    }
}
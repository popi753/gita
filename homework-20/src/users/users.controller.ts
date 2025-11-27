import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("/users")
export class UsersController{
    constructor(private readonly userService: UserService) {}
    


    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }

    @Get("/:id")
    getUserById(@Param("id") id:string){
        return this.userService.getUserById(Number(id));
    }

    @Delete("/:id")
    deleteUserById(@Param("id") id:string){
        return this.userService.deleteUserById(Number(id));
    }

    @Patch("/:id")
    updateUserById(@Param("id") id:string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.updateUserById(Number(id), updateUserDto);
    }
}
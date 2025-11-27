import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UserService {

    private users = [
        {id:1,firstName: "nika",lastName: "mgaloblishvili", email:"test@gmail.com", phoneNumber:555980126, gender:"male"}
    ];

    getAllUsers(){
        return this.users;
    }

    createUser({firstName="",lastName,email,phoneNumber,gender}:CreateUserDto){
            const errors : Record <string,string> = {};
            if (!firstName || typeof firstName !== "string") {
                errors.firstName = "please provide valid firstName"
            }
            if (!lastName || typeof lastName !== "string") {
                errors.lastName = "please provide valid lastName"
            }
            if (!email || typeof email !== "string" || !email.includes("@")) {
                errors.email = "please provide valid email"
            }
            if (!phoneNumber || typeof phoneNumber !== "number") {
                errors.phoneNumber = "please provide valid Phone Number"
            }
            const genderArr = ["male", "female"]
            if (!genderArr.includes(gender?.toLocaleLowerCase())) {
                errors.gender = "please provide valid Gender"
            }
            if (Object.keys(errors).length) {
                throw new HttpException(errors, HttpStatus.BAD_REQUEST)
            }
        try {
            


            let id = Math.ceil(Math.random()*100);
            while(this.users.find(e=>e.id===id)){
                id++
            }
            const newUser = {
                id,
                firstName,
                lastName,
                email,
                phoneNumber,
                gender
            }

            this.users.push(newUser);

            return {success:true,newUser}

        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    getUserById(id:number){
        const user = this.users.find(e=>e.id===id);
        if (!user) {
            throw new NotFoundException("user not found");
        }
        return user;
    }

    deleteUserById(id:number){
        const userIndex = this.users.findIndex(e=>e.id===id);
        if (userIndex === -1) {
            throw new NotFoundException("user not found");
        }

        const user = this.users[userIndex];
        this.users.splice(userIndex,1);
        return {success:true,user};
    }

    updateUserById(id:number, updateUserDto:UpdateUserDto){
        if (!updateUserDto.firstName && !updateUserDto.lastName && !updateUserDto.email && !updateUserDto.phoneNumber && !updateUserDto.gender) {
            throw new HttpException("please provide valid data", HttpStatus.BAD_REQUEST)
        }
        const errors : Record <string,string> = {};  
        if (updateUserDto.firstName && typeof updateUserDto.firstName !== "string") {
            errors.firstName = "please provide valid firstName"
        }
        if (updateUserDto.lastName && typeof updateUserDto.lastName !== "string") {
            errors.lastName = "please provide valid lastName"
        }
        if (updateUserDto.email && !updateUserDto.email?.includes("@")) {
            errors.email = "please provide valid email"
        }
        if (updateUserDto.phoneNumber && typeof updateUserDto.phoneNumber !== "number") {
            errors.phoneNumber = "please provide valid Phone Number"
        }
        const genderArr = ["male", "female"]
        if (updateUserDto.gender && !genderArr.includes(updateUserDto.gender?.toLocaleLowerCase())) {
            errors.gender = "please provide valid Gender"
        }
        if (Object.keys(errors).length) {
            throw new HttpException(errors, HttpStatus.BAD_REQUEST);
        }

        const userIndex = this.users.findIndex(e=>e.id===id);
        if (userIndex === -1) {
            throw new NotFoundException("user not found");
        }
        const updatedUser = {...this.users[userIndex], ...updateUserDto};
        this.users[userIndex] = updatedUser;
        return {success:true,updatedUser};
    }
}

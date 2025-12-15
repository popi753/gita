import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import bcrypt from "bcrypt";
import { SignInDto } from '../users/dto/sign-in.dto';
import { Role } from '../users/schemas/user.schema';


// თქვენი დავალებაა წინა 24 დავალებას დაუმატოთ შემდეგი ფუნქციონალი: 

// 1) შემოიტანეთ სისტემაში როლები და უფლებები
// 2) გექნებათ 2 ძირითადი როლი  user და admin
// 3) ადმნის შეუძლია ყველაფერი, სხვა იუზერების წაშლა, სხვისი ხარჯების წაშლა დაედითება, პროდუქტების წაშლა დაედითება და ა.შ.
// 4) გააკეთეთ როლის გარდი და როლის დეკორატორი
// 5) როცა იუზერი დალოგინდება ტოკენში ჩასეტეთ როლი

@Injectable()
export class AuthService {

    constructor(
        @InjectModel("user") private userModel: Model<user>,
        private jwtService: JwtService
    ){}

    async signUp({firstName,lastName,email,password,phoneNumber,gender}:CreateUserDto){
        try {
            const existingUser = await this.userModel.findOne({email});
            if (existingUser) {
                throw new BadRequestException({email:"user with this email already exists"});

            }

            const hashedPassword = await bcrypt.hash(password, 10);


            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setMonth( startDate.getMonth() + 1);



            const newUser = await this.userModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phoneNumber,
                gender,
                role: Role.User,
                // role: Role.Admin, // for testing admin functionalities
                subscriptionStartDate : startDate.toISOString(),
                subscriptionEndDate : endDate.toISOString()
            });

            return {success:true,newUser}

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        }

    async signIn(signInDto:SignInDto){
           const user = await this.userModel.findOne({email:signInDto.email}).select('+password');
           if (!user) {
               throw new NotFoundException({user:"user not found"});
           }

           const isPasswordMatching = await bcrypt.compare(signInDto.password, user.password);
           if (!isPasswordMatching) {
               throw new BadRequestException({body:"invalid credentials"});
           }

           const payload = {userId: user._id, role: user.role};

           const token = await this.jwtService.sign(payload);

           return {success:true,message:"signin successful",token};
       }

    async getProfile(userId:string){
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundException({user:"user not found"});
            }
            return {success:true,user};
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}

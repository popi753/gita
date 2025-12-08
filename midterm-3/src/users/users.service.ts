import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { Model } from "mongoose";
import { user } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { faker, th } from "@faker-js/faker";
import { AgeParamsDto } from "./dto/ageParams.dro";

// მოგესალმებით თქვენი დავალებაა შექმნათ ახალი ნესტის პროექტი და დააინტეგრიროთ შემდეგი ფუნქციები.

// 1) შექმენით იუზერების ქრადი და ბაზაში დაამატეთ 30_000 იუზერი ფეიქეირს გამოყენებით.

// 2)დაამატეთ მორგანი, ნახეთ რა დრო ჭირდება თითოეულ რექუესთს.

// 3) დაამატეთ ახალი ენდფოინთი რომელიც დაგიბრუნებთ სულ რამდენი იუზრია ბაზაში. /total-users

// 4) ასაკზე დაადეთ ინდექსი და დაამატეთ ახალი ენდფოინთი რომესაც გადასცემთ ასაკს, თუ მხოლოდ ასაკი გადაეცით დაგიბრუნებთ იმ ასაკის ადამიანებს, თუ გადაეცით ageFrom და ageTo შესაბამისად გაფილტრავს ასაკის მიხედვით იუზერებს და დააბრუნებს. ასევე გაფილტერთ gender=m სქესის მიხედვით ფილტრი. დაამატეთ სახელის მიხედვით სერჩი, regex ის გამოყენებით.

// 5)  დაამტეთ იუზერების რესურსზე ფეჯინეიშენი, შეზღუდეთ ზედა/ქვედა ლიმიტი.
// მინიშნება უნდა გამოიყენოთ model.find().skip().limit() ეს ორი მეთოდი შიგნით რაღაც უნდა ჩაწეროთ რიცხცვები ეგ თქვენზე მომინდია

@Injectable()
export class UserService {

    constructor(
        @InjectModel("user") private userModel: Model<user>
    ){}

    async onModuleInit() {
        console.log("initialized user service");
        if (await this.userModel.countDocuments() === 0) {
            const usersToInsert: Record<string, string|number>[] = []
            const usersToInsertLength = 30000;
            for (let i = 0; i < usersToInsertLength; i++) {
                usersToInsert.push({
                    name: faker.person.firstName(),
                    email: faker.internet.email(),
                    gender: faker.person.sexType(),
                    age: faker.number.int({min:18, max:80})
                })
            }
 
            const chunkSize = 5000;
            for (let i = 0; i < usersToInsertLength; i+=chunkSize) {
                const dataChunk = usersToInsert.slice(i, i+chunkSize);
                await this.userModel.insertMany(dataChunk);
                console.log(" 5000 users inserted"); 
 
            } 
            console.log("users inserted fully");    
        }else{
            console.log("users already exist in db");
        }
        
    } 

    async create({name,email,age}:CreateUserDto){
        try {
            const existingUser = await this.userModel.findOne({email});
            if (existingUser) {
                throw new BadRequestException({email:"user with this email already exists"});
            }

            const newUser = await this.userModel.create({
                name,
                email,
                age,
            });

            return {success:true,newUser}

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll({page,take,gender,nameStartsWith}:QueryParamsDto){
        try {
                const query: Record<string, any> = {
                };
                if (gender) {
                    query.gender = gender;
                }

                if (nameStartsWith) {
                    query.name = { $regex: `^${nameStartsWith}`, $options: 'i' };
                }
                const total = await this.userModel.countDocuments(query);
        
                const users = await this.userModel.find(query)
                                                   .skip((page - 1) * take)
                                                   .limit(take);
        
                const totalPages = Math.ceil(total / take);

                return {
                    page,
                    take,
                    total,
                    totalPages,
                    data:  users,
                }
                
        
            } catch (error) {
                throw new InternalServerErrorException(error);
            };
    }

    async findByAge({age, ageFrom, ageTo, page,take}:AgeParamsDto){
        try {
             const query: Record<string, any> = {
                };
            
            if (!age && !ageFrom && !ageTo) {
                throw new BadRequestException('please provide age or ageFrom/ageTo query parameters')
            }

            if (age) {
                    query.age = age;
            }else if (ageFrom || ageTo) {
                query.age = {$gte:ageFrom || 0,$lte:ageTo || 150};
            }


            const total = await this.userModel.countDocuments(query);
        
                const users = await this.userModel.find(query)
                                                   .skip((page - 1) * take)
                                                   .limit(take);
        
                const totalPages = Math.ceil(total / take);

                return {
                    page,
                    take,
                    total,
                    totalPages,
                    data:  users,
                }

        } catch (error) {
            throw new InternalServerErrorException({error});
        }
    }

    async findTotalUsers(){
        try {
            return this.userModel.countDocuments();
        } catch (error) {
            throw new InternalServerErrorException({error});            
        }
    }

    async findOne(id : string){
        const user = await this.userModel.findById(id).populate({path:'expenses',select:'-user'});
        if (!user) {
            throw new NotFoundException({user:"user not found"});
        }
        return {success:true,user};
    }
    
    async update(id:string, updateUserDto:UpdateUserDto){
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
        if (!updatedUser) {
            throw new NotFoundException({user:"user not found"});
        }
        return {success:true,updatedUser};
    }

    async remove(id:string){
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new NotFoundException({user:"user not found"});
        }
        return {success:true,user};
    }

    
}
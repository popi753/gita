import { forwardRef, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { expense } from "./schemas/expense.schema";
import { UserService } from "../users/users.service";
import { Role, user } from "../users/schemas/user.schema";
import { Types } from 'mongoose';

// მოგესალმებით თქვენი დავალებაა დაამატოთ შემდეგი ფიჩერები წინა ანუ 27 დავალებას.

// 1) დაუმატეთ იუზერებს ახალი ფროფერტი isActive, და დაწერეთ მიგრაცია რომელიც ყველა იუზერის ჩანაწერს დაუმატებს ამ ახალ ფროფერთის შეიძლება ეს იყოს true ან false

// 2) დაამატეთ ახალი ენდფოინთი იქსფენსებზე მაგალითად /statistic და დააბრნეთ კატეგორიის მიხედვით დაჯგუფებული ხარჯები, პლუს დათვალეთ იმ კატეგორიაში რამდენი იყო სრული ხარჯი, რამდენი აითემია თითოეულ ხარჯის კატეგორიაში, და ლექციაზე როგორც ვქენით მასივის სახით ჩანდეს ეს ხარჯები.

// 3) დაამატეთ ახალი ენფოინთი იუზერებზე, დააჯგუფეთ ყველა იუზერი სქესის მიხედვით და გამოთვალეთ საშუალო ასაკი ორივეში.

// 4) ხარჯებზე დაამატეთ ახალი ენდფოინთი /expenses/top-spenders?limit=10 სადაც იუზერებს დააჯგუფებთ userId ების მიხედვით და დაუთვლით მთლიანად რამდენი აქვს დახარჯული.


@Injectable()
export class ExpenseService {

     constructor(
                @InjectModel("expense") private expenseModel: Model<expense>,
                @InjectModel("user") private userModel: Model<user>,
                @Inject(forwardRef(() =>  UserService)) private userService: UserService,
            ){}



    async findAll({page,take,priceFrom,priceTo,category}:QueryParamsDto){
        try {
                    const query: Record<string, any> = {
                    };
    
                    if (category) {
                        query.category = category;
                    }
                   
    
                            const priceFilter : Record<string, any>  = {};
                           if (priceFrom && !Number.isNaN(priceFrom)) {
                                   priceFilter.$gte = priceFrom
                                };
                   
                           if (priceTo && !Number.isNaN(priceTo)) {
                                   priceFilter.$lte = priceTo
                                };
                   
                           if (Object.keys(priceFilter).length) {
                                   query.price = priceFilter
                                };

                    const total = await this.expenseModel.countDocuments(query);
            
                    let expenses = await this.expenseModel.find(query)
                                                       .skip((page - 1) * take)
                                                       .limit(take).populate({path: 'user', select: '-expenses'});
            
                    const totalPages = Math.ceil(total / take);
    
    
                    return {
                        page,
                        take,
                        total,
                        totalPages,
                        data:  expenses,
                    }
                    
            
                } catch (error) {
                    throw new InternalServerErrorException(error);
                };
    }

    async getTopSpenders(limit : number = 10){
        const topSpenders = await this.userModel.aggregate([
            {
                $unwind: "$expenses"
            },
            {
                $lookup: {
                    from: "expenses",
                    localField: "expenses",
                    foreignField: "_id",
                    as: "expenseDetails"
                }
            },
            {
                $unwind: "$expenseDetails"
            },
            {
                $group: {
                    _id: "$_id",
                    firstName: { $first: "$firstName" },
                    lastName: { $first: "$lastName" },
                    totalSpent: { $sum: "$expenseDetails.totalPrice" }
                }
            },
            { $sort: { totalSpent: -1 } },
            {
                $limit: limit
            }
    ]);

        return topSpenders;
    }

    async getStatistics(){
        const expenses = await this.expenseModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalExpense: { $sum: "$totalPrice" },
                    count: { $sum: 1 },
                    expenses: { $push: { productName: "$productName", price: "$totalPrice" } }
                }
            }
        ]);

        return expenses;
    }

    async createExpense(userId:string, createExpenseDto:CreateExpenseDto){
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundException({user:"user not found"});
            }
            const newExpense = await this.expenseModel.create(
                    {...createExpenseDto, totalPrice: createExpenseDto.price * createExpenseDto.quantity,user: userId});
            if (!newExpense) {
                throw new InternalServerErrorException({expense : "could not create expense"});        
            }
            
            const updatedUser = await this.userModel.findByIdAndUpdate(userId,
            { $push: { expenses: newExpense._id } },
            { new: true }
            );
            if (!updatedUser) {
                throw new NotFoundException({user:"counld not find user to update expenses"});
            }

            return {success:true,newExpense};
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async getExpenseById(id:string){
        const expense = await this.expenseModel.findById(id).populate({path:'user',select:'-expenses'});
        if (!expense) {
            throw new NotFoundException("expense not found");
        }
        return {success:true,expense};
    }

    async deleteExpenseById(userId:string,role:Role, expenseId:string){

        if (role === Role.Admin) {
            console.log("Admin deleting expense");
            const expense = await this.expenseModel.findById(expenseId);
            if (!expense) throw new NotFoundException({expense:"expense not found"});            

            const user = await this.userModel.findById(expense.user);
            if (!user) throw new NotFoundException({user:"expense owner not found"});

            const updatedUser = await this.userModel.findByIdAndUpdate(user._id,
                { $pull: { expenses: new Types.ObjectId(expenseId) }  },
                { new: true }
            );
            if (!updatedUser) {
                throw new NotFoundException({user:"expense wasnt deleted from user"});
            }
        }else{
            console.log("non Admin deleting expense");
            const user = await this.userModel.findById(userId);

            if (!user) {
                throw new NotFoundException({user:"expense owner not found"});
            }
            if (!user.expenses.some(expense => expense.toString() === expenseId)) {
                throw new NotFoundException({expense:"expense not found in user's expenses"});
            }

            const updatedUser = await this.userModel.findByIdAndUpdate(userId,
                { $pull: { expenses: expenseId } },
                { new: true }
            );
            if (!updatedUser) {
                throw new NotFoundException({user:"expense owner not found"});
            }
        }

        const expense = await this.expenseModel.findByIdAndDelete(expenseId);
        if (!expense) {
            throw new NotFoundException("expense not found");
        }
            return {success:true,expense};
    }

    async updateExpenseById(userId:string, role:Role, expenseId:string, updateExpenseDto:UpdateExpenseDto){

        if (role !== Role.Admin) {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundException({user:"expense owner not found"});
            }
            if (!user.expenses.some(expense => expense.toString() === expenseId)) {
                throw new NotFoundException({expense:"expense not found in user's expenses"});
            }

        }

        const updatedExpense = await this.expenseModel.findByIdAndUpdate(expenseId, updateExpenseDto, {new:true});
        if (!updatedExpense) {
            throw new NotFoundException("expense not found");
        }
        return {success:true,expense:updatedExpense};
        
    }

       //use once, dont repeat
    //use users/insertmany first
    //     async insertDataToMongoDB(){
    //         const expenses = [
//     {category:"entertainment",productName:"netflix",price:15,quantity:1,totalPrice:15,user:"6935a3fd3cffc469246aa13b"},
//     {category:"entertainment",productName:"netflix",price:15,quantity:1,totalPrice:15,user:"6935a3fd3cffc469246aa13c"},
//     {category:"gym",productName:"membership",price:50,quantity:1,totalPrice:50,user:"6935a3fd3cffc469246aa13d"},
//     {category:"shopping",productName:"shoes",price:80,quantity:2,totalPrice:160,user:"6935a3fd3cffc469246aa13e"},
//     {category:"entertainment",productName:"spotify",price:10,quantity:1,totalPrice:10,user:"6935a3fd3cffc469246aa13f"},
//     {category:"gym",productName:"protein powder",price:30,quantity:3,totalPrice:90,user:"6935a3fd3cffc469246aa13b"},
//     {category:"shopping",productName:"laptop",price:1200,quantity:1,totalPrice:1200,user:"6935a3fd3cffc469246aa13c"},
//     {category:"entertainment",productName:"cinema ticket",price:12,quantity:4,totalPrice:48,user:"6935a3fd3cffc469246aa13d"},
//     {category:"shopping",productName:"headphones",price:150,quantity:1,totalPrice:150,user:"6935a3fd3cffc469246aa13e"},
//     {category:"gym",productName:"yoga mat",price:25,quantity:2,totalPrice:50,user:"6935a3fd3cffc469246aa13f"},
//     {category:"entertainment",productName:"game subscription",price:20,quantity:1,totalPrice:20,user:"6935a3fd3cffc469246aa13b"},
//     {category:"shopping",productName:"jacket",price:120,quantity:1,totalPrice:120,user:"6935a3fd3cffc469246aa13c"},
//     {category:"gym",productName:"dumbbells",price:45,quantity:2,totalPrice:90,user:"6935a3fd3cffc469246aa13d"},
//     {category:"entertainment",productName:"concert ticket",price:75,quantity:2,totalPrice:150,user:"6935a3fd3cffc469246aa13e"},
//     {category:"shopping",productName:"phone case",price:15,quantity:3,totalPrice:45,user:"6935a3fd3cffc469246aa13f"},
//     {category:"gym",productName:"water bottle",price:20,quantity:1,totalPrice:20,user:"6935a3fd3cffc469246aa13b"},
//     {category:"entertainment",productName:"book",price:18,quantity:5,totalPrice:90,user:"6935a3fd3cffc469246aa13c"},
//     {category:"shopping",productName:"jeans",price:60,quantity:2,totalPrice:120,user:"6935a3fd3cffc469246aa13d"},
//     {category:"gym",productName:"resistance bands",price:25,quantity:1,totalPrice:25,user:"6935a3fd3cffc469246aa13e"},
//     {category:"entertainment",productName:"streaming service",price:14,quantity:1,totalPrice:14,user:"6935a3fd3cffc469246aa13f"},
//     {category:"shopping",productName:"backpack",price:85,quantity:1,totalPrice:85,user:"6935a3fd3cffc469246aa13b"},
//     {category:"gym",productName:"gym bag",price:35,quantity:1,totalPrice:35,user:"6935a3fd3cffc469246aa13c"},
//     {category:"entertainment",productName:"video game",price:60,quantity:3,totalPrice:180,user:"6935a3fd3cffc469246aa13d"},
//     {category:"shopping",productName:"sunglasses",price:95,quantity:1,totalPrice:95,user:"6935a3fd3cffc469246aa13e"},
//     {category:"gym",productName:"fitness tracker",price:150,quantity:1,totalPrice:150,user:"6935a3fd3cffc469246aa13f"},
//     {category:"entertainment",productName:"museum ticket",price:25,quantity:4,totalPrice:100,user:"6935a3fd3cffc469246aa13b"},
//     {category:"shopping",productName:"watch",price:200,quantity:1,totalPrice:200,user:"6935a3fd3cffc469246aa13c"},
//     {category:"gym",productName:"workout gloves",price:18,quantity:2,totalPrice:36,user:"6935a3fd3cffc469246aa13d"},
//     {category:"entertainment",productName:"board game",price:40,quantity:2,totalPrice:80,user:"6935a3fd3cffc469246aa13e"},
//     {category:"shopping",productName:"sneakers",price:110,quantity:1,totalPrice:110,user:"6935a3fd3cffc469246aa13f"},
//     {category:"gym",productName:"jump rope",price:12,quantity:3,totalPrice:36,user:"6935a3fd3cffc469246aa13b"},
//     {category:"entertainment",productName:"movie rental",price:5,quantity:10,totalPrice:50,user:"6935a3fd3cffc469246aa13c"},
//     {category:"shopping",productName:"wallet",price:45,quantity:1,totalPrice:45,user:"6935a3fd3cffc469246aa13d"},
//     {category:"gym",productName:"foam roller",price:30,quantity:1,totalPrice:30,user:"6935a3fd3cffc469246aa13e"},
//     {category:"entertainment",productName:"theme park ticket",price:85,quantity:3,totalPrice:255,user:"6935a3fd3cffc469246aa13f"},
//     {category:"shopping",productName:"belt",price:35,quantity:2,totalPrice:70,user:"6935a3fd3cffc469246aa13b"},
//     {category:"gym",productName:"exercise mat",price:28,quantity:1,totalPrice:28,user:"6935a3fd3cffc469246aa13c"},
//     {category:"entertainment",productName:"podcast subscription",price:8,quantity:1,totalPrice:8,user:"6935a3fd3cffc469246aa13d"},
//     {category:"shopping",productName:"hat",price:25,quantity:3,totalPrice:75,user:"6935a3fd3cffc469246aa13e"},
//     {category:"gym",productName:"protein bar",price:3,quantity:20,totalPrice:60,user:"6935a3fd3cffc469246aa13f"},
//     {category:"entertainment",productName:"magazine subscription",price:15,quantity:1,totalPrice:15,user:"6935a3fd3cffc469246aa13b"},
//     {category:"shopping",productName:"scarf",price:30,quantity:2,totalPrice:60,user:"6935a3fd3cffc469246aa13c"},
//     {category:"gym",productName:"kettlebell",price:55,quantity:2,totalPrice:110,user:"6935a3fd3cffc469246aa13d"},
//     {category:"entertainment",productName:"escape room",price:30,quantity:4,totalPrice:120,user:"6935a3fd3cffc469246aa13e"},
//     {category:"shopping",productName:"perfume",price:75,quantity:1,totalPrice:75,user:"6935a3fd3cffc469246aa13f"},
//     {category:"gym",productName:"sports shoes",price:90,quantity:1,totalPrice:90,user:"6935a3fd3cffc469246aa13b"},
//     {category:"entertainment",productName:"comedy show ticket",price:45,quantity:2,totalPrice:90,user:"6935a3fd3cffc469246aa13c"},
//     {category:"shopping",productName:"handbag",price:140,quantity:1,totalPrice:140,user:"6935a3fd3cffc469246aa13d"},
//     {category:"gym",productName:"yoga blocks",price:22,quantity:2,totalPrice:44,user:"6935a3fd3cffc469246aa13e"},
//     {category:"entertainment",productName:"audiobook",price:20,quantity:3,totalPrice:60,user:"6935a3fd3cffc469246aa13f"},
//     {category:"shopping",productName:"socks",price:10,quantity:6,totalPrice:60,user:"6935a3fd3cffc469246aa13b"},
//     {category:"gym",productName:"workout shirt",price:28,quantity:3,totalPrice:84,user:"6935a3fd3cffc469246aa13c"},
//     {category:"entertainment",productName:"art supplies",price:35,quantity:2,totalPrice:70,user:"6935a3fd3cffc469246aa13d"},
//     {category:"shopping",productName:"umbrella",price:20,quantity:2,totalPrice:40,user:"6935a3fd3cffc469246aa13e"},
//     {category:"gym",productName:"gym towel",price:15,quantity:4,totalPrice:60,user:"6935a3fd3cffc469246aa13f"},
//     {category:"entertainment",productName:"karaoke night",price:25,quantity:5,totalPrice:125,user:"6935a3fd3cffc469246aa13b"},
//     {category:"shopping",productName:"tie",price:40,quantity:2,totalPrice:80,user:"6935a3fd3cffc469246aa13c"},
//     {category:"gym",productName:"ankle weights",price:32,quantity:1,totalPrice:32,user:"6935a3fd3cffc469246aa13d"},
//     {category:"entertainment",productName:"bowling",price:18,quantity:6,totalPrice:108,user:"6935a3fd3cffc469246aa13e"},
//     {category:"shopping",productName:"gloves",price:28,quantity:2,totalPrice:56,user:"6935a3fd3cffc469246aa13f"},
//     {category:"gym",productName:"pull-up bar",price:45,quantity:1,totalPrice:45,user:"6935a3fd3cffc469246aa13b"}
// ];
    //         try {
    //                 const db = await this.expenseModel.find();
    //                 if (db.length < expenses.length) {
    //                     await this.expenseModel.insertMany(expenses);
    //                     return "data inserted successfully"
    //                 }else{
    //                     return "data already exists in database"    
    //                 } 
    //             } catch (error) {
    //                 throw new InternalServerErrorException(error)
    //             }
    //         }
}

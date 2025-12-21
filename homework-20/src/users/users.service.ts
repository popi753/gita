import { BadRequestException, Body, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { isValidObjectId, Model } from "mongoose";
import { Role, user } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectid } from "../common/is-valid-objectId.dto";
import bcrypt from "bcrypt";
import { SignInDto } from "../auth/dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import { UpdateExpenseDto } from "../expenses/dto/update-expense.dto";
import { forbidden } from "joi";

// მოგესალმებით თქვენი დავალებაა დაამატოთ შემდეგი ფიჩერები წინა ანუ 27 დავალებას.

// 1) დაუმატეთ იუზერებს ახალი ფროფერტი isActive, და დაწერეთ მიგრაცია რომელიც ყველა იუზერის ჩანაწერს დაუმატებს ამ ახალ ფროფერთის შეიძლება ეს იყოს true ან false

// 2) დაამატეთ ახალი ენდფოინთი იქსფენსებზე მაგალითად /statistic და დააბრნეთ კატეგორიის მიხედვით დაჯგუფებული ხარჯები, პლუს დათვალეთ იმ კატეგორიაში რამდენი იყო სრული ხარჯი, რამდენი აითემია თითოეულ ხარჯის კატეგორიაში, და ლექციაზე როგორც ვქენით მასივის სახით ჩანდეს ეს ხარჯები.

// 3) დაამატეთ ახალი ენფოინთი იუზერებზე, დააჯგუფეთ ყველა იუზერი სქესის მიხედვით და გამოთვალეთ საშუალო ასაკი ორივეში.

// 4) ხარჯებზე დაამატეთ ახალი ენდფოინთი /expenses/top-spenders?limit=10 სადაც იუზერებს დააჯგუფებთ userId ების მიხედვით და დაუთვლით მთლიანად რამდენი აქვს დახარჯული.

@Injectable()
export class UserService {

    constructor(
        @InjectModel("user") private userModel: Model<user>,
        private jwtService: JwtService
    ){}

    
//     async onModuleInit(){
//         // 20% of true 80% of false
//         await this.userModel.updateMany(
//             { isActive: { $exists: false } },
//             [{ 
//                 $set: { 
//                     isActive: { $lt: [{ $rand: {} }, 0.2] } 
//                 } 
//             }]
// );
//         console.log("Module initialized: Missing active status populated.");
//     }



    async upgradeSubscription(id:string){
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException({user:"user not found"});
        }
        const endDate = new Date(user.subscriptionEndDate);
        if (new Date() > endDate) {
            const subscriptionStartDate = new Date()
            user.subscriptionStartDate = subscriptionStartDate.toISOString();

            const subscriptionEndDate = new Date(subscriptionStartDate) 
            subscriptionEndDate.setMonth( subscriptionStartDate.getMonth() + 1);
            user.subscriptionEndDate = subscriptionEndDate.toISOString();             
        }else{
            const newEndDate = new Date(endDate); 
            newEndDate.setMonth(endDate.getMonth() + 1);
            user.subscriptionEndDate = newEndDate.toISOString();
        }

        await user.save();
        
        return "subscription updated"
    }

    async findAll({page,take,gender,emailStartsWith}:QueryParamsDto){
        try {
                const query: Record<string, any> = {
                };

                if (gender) {
                    query.gender = gender;
                }

                if (emailStartsWith) {
                    query.email = { $regex: `^${emailStartsWith}`, $options: 'i' };
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

    async groupUsersBySex(){
        const usersBySex = await this.userModel.aggregate([
            {
                $group: {
                    _id: "$gender",
                    count: { $sum: 1 },
                    averageAge: { $avg: "$age" },
                }
            }
        ]);
        return usersBySex;
    }
  

    async deleteUserById(id:string, role:Role, userId:string){
        let user;
        if (role === "admin") {
            user = await this.userModel.findByIdAndDelete(id);
        }else if (id === userId) {
            user = await this.userModel.findByIdAndDelete(id);
        }else{
            throw new ForbiddenException({error : 'Forbidden'});
        }
        if (!user) {
            throw new NotFoundException({user:"user not found"});
        }
        return {success:true,user};
    }

    async updateUserById(id:string, role:Role, updateUserDto:UpdateUserDto, userId:string){
        let updatedUser;
        if (role === "admin") {
            updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
        }else if (id === userId) {
            updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
        }else{
            throw new ForbiddenException({error : 'Forbidden'});
        }
        if (!updatedUser) {
            throw new NotFoundException({user:"user not found"});
        }
        return {success:true,updatedUser};
    }

    async checkSubscription(email:string){
        const user = await this.userModel.findOne({email});
        if (!user || !user.subscriptionEndDate) {
            return false;
        }
        if (new Date(user.subscriptionEndDate) > new Date()) {
            return true;
        }else{
            return false;
        }
    }

   
    // async deleteExpenseFromUser(userId:string,role:Role, expenseId:string){
    //     const user = await this.userModel.findById(userId);

    //     if (!user) {
    //         throw new NotFoundException({user:"user not found"});
    //     }
    //     if (!user.expenses.some(expense => expense.toString() === expenseId)) {
    //         throw new NotFoundException({expense:"expense not found in user's expenses"});
    //     }

    //     const updatedUser = await this.userModel.findByIdAndUpdate(userId,
    //         { $pull: { expenses: expenseId } },
    //         { new: true }
    //     );
    //     if (!updatedUser) {
    //         throw new NotFoundException({user:"user not found"});
    //     }
    //     return {success:true,updatedUser};
    // }

    // async updateExpenseOfUser(userId:string, role:Role, expenseId:string, updateExpenseDto:UpdateExpenseDto){
    //     const user = await this.userModel.findById(userId);

    //     if (!user) {
    //         throw new NotFoundException({user:"user not found"});
    //     }
    //     if (!user.expenses.some(expense => expense.toString() === expenseId)) {
    //         throw new NotFoundException({expense:"expense not found in user's expenses"});
    //     }

    //     return {success:true};
    // }

    //use once, dont repeat
    // async insertDataToMongoDB(){
    //      const users = [
    //     {firstName:"nika",lastName:"mgaloblishvili",email:"test@gmail.com",phoneNumber:"+995555980126",gender:"male",subscriptionStartDate:"2024-01-15T00:00:00.000Z",subscriptionEndDate:"2024-02-15T00:00:00.000Z"},
    // {firstName:"ana",lastName:"beridze",email:"ana.b@gmail.com",phoneNumber:"+995551234567",gender:"female",subscriptionStartDate:"2024-02-01T00:00:00.000Z",subscriptionEndDate:"2026-03-01T00:00:00.000Z"},
    // {firstName:"giorgi",lastName:"kapanadze",email:"giorgi.k@yahoo.com",phoneNumber:"+995552345678",gender:"male",subscriptionStartDate:"2024-01-20T00:00:00.000Z",subscriptionEndDate:"2024-02-20T00:00:00.000Z"},
    // {firstName:"mariam",lastName:"gelashvili",email:"mariam.g@outlook.com",phoneNumber:"+995553456789",gender:"female",subscriptionStartDate:"2024-03-01T00:00:00.000Z",subscriptionEndDate:"2024-04-01T00:00:00.000Z"},
    // {firstName:"davit",lastName:"lomidze",email:"davit.l@gmail.com",phoneNumber:"+995554567890",gender:"male",subscriptionStartDate:"2024-01-10T00:00:00.000Z",subscriptionEndDate:"2024-02-10T00:00:00.000Z"},
    // {firstName:"nino",lastName:"chkheidze",email:"nino.ch@mail.com",phoneNumber:"+995555678901",gender:"female",subscriptionStartDate:"2024-02-15T00:00:00.000Z",subscriptionEndDate:"2024-03-15T00:00:00.000Z"},
    // {firstName:"levan",lastName:"janelidze",email:"levan.j@gmail.com",phoneNumber:"+995556789012",gender:"male",subscriptionStartDate:"2024-01-25T00:00:00.000Z",subscriptionEndDate:"2024-02-25T00:00:00.000Z"},
    // {firstName:"tamar",lastName:"kiknadze",email:"tamar.k@yahoo.com",phoneNumber:"+995557890123",gender:"female",subscriptionStartDate:"2024-03-10T00:00:00.000Z",subscriptionEndDate:"2024-04-10T00:00:00.000Z"},
    // {firstName:"irakli",lastName:"maisuradze",email:"irakli.m@gmail.com",phoneNumber:"+995558901234",gender:"male",subscriptionStartDate:"2024-01-05T00:00:00.000Z",subscriptionEndDate:"2024-02-05T00:00:00.000Z"},
    // {firstName:"salome",lastName:"nikoladze",email:"salome.n@outlook.com",phoneNumber:"+995559012345",gender:"female",subscriptionStartDate:"2024-02-20T00:00:00.000Z",subscriptionEndDate:"2024-03-20T00:00:00.000Z"},
    // {firstName:"luka",lastName:"orjonikidze",email:"luka.o@gmail.com",phoneNumber:"+995550123456",gender:"male",subscriptionStartDate:"2024-01-30T00:00:00.000Z",subscriptionEndDate:"2024-02-29T00:00:00.000Z"},
    // {firstName:"ketevan",lastName:"pirtskhalava",email:"ketevan.p@mail.com",phoneNumber:"+995551234560",gender:"female",subscriptionStartDate:"2024-03-05T00:00:00.000Z",subscriptionEndDate:"2024-04-05T00:00:00.000Z"},
    // {firstName:"sandro",lastName:"qavtaradze",email:"sandro.q@gmail.com",phoneNumber:"+995552345601",gender:"male",subscriptionStartDate:"2024-01-12T00:00:00.000Z",subscriptionEndDate:"2024-02-12T00:00:00.000Z"},
    // {firstName:"natia",lastName:"ramishvili",email:"natia.r@yahoo.com",phoneNumber:"+995553456012",gender:"female",subscriptionStartDate:"2024-02-25T00:00:00.000Z",subscriptionEndDate:"2024-03-25T00:00:00.000Z"},
    // {firstName:"tornike",lastName:"sarishvili",email:"tornike.s@gmail.com",phoneNumber:"+995554560123",gender:"male",subscriptionStartDate:"2024-01-18T00:00:00.000Z",subscriptionEndDate:"2024-02-18T00:00:00.000Z"},
    // {firstName:"elene",lastName:"tabidze",email:"elene.t@outlook.com",phoneNumber:"+995555601234",gender:"female",subscriptionStartDate:"2024-03-12T00:00:00.000Z",subscriptionEndDate:"2024-04-12T00:00:00.000Z"},
    // {firstName:"beka",lastName:"urushadze",email:"beka.u@gmail.com",phoneNumber:"+995556012345",gender:"male",subscriptionStartDate:"2024-01-08T00:00:00.000Z",subscriptionEndDate:"2024-02-08T00:00:00.000Z"},
    // {firstName:"mari",lastName:"vashakidze",email:"mari.v@mail.com",phoneNumber:"+995557012345",gender:"female",subscriptionStartDate:"2024-02-28T00:00:00.000Z",subscriptionEndDate:"2024-03-28T00:00:00.000Z"},
    // {firstName:"giga",lastName:"zaalishvili",email:"giga.z@gmail.com",phoneNumber:"+995558012345",gender:"male",subscriptionStartDate:"2024-01-22T00:00:00.000Z",subscriptionEndDate:"2024-02-22T00:00:00.000Z"},
    // {firstName:"sopho",lastName:"abashidze",email:"sopho.a@yahoo.com",phoneNumber:"+995559123456",gender:"female",subscriptionStartDate:"2024-03-15T00:00:00.000Z",subscriptionEndDate:"2024-04-15T00:00:00.000Z"},
    // {firstName:"rati",lastName:"basilashvili",email:"rati.b@gmail.com",phoneNumber:"+995550234567",gender:"male",subscriptionStartDate:"2024-01-14T00:00:00.000Z",subscriptionEndDate:"2024-02-14T00:00:00.000Z"},
    // {firstName:"tea",lastName:"chikovani",email:"tea.c@outlook.com",phoneNumber:"+995551345678",gender:"female",subscriptionStartDate:"2024-02-10T00:00:00.000Z",subscriptionEndDate:"2024-03-10T00:00:00.000Z"},
    // {firstName:"vakhtang",lastName:"dolidze",email:"vakhtang.d@gmail.com",phoneNumber:"+995552456789",gender:"male",subscriptionStartDate:"2024-01-28T00:00:00.000Z",subscriptionEndDate:"2024-02-28T00:00:00.000Z"},
    // {firstName:"maka",lastName:"eliava",email:"maka.e@mail.com",phoneNumber:"+995553567890",gender:"female",subscriptionStartDate:"2024-03-18T00:00:00.000Z",subscriptionEndDate:"2024-04-18T00:00:00.000Z"},
    // {firstName:"zurab",lastName:"firtskhalava",email:"zurab.f@gmail.com",phoneNumber:"+995554678901",gender:"male",subscriptionStartDate:"2024-01-06T00:00:00.000Z",subscriptionEndDate:"2024-02-06T00:00:00.000Z"},
    // {firstName:"lela",lastName:"gogiberidze",email:"lela.g@yahoo.com",phoneNumber:"+995555789012",gender:"female",subscriptionStartDate:"2024-02-12T00:00:00.000Z",subscriptionEndDate:"2024-03-12T00:00:00.000Z"},
    // {firstName:"mamuka",lastName:"khatiashvili",email:"mamuka.k@gmail.com",phoneNumber:"+995556890123",gender:"male",subscriptionStartDate:"2024-01-24T00:00:00.000Z",subscriptionEndDate:"2024-02-24T00:00:00.000Z"},
    // {firstName:"ia",lastName:"iashvili",email:"ia.i@outlook.com",phoneNumber:"+995557901234",gender:"female",subscriptionStartDate:"2024-03-20T00:00:00.000Z",subscriptionEndDate:"2024-04-20T00:00:00.000Z"},
    // {firstName:"nikoloz",lastName:"jokhadze",email:"nikoloz.j@gmail.com",phoneNumber:"+995558012346",gender:"male",subscriptionStartDate:"2024-01-16T00:00:00.000Z",subscriptionEndDate:"2024-02-16T00:00:00.000Z"},
    // {firstName:"khatuna",lastName:"kvaratskhelia",email:"khatuna.k@mail.com",phoneNumber:"+995559123457",gender:"female",subscriptionStartDate:"2024-02-18T00:00:00.000Z",subscriptionEndDate:"2024-03-18T00:00:00.000Z"},
    // {firstName:"revaz",lastName:"lortkipanidze",email:"revaz.l@gmail.com",phoneNumber:"+995550234568",gender:"male",subscriptionStartDate:"2024-01-26T00:00:00.000Z",subscriptionEndDate:"2024-02-26T00:00:00.000Z"},
    // {firstName:"manana",lastName:"mdivani",email:"manana.m@yahoo.com",phoneNumber:"+995551345679",gender:"female",subscriptionStartDate:"2024-03-22T00:00:00.000Z",subscriptionEndDate:"2024-04-22T00:00:00.000Z"},
    // {firstName:"archil",lastName:"nadibaidze",email:"archil.n@gmail.com",phoneNumber:"+995552456780",gender:"male",subscriptionStartDate:"2024-01-11T00:00:00.000Z",subscriptionEndDate:"2024-02-11T00:00:00.000Z"},
    // {firstName:"nana",lastName:"oniani",email:"nana.o@outlook.com",phoneNumber:"+995553567891",gender:"female",subscriptionStartDate:"2024-02-22T00:00:00.000Z",subscriptionEndDate:"2024-03-22T00:00:00.000Z"},
    // {firstName:"paata",lastName:"papava",email:"paata.p@gmail.com",phoneNumber:"+995554678902",gender:"male",subscriptionStartDate:"2024-01-19T00:00:00.000Z",subscriptionEndDate:"2024-02-19T00:00:00.000Z"},
    // {firstName:"rusudan",lastName:"qipiani",email:"rusudan.q@mail.com",phoneNumber:"+995555789013",gender:"female",subscriptionStartDate:"2024-03-25T00:00:00.000Z",subscriptionEndDate:"2024-04-25T00:00:00.000Z"},
    // {firstName:"shota",lastName:"rustaveli",email:"shota.r@gmail.com",phoneNumber:"+995556890124",gender:"male",subscriptionStartDate:"2024-01-13T00:00:00.000Z",subscriptionEndDate:"2024-02-13T00:00:00.000Z"},
    // {firstName:"tinatin",lastName:"sanikidze",email:"tinatin.s@yahoo.com",phoneNumber:"+995557901235",gender:"female",subscriptionStartDate:"2024-02-08T00:00:00.000Z",subscriptionEndDate:"2024-03-08T00:00:00.000Z"},
    // {firstName:"otar",lastName:"taktakishvili",email:"otar.t@gmail.com",phoneNumber:"+995558012347",gender:"male",subscriptionStartDate:"2024-01-27T00:00:00.000Z",subscriptionEndDate:"2024-02-27T00:00:00.000Z"},
    // {firstName:"ekaterine",lastName:"ugrekhelidze",email:"ekaterine.u@outlook.com",phoneNumber:"+995559123458",gender:"female",subscriptionStartDate:"2024-03-28T00:00:00.000Z",subscriptionEndDate:"2024-04-28T00:00:00.000Z"},
    // {firstName:"konstantine",lastName:"vasadze",email:"konstantine.v@gmail.com",phoneNumber:"+995550234569",gender:"male",subscriptionStartDate:"2024-01-09T00:00:00.000Z",subscriptionEndDate:"2024-02-09T00:00:00.000Z"},
    // {firstName:"dali",lastName:"zedginidze",email:"dali.z@mail.com",phoneNumber:"+995551345680",gender:"female",subscriptionStartDate:"2024-02-14T00:00:00.000Z",subscriptionEndDate:"2024-03-14T00:00:00.000Z"},
    // {firstName:"avtandil",lastName:"akhvlediani",email:"avtandil.a@gmail.com",phoneNumber:"+995552456781",gender:"male",subscriptionStartDate:"2024-01-21T00:00:00.000Z",subscriptionEndDate:"2024-02-21T00:00:00.000Z"},
    // {firstName:"medea",lastName:"benashvili",email:"medea.b@yahoo.com",phoneNumber:"+995553567892",gender:"female",subscriptionStartDate:"2024-03-08T00:00:00.000Z",subscriptionEndDate:"2024-04-08T00:00:00.000Z"},
    // {firstName:"guram",lastName:"chubinidze",email:"guram.c@gmail.com",phoneNumber:"+995554678903",gender:"male",subscriptionStartDate:"2024-01-17T00:00:00.000Z",subscriptionEndDate:"2024-02-17T00:00:00.000Z"},
    // {firstName:"nestan",lastName:"dumbadze",email:"nestan.d@outlook.com",phoneNumber:"+995555789014",gender:"female",subscriptionStartDate:"2024-02-16T00:00:00.000Z",subscriptionEndDate:"2024-03-16T00:00:00.000Z"},
    // {firstName:"tengiz",lastName:"esiava",email:"tengiz.e@gmail.com",phoneNumber:"+995556890125",gender:"male",subscriptionStartDate:"2024-01-23T00:00:00.000Z",subscriptionEndDate:"2024-02-23T00:00:00.000Z"},
    // {firstName:"tsira",lastName:"gabashvili",email:"tsira.g@mail.com",phoneNumber:"+995557901236",gender:"female",subscriptionStartDate:"2024-03-14T00:00:00.000Z",subscriptionEndDate:"2024-04-14T00:00:00.000Z"},
    // {firstName:"merab",lastName:"kostava",email:"merab.k@gmail.com",phoneNumber:"+995558012348",gender:"male",subscriptionStartDate:"2024-01-07T00:00:00.000Z",subscriptionEndDate:"2024-02-07T00:00:00.000Z"},
    // {firstName:"nato",lastName:"liluashvili",email:"nato.l@yahoo.com",phoneNumber:"+995559123459",gender:"female",subscriptionStartDate:"2024-02-24T00:00:00.000Z",subscriptionEndDate:"2024-03-24T00:00:00.000Z"}
    // ];

    //     try {
    //         const db = await this.userModel.find();
    //         if (db.length < users.length) {
    //             await this.userModel.insertMany(users);
    //             return "data inserted successfully"
    //         }else{
    //             return "data already exists in database"    
    //         } 
    //     } catch (error) {
    //         throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }
}
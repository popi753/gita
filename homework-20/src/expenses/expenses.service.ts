import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";


@Injectable()
export class ExpenseService {

    private expenses = [
        {id:0,category:"entertainment",productName:"netflix",price:15,quantity:1,totalPrice:15},
        {id:1,category:"entertainment",productName:"netflix",price:15,quantity:1,totalPrice:15},
        {id:2,category:"gym",productName:"membership",price:50,quantity:1,totalPrice:50},
        {id:3,category:"shopping",productName:"shoes",price:80,quantity:2,totalPrice:160},
        {id:4,category:"entertainment",productName:"spotify",price:10,quantity:1,totalPrice:10},
        {id:5,category:"gym",productName:"protein powder",price:30,quantity:3,totalPrice:90},
        {id:6,category:"shopping",productName:"laptop",price:1200,quantity:1,totalPrice:1200},
        {id:7,category:"entertainment",productName:"cinema ticket",price:12,quantity:4,totalPrice:48},
        {id:8,category:"shopping",productName:"headphones",price:150,quantity:1,totalPrice:150},
        {id:9,category:"gym",productName:"yoga mat",price:25,quantity:2,totalPrice:50},
        {id:10,category:"entertainment",productName:"game subscription",price:20,quantity:1,totalPrice:20},
        {id:11,category:"shopping",productName:"jacket",price:120,quantity:1,totalPrice:120},
        {id:12,category:"gym",productName:"dumbbells",price:45,quantity:2,totalPrice:90},
        {id:13,category:"entertainment",productName:"concert ticket",price:75,quantity:2,totalPrice:150},
        {id:14,category:"shopping",productName:"phone case",price:15,quantity:3,totalPrice:45},
        {id:15,category:"gym",productName:"water bottle",price:20,quantity:1,totalPrice:20},
        {id:16,category:"entertainment",productName:"book",price:18,quantity:5,totalPrice:90},
        {id:17,category:"shopping",productName:"jeans",price:60,quantity:2,totalPrice:120},
        {id:18,category:"gym",productName:"resistance bands",price:25,quantity:1,totalPrice:25},
        {id:19,category:"entertainment",productName:"streaming service",price:14,quantity:1,totalPrice:14},
        {id:20,category:"shopping",productName:"backpack",price:85,quantity:1,totalPrice:85},
        {id:21,category:"gym",productName:"gym bag",price:35,quantity:1,totalPrice:35},
        {id:22,category:"entertainment",productName:"video game",price:60,quantity:3,totalPrice:180},
        {id:23,category:"shopping",productName:"sunglasses",price:95,quantity:1,totalPrice:95},
        {id:24,category:"gym",productName:"fitness tracker",price:150,quantity:1,totalPrice:150},
        {id:25,category:"entertainment",productName:"museum ticket",price:25,quantity:4,totalPrice:100},
        {id:26,category:"shopping",productName:"watch",price:200,quantity:1,totalPrice:200},
        {id:27,category:"gym",productName:"workout gloves",price:18,quantity:2,totalPrice:36},
        {id:28,category:"entertainment",productName:"board game",price:40,quantity:2,totalPrice:80},
        {id:29,category:"shopping",productName:"sneakers",price:110,quantity:1,totalPrice:110},
        {id:30,category:"gym",productName:"jump rope",price:12,quantity:3,totalPrice:36},
        {id:31,category:"entertainment",productName:"movie rental",price:5,quantity:10,totalPrice:50},
        {id:32,category:"shopping",productName:"wallet",price:45,quantity:1,totalPrice:45},
        {id:33,category:"gym",productName:"foam roller",price:30,quantity:1,totalPrice:30},
        {id:34,category:"entertainment",productName:"theme park ticket",price:85,quantity:3,totalPrice:255},
        {id:35,category:"shopping",productName:"belt",price:35,quantity:2,totalPrice:70},
        {id:36,category:"gym",productName:"exercise mat",price:28,quantity:1,totalPrice:28},
        {id:37,category:"entertainment",productName:"podcast subscription",price:8,quantity:1,totalPrice:8},
        {id:38,category:"shopping",productName:"hat",price:25,quantity:3,totalPrice:75},
        {id:39,category:"gym",productName:"protein bar",price:3,quantity:20,totalPrice:60},
        {id:40,category:"entertainment",productName:"magazine subscription",price:15,quantity:1,totalPrice:15},
        {id:41,category:"shopping",productName:"scarf",price:30,quantity:2,totalPrice:60},
        {id:42,category:"gym",productName:"kettlebell",price:55,quantity:2,totalPrice:110},
        {id:43,category:"entertainment",productName:"escape room",price:30,quantity:4,totalPrice:120},
        {id:44,category:"shopping",productName:"perfume",price:75,quantity:1,totalPrice:75},
        {id:45,category:"gym",productName:"sports shoes",price:90,quantity:1,totalPrice:90},
        {id:46,category:"entertainment",productName:"comedy show ticket",price:45,quantity:2,totalPrice:90},
        {id:47,category:"shopping",productName:"handbag",price:140,quantity:1,totalPrice:140},
        {id:48,category:"gym",productName:"yoga blocks",price:22,quantity:2,totalPrice:44},
        {id:49,category:"entertainment",productName:"audiobook",price:20,quantity:3,totalPrice:60},
        {id:50,category:"shopping",productName:"socks",price:10,quantity:6,totalPrice:60},
        {id:51,category:"gym",productName:"workout shirt",price:28,quantity:3,totalPrice:84},
        {id:52,category:"entertainment",productName:"art supplies",price:35,quantity:2,totalPrice:70},
        {id:53,category:"shopping",productName:"umbrella",price:20,quantity:2,totalPrice:40},
        {id:54,category:"gym",productName:"gym towel",price:15,quantity:4,totalPrice:60},
        {id:55,category:"entertainment",productName:"karaoke night",price:25,quantity:5,totalPrice:125},
        {id:56,category:"shopping",productName:"tie",price:40,quantity:2,totalPrice:80},
        {id:57,category:"gym",productName:"ankle weights",price:32,quantity:1,totalPrice:32},
        {id:58,category:"entertainment",productName:"bowling",price:18,quantity:6,totalPrice:108},
        {id:59,category:"shopping",productName:"gloves",price:28,quantity:2,totalPrice:56},
        {id:60,category:"gym",productName:"pull-up bar",price:45,quantity:1,totalPrice:45}
    ];

    // 2) დაამატეთ ორივე რესურსზე ფეჯინეიშენი, page = 1, take.= 30,
//  არაფერს თუ არ გადასცემთ დიფოლატად პირველი 30 ჩანაწერი უნდა წამოიღოს
// 3) ხარჯებზე გააკეთეთ კატეგორიების ვალიდაცია, გქონდეთ რამე knowCategories 
// და როგორც ლექციაზე ვქენით ან დასერჩეთ როგორ უნდა გააეკთოთ ინამ ველიუების ვალიდაცია class-validator ის გამოყენებით


// 5) დაამატეთ query-ით ფილტრები ასევე ხარჯებზე, კატეგორით მაგალითად, priceFrom. priceTo


    getAllExpenses({page,take,priceFrom,priceTo,category}:QueryParamsDto){
        try {
                const start = (page-1)*take
                const end = page*take
        
                let filteredExpenses = this.expenses;


                if (category) {
                    filteredExpenses = filteredExpenses.filter(e=>{
                        return (e.category === category)
                    })
                }


                if (priceFrom || priceTo) {
                    filteredExpenses = filteredExpenses.filter(e=>{
                        if (priceFrom && priceTo) {
                            return e.totalPrice >= priceFrom && e.totalPrice <= priceTo
                        } else if (priceFrom) {
                            return e.totalPrice >= priceFrom
                        } else if (priceTo) {
                            return e.totalPrice <= priceTo
                        }
                        return true
                    })
                }



                let paginatedExpenses = filteredExpenses.slice(start, end);


                return {
                    page,
                    take,
                    total: filteredExpenses.length,
                    data:  paginatedExpenses
                }
                
        
            } catch (error) {
                throw new InternalServerErrorException(error);
            };
    }

    createExpense({category,productName,price,quantity}:CreateExpenseDto){
        try {
            let id = Math.ceil(Math.random()*100);
            while(this.expenses.find(e=>e.id===id)){
                id++
            }
            
            const totalPrice = price * quantity;
            
            const newExpense = {
                id,
                category,
                productName,
                price,
                quantity,
                totalPrice
            }

            this.expenses.push(newExpense);

            return {success:true,newExpense}

        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    getExpenseById(id:number){
        const expense = this.expenses.find(e=>e.id===id);
        if (!expense) {
            throw new NotFoundException("expense not found");
        }

        
        return expense;
    }

    deleteExpenseById(id:number){
        const expenseIndex = this.expenses.findIndex(e=>e.id===id);
        if (expenseIndex === -1) {
            throw new NotFoundException("expense not found");
        }

        const expense = this.expenses[expenseIndex];
        this.expenses.splice(expenseIndex,1);
        return {success:true,expense};
    }

    updateExpenseById(id:number, updateExpenseDto:UpdateExpenseDto){
        // if (!updateExpenseDto.category && !updateExpenseDto.productName && !updateExpenseDto.price && !updateExpenseDto.quantity) {
        //     throw new HttpException("please provide valid data", HttpStatus.BAD_REQUEST)
        // }
        
        // const errors : Record <string,string> = {};  
        
        // if (updateExpenseDto.category && typeof updateExpenseDto.category !== "string") {
        //     errors.category = "please provide valid category"
        // }
        // if (updateExpenseDto.productName && typeof updateExpenseDto.productName !== "string") {
        //     errors.productName = "please provide valid product name"
        // }
        // if (updateExpenseDto.price && typeof updateExpenseDto.price !== "number") {
        //     errors.price = "please provide valid price"
        // }
        // if (updateExpenseDto.quantity && typeof updateExpenseDto.quantity !== "number") {
        //     errors.quantity = "please provide valid quantity"
        // }
        
        // if (Object.keys(errors).length) {
        //     throw new HttpException(errors, HttpStatus.BAD_REQUEST);
        // }

        const expenseIndex = this.expenses.findIndex(e=>e.id===id);
        if (expenseIndex === -1) {
            throw new NotFoundException("expense not found");
        }
        
        const updatedExpense = {...this.expenses[expenseIndex], ...updateExpenseDto};
        
        if (updateExpenseDto.price || updateExpenseDto.quantity) {
            updatedExpense.totalPrice = updatedExpense.price * updatedExpense.quantity;
        }
        
        this.expenses[expenseIndex] = updatedExpense;
        return {success:true,updatedExpense};
    }
}

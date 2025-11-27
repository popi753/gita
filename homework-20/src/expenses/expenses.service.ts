import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";


@Injectable()
export class ExpenseService {

    private expenses = [
        {id:1,category:"entertainment",productName:"netflix",price:15,quantity:1,totalPrice:15}
    ];

    getAllExpenses(){
        return this.expenses;
    }

    createExpense({category,productName,price,quantity}:CreateExpenseDto){
        const errors : Record <string,string> = {};
        
        if (!category || typeof category !== "string") {
            errors.category = "please provide valid category"
        }
        if (!productName || typeof productName !== "string") {
            errors.productName = "please provide valid product name"
        }
        if (!price || typeof price !== "number") {
            errors.price = "please provide valid price"
        }
        if (!quantity || typeof quantity !== "number") {
            errors.quantity = "please provide valid quantity"
        }
        
        if (Object.keys(errors).length) {
            throw new HttpException(errors, HttpStatus.BAD_REQUEST)
        }

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
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
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
        if (!updateExpenseDto.category && !updateExpenseDto.productName && !updateExpenseDto.price && !updateExpenseDto.quantity) {
            throw new HttpException("please provide valid data", HttpStatus.BAD_REQUEST)
        }
        
        const errors : Record <string,string> = {};  
        
        if (updateExpenseDto.category && typeof updateExpenseDto.category !== "string") {
            errors.category = "please provide valid category"
        }
        if (updateExpenseDto.productName && typeof updateExpenseDto.productName !== "string") {
            errors.productName = "please provide valid product name"
        }
        if (updateExpenseDto.price && typeof updateExpenseDto.price !== "number") {
            errors.price = "please provide valid price"
        }
        if (updateExpenseDto.quantity && typeof updateExpenseDto.quantity !== "number") {
            errors.quantity = "please provide valid quantity"
        }
        
        if (Object.keys(errors).length) {
            throw new HttpException(errors, HttpStatus.BAD_REQUEST);
        }

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

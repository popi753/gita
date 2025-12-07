import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class expense {
    @Prop({
        required: true,
        type: String
    })
    productName:string

    @Prop({
        required: true,
        type: String
    })
    category:string

    @Prop({
        required: true,
        type: Number,
    })
    quantity:number

    @Prop({
        required: true,
        type: Number,
    })
    price:number

    @Prop({
        required: true,
        type: Number,
    })
    totalPrice:number

    @Prop({
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "user"
    })
    user:mongoose.Types.ObjectId
     
} 

export const expenseModel = SchemaFactory.createForClass(expense);
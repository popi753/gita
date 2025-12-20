import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export enum Gender {
    Male = "male",
    Female = "female",
}

export enum Role {
    User = "user",
    Admin = "admin",
}

@Schema()
export class user {
    @Prop({
        required: true,
        type: String
    })
    firstName:string

    @Prop({
        required: true,
        type: String
    })
    lastName:string

    @Prop({
        required: true,
        type: String,
        unique: true,
    })
    email:string

    @Prop({
        required: true,
        type: String,
        select: false,
    })
    password:string

    @Prop({
        required: true,
        type: Number,
    })
    age:number

    @Prop({
        required: true,
        type: String,
        unique: true,
    })
    phoneNumber:string
    
    @Prop({
        required: true,
        type: String,
        enum: Gender,
    })
    gender: Gender

    @Prop({
        required: true,
        type: String,
        enum: Role,
    })
    role: Role

    @Prop({
        required: true,
        type: Boolean,
    })
    isActive: Boolean

    @Prop({
        required: true,
        type: String,
    })
    subscriptionStartDate: string

    @Prop({
        required: true,
        type: String,
    })
    subscriptionEndDate: string

    @Prop({
        type: [mongoose.Types.ObjectId],
        ref: "expense",
        default: [],
    })
    expenses: mongoose.Types.ObjectId[]
} 

export const userModel = SchemaFactory.createForClass(user);
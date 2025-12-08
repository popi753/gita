import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export enum Gender {
    Male = "male",
    Female = "female",
}

@Schema()
export class user {
    @Prop({
        required: true,
        type: String
    })
    name:string

    @Prop({
        required: true,
        type: String,
        // unique: true,
    })
    email:string

    @Prop({
        required: true,
        type: String,
        enum: Gender,
    })
    gender: Gender

  @Prop({
    required: true,
    type: Number,
    index: true,
  })
  age: number;
} 

export const userModel = SchemaFactory.createForClass(user);
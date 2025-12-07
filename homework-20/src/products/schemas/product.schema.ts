import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class product {
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
     
} 

export const productModel = SchemaFactory.createForClass(product);
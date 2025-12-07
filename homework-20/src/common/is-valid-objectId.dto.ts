import { IsMongoId } from "class-validator";
import { isValidObjectId } from "mongoose";

export class isValidObjectid{
    
    @IsMongoId({ message: 'Invalid ID format' })
    id:string;
}
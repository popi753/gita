import {Request,Response,NextFunction } from "express";
import productSchema from "../validation/product.validation";

const createMiddleware = (req :Request,res:Response,next: NextFunction)=>{
    const {error,value} = productSchema.validate(req.body || {}, {abortEarly: false})

    if (error) {
        return res.status(400).json({message: error.details.map(element=>element.message)});
    };

    req.body = value;
    console.log("product is found")
    next();
}

export default createMiddleware;

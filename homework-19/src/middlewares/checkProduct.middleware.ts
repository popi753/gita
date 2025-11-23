import {Request,Response,NextFunction } from "express";
import productModel from "../product/product.model";

const checkProductMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;

    const product = await productModel.findById(id);
    if(!product){
        return res.status(404).json({error: "Product not found"})
    }

    console.log("product is validated")
    next();
}

export default checkProductMiddleware;
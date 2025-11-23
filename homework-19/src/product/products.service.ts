import { Request, Response } from "express";
import productModel from "./product.model";

export const getProducts = async (req : Request ,res :Response)=>{
    try {
        const products = await productModel.find();
        return res.status(200).json({products});
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})
    }
};

export const getProductById = async (req : Request ,res :Response)=>{
   try {
        const id = req.params.id;
        const product = await productModel.findById(id);
        if(!product){
            return res.status(404).json({error: "Product not found"})
        }
        return res.status(200).json({product});
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})
    }
};

export const createProduct = async (req : Request ,res :Response)=>{
    try {
            const newProduct = await productModel.create(req.body);
            
            res.status(201).json({success: true, newProduct})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to create product" });
        }
};


export const updateProduct = async (req : Request ,res :Response)=>{
    try {
        const id = req.params.id;
        await productModel.findByIdAndUpdate(id, req.body);    
        return res.status(200).json({message: "Product updated successfully"})    
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})   
    }

};

export const deleteProduct = async (req : Request ,res :Response)=>{
    try {
        const id = req.params.id;
        await productModel.findByIdAndDelete(id);    
        return res.status(200).json({message: "Product deleted successfully"})    
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})   
    }

};


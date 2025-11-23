import {Request,Response,NextFunction } from "express";

const checkRoleMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const role = req.headers.role;

    if (!role || role !== "admin") {
        return res.status(401).json({message: "Unauthorized"});
    }

    console.log("role is validated")
    next();
}

export default checkRoleMiddleware;
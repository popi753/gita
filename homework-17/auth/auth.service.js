const jwt = require("jsonwebtoken");
const authModel = require("./auth.model.js");
const blogsModel = require("../blogs/blogs.model.js")
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const existUser = await authModel.findOne({email}).select("password")
        if (!existUser) {
            return res.status(400).json({error: "email or password is incorrect"})
        };


        const isPassEqual = await bcrypt.compare(password, existUser.password);
        if (!isPassEqual) {
            return res.status(400).json({error: "email or password is incorrect"})
        };


        const payload = {
            userId: existUser._id
        };

        const token = await jwt.sign(payload, process.env.secret, {expiresIn: "1h"})

        
        res.status(201).json({success: true, token: token})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to login" });
    }
}

exports.register = async (req,res)=>{
    try {
        const {fullName,email,password,birthDate} = req.body;

        const existEmail = await authModel.findOne({email})
        if (existEmail) {
            return res.status(400).json({error: "user with this email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await authModel.create({
            fullName,
            email,
            password: hashedPassword,
            birthDate,
        })

        const payload = {
            userId: newUser._id
        };

        const token = await jwt.sign(payload, process.env.secret, {expiresIn: "1h"})

        
        res.status(201).json({success: true, token: token})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register" });
    }
}

exports.profile = async (req,res)=>{
    try {
        const user = await authModel.findById(req.userId);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "couldnt find profile"})
    }
}


exports.deleteProfile = async(req,res)=>{
    try {
        const password = req.body?.password;
        if (!password) {
            return res.status(400).json({error: "password must be provided"})
        }

        const user = await authModel.findById(req.userId).select("password");
        if (!user) {
            return res.status(400).json({error: "user doesnt exist"})
        };


        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(400).json({error: "password is incorrect"})
        };

        await authModel.findByIdAndDelete(req.userId);

        await blogsModel.deleteMany({author: req.userId})
        
        return res.status(200).json({ success: true, message: "profile and blogs deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete profile" });
    }
}

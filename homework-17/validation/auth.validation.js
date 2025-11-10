const Joi = require("joi");

exports.registerSchema = Joi.object({
    fullName : Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required().pattern(new RegExp(`^[a-zA-Z0-9]{3,20}$`)),
    birthDate: Joi.date().required(),
    blogs: Joi.array().optional().default([])
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required().pattern(new RegExp(`^[a-zA-Z0-9]{3,20}$`)),
});

// 2) მომხმარებლის მოდელი
// თითოეულ მომხმარებელს უნდა ჰქონდეს შემდეგი ველები:
// - fullName
// - email
// - password
// - birthDate
// - blogs (ბლოგების მასივი)
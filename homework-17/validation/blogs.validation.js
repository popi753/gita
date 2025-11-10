const Joi = require("joi");

exports.blogSchema = Joi.object({
    title : Joi.string().min(3).max(20).required(),
    content: Joi.string().min(3).max(100).required(),
});

// 3) ბლოგის მოდელი და CRUD ფუნქციონალი
// შექმენით ბლოგებისთვის სრული CRUD ფუნქციონალი — შექმნა, წაკითხვა, განახლება, წაშლა.თითოეულ ბლოგს უნდა ჰქონდეს:
// - title
// - content
// - author
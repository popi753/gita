const express = require("express");
const app = express();
const connectToDB = require("./db.config.js")

const authRouter = require("./auth/auth.controller.js");
const blogsRouter = require("./blogs/blogs.controller.js");

app.use(express.json());

// ექმენით ახალი Node.js პროექტი და შეასრულეთ შემდეგი პუნქტები:

// 1) რეგისტრაცია და ავტორიზაცია
// განახორციელეთ რეგისტრაცია და ავტორიზაცია (როგორც ნაჩვენებია ლექციაზე).

// 2) მომხმარებლის მოდელი
// თითოეულ მომხმარებელს უნდა ჰქონდეს შემდეგი ველები:
// - fullName
// - email
// - password
// - birthDate
// - blogs (ბლოგების მასივი)

// 3) ბლოგის მოდელი და CRUD ფუნქციონალი
// შექმენით ბლოგებისთვის სრული CRUD ფუნქციონალი — შექმნა, წაკითხვა, განახლება, წაშლა.თითოეულ ბლოგს უნდა ჰქონდეს:
// - title
// - content
// - author

// 4) მონაცემთა რელაცია
// როდესაც ბლოგი იშლება, მისი ID უნდა წაიშალოს შესაბამისი მომხმარებლის blogs მასივიდან.
// როდესაც მომხმარებელი იშლება, უნდა წაიშალოს ყველა ბლოგი, რომელიც მას ეკუთვნის.

// 5) ავტორიზაციის Middleware
// ყველა ბლოგის როუტი დაიცავით isAuth middleware-ით.

// 6) ბლოგის მფლობელობა
// მომხმარებელს უნდა შეეძლოს მხოლოდ საკუთარი ბლოგის განახლება ან წაშლა (სხვაზე ვერ იმოქმედებს). ანუ შეამოწმეთ განახლების ნამდვილად მის შექმნილ ბლოგს ანახლებს ან შლის თუ არა.

// 7) Joi ვალიდაცია
// დაამატეთ Joi ვალიდაცია მომხმარებლისა და ბლოგის მოდელებზე:


app.use("/auth", authRouter);
app.use("/blogs", blogsRouter);



connectToDB().then(()=>{
        app.listen(3000,()=>{
        console.log("Server started on http://localhost:3000");
    });
}).catch(_err=>{console.log("something went wrong")})


const express = require("express");
const app = express();
const connectToDB = require("./db.congig.js")

const expenseRouter = require("./expenses/expense.controller.js");
const randomFactRouter = require("./random-fact/random-fact.controller.js");


app.use(express.json());

// წინა მე-15 დავალებას დაუმატეთ შემდეგი ფუნცქიონალი: 
// 1) დააკონფიგურირეთ მონგოდიბის ბაზა, გამოიყენეთ .env ფაილი და თქვენი connection string არ გამოაჩინოთ საჯაროდ არსად
// 2) შექმენით ხარჯების მოდელი
// 3) დააიმპლემენტირეთ სრულად ქრადის ტიპის ოპერაციები, არ გამოგრჩეთ მონგოს აიდის ვალიდაციის დადება
// 4) დაამატეთ ახალი ენდფოინტთი /expenses/top-5 რომელიც დაგიბრუნებთ 5 ყველაზე ძვირ ხარჯს
// 5) დაამატეთ ფილტრის ფუნციონალი მაგალითად თუ დავწერ ხარჯების წამოღებისას /expenses?category=shopping,gym,food&amountFrom=200&amountTo=500 უნდა დააბრუნოს ყველა ის ხარჯი რომელიც არის 200დან 500ლარამდე პლუს რომელთა კატეგორია არის შოპინგი, ვარჯიში და საკვები

app.use("/expenses", expenseRouter);
app.use("/random-fact", randomFactRouter);



connectToDB().then(()=>{
        app.listen(3000,()=>{
        console.log("Server started on http://localhost:3000");
    });
}).catch(_err=>{console.log("something went wrong")})


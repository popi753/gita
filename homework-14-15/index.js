const express = require("express");
const app = express();
const { returnParsedData, writedData, validatePrice } = require("./utils.js");
const fs = require('fs/promises');

const expenseRouter = require("./expenses/expense.controller.js");
const randomFactRouter = require("./random-fact/random-fact.controller.js");


app.use(express.json());

// დაამატე შემდეგი ფუნქციონალი წინა ხარჯების დავალებას (დავალება 14):

// 1) შექმენი routes და გააერთიანე ყველა ხარჯი ამ routes-ში. შეგიძლიათ გამოიყენოთ როგორც layer based ასევე featured based არქიტექტურა.

// 2) დაამატე services ფაილი, სადაც დაწერ ყველა ლოგიკას.

// 3) შექმენი middleware და დაამატე ის delete route-ზე — თუ headers-ში აუცილებელი key არ არის მიწოდებული, დააბრუნე ერორი.

// 4) შექმენი middleware, რომელიც დაემატება create expense route-ს და შეამოწმებს, ყველა აუცილებელი ველი გადმოცემულია თუ არა; წინააღმდეგ შემთხვევაში, დააბრუნოს ერორი.

// 5) შექმენი /random-fact route, რომელიც აბრუნებს ნებისმიერ შემთხვევით ფაქტს. დაამატე middleware, რომელიც ამ route-ზე შემთხვევითად ნახევარ მოთხოვნას დაბლოკავს, ხოლო დანარჩენს გაუშვებს. დაბლოკავს იგულისმება რო ერორს დაუბრუნებს რენდომად


app.use("/expenses", expenseRouter);
app.use("/random-fact", randomFactRouter);





app.listen(3000,()=>{
    console.log("Server started on http://localhost:3000");
});
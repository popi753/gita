const express = require("express");
const app = express();
const path = require('path');
const logger = require('morgan');

const {returnFilteredData,returnExpenseById,createExpense,editExpense,deleteExpense} = require("./viewUtils.js")

const createMiddleware = require("./middlewares/create.middleware.js")
const editMiddleware = require("./middlewares/edit.middleware.js")


const expenseApiRouter = require("./api/expenses/expense.controller.js");

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));


// გააკეთეთ ხარჯების ქრადი ejs ის გამოყენებით: 

// 1) ბექენდში გამოყეთ /api და ვიუს როუტები. => 1 ქულა
// 2) ხარჯები შეინახეთ expenses.json ში და გამოიყენეთ fs/promises მოდული ქრადის ფუნცქიონალისთვის, Create, Read, Read by id, Update, Delete => 2 ქულა
// 3) გამოიყენეთ მინუმუმ 2 partial კომპონენტი => 1 ქულა
// 4) ჰოუმ ფეიჯზე დაამატეთ კატეგორიის ფილტრის ფუნქციონალი, გექნებათ 1 ინფუთი და შიგნით სერჩის შემდეგ ბათონი search რომელიც მოძებნის ამ კატეგორიას და გამოაჩენს შედეგს. => 1 ქულა

// რეფერენსი: https://github.com/Datodia/Gita-backend-2/tree/main/Lec16

app.get('/', async (req, res) => {
  const query = req.query.search || "";

  let expenses;
  if (query) {
    expenses = await returnFilteredData(path.join(__dirname, 'expenses.json'), query);
  }

  res.render('index', {data : expenses});
});

app.get("/expenses/create", (req, res) => {
    res.render("expenses/expenseCreate", {error : false});
})

app.post("/expenses/create", createMiddleware, async (req, res) => {
    const {price,category} = req.body;
    try {
        const id = await createExpense(path.join(__dirname, 'expenses.json'), {price,category});
        res.redirect(`/expenses/${id}`);
    } catch (error) {
            console.log(error);
            res.render("expenses/expenseCreate", {error : {body: "couldnt create expense, try later"}});
    };
    
})

app.get("/expenses/:id/edit", async (req, res) => {
    const expenseId = req.params["id"]; 
    
    const expense = await returnExpenseById(path.join(__dirname, 'expenses.json'), expenseId);

    res.render("expenses/expenseEdit", {expense: expense[0], error : false});
})

app.post("/expenses/:id/edit", editMiddleware, async (req, res) => {
    const expenseId = req.params["id"]; 
    const {price,category} = req.body;
    try {
        const id = await editExpense(path.join(__dirname, 'expenses.json'), expenseId,price, category);
        res.redirect(`/expenses/${id}`);
    } catch (error) {
            console.log(error);
            res.render("expenses/expenseCreate", {error : {body: "couldnt create expense, try later"}});
    };
   
})

app.get("/expenses/:id/delete", async (req, res) => {
    const expenseId = req.params["id"]; 
    console.log(expenseId)
    try {
        await deleteExpense(path.join(__dirname, 'expenses.json'), expenseId);
        res.redirect(`/`);
    } catch (error) {
        console.log(error);        
    }

})

app.get("/expenses/:id", async (req, res) => {
    const expenseId = req.params["id"]; 
    try {
        const expense = await returnExpenseById(path.join(__dirname, 'expenses.json'), expenseId);
        res.render("expenses/expense", {expense: expense[0]});
    } catch (error) {
        console.log(error);
        res.render("expenses/expense", {expense: expense[0]});
    }
})



app.use("/api/expenses", expenseApiRouter);


 app.listen(3000,()=>{
        console.log("Server started on http://localhost:3000");
    });



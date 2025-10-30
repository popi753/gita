const express = require("express");
const app = express();
const { returnParsedData, writedData, validatePrice } = require("./utils.js");
const fs = require('fs/promises');

app.use(express.json());
// 1) შექმენით ხარჯების(expenses) ქრადი ექსპრესის გამოყენებით.

// 2) დაამატეთ ფეჯინეიშენის ფიჩერი, /expenses?page=1&take=30 უნდა დააბურნოს 30 ჩანაწერი, გაითვალისწინეთ ზედა ზღვარზე შეზღუდვა

// 3) დაამატეთ ვალიდაცია წაშლის დროს, უზერმა უნდა შეძლოს ხარჯის წაშლა მხოლოდ მაშინ თუ ჰედერში გამოატანს რაიმე კოდურ სიტყვას მაგალითად secret=random123

// 4) გაჰენდლეთ ერორები, ყველა ენდოითნზე როდესაც კლიენტი არასწორ ინფორმაციას გამოატანს გაუზაგვნეთ შესაბამისი სტატუს კოდები,

// გამოიყენეთ FS მოდული და ExpressJS, ხარჯები უნდა შეინახოტ expenses.json ფაილში



app.get("/expenses", async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const take = parseInt(req.query.take) || 10;
        
        const expenses = await returnParsedData(__dirname + '/expenses.json');
        const availablePages = Math.ceil(expenses.length / take);

        if (availablePages < page) {
            return res.status(400).json({ error: `Pagination is available only for ${availablePages} expenses` });
        }

        const pageData = expenses.slice((page - 1) * take, page * take);

        return res.status(200).json({
            page,
            take,
            availablePages,
            data: pageData
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch expenses" });
    }


    // const expenses = await returnParsedData(__dirname + '/expenses.json')
    // res.json(expenses);
});
app.post("/expenses",async (req,res)=>{
    const {price,category} = req.body;
    if (!validatePrice(price)) {
        return res.status(400).json({error: "Invalid price"})
    }
    const expenses = await returnParsedData(__dirname + '/expenses.json');
    let id = Math.floor(Math.random() * 1000);
    while (expenses.find(expense => expense.id === id)) {
        id++;
    };
    const newExpense = {
        id: id,
        category,
        price : Number(price),
        createdAt: new Date().toISOString(),
    };
    console.log(newExpense);
    expenses.push(newExpense);
    console.log(expenses[expenses.length - 1]);
    writedData(__dirname + '/expenses.json', expenses);
    res.status(201).send("Product added successfully");
});


app.put("/expenses", async (req,res)=>{

    const {id,category,price} = req.body;

    if (!category && !price) {
        return res.status(400).json({error: "no fields to update"});
    }

    if (price && !validatePrice(price)) {
        return res.status(400).json({error: "Invalid price field"});
    }

    const expenses = await returnParsedData(__dirname + '/expenses.json');
    const expenseIndex = expenses.findIndex(expense => expense.id === Number(id));

    if (expenseIndex === -1) {
        return res.status(404).json({error: "Expense not found"});
    }
    const expense = expenses[expenseIndex];
    const newExpense = {
        ...expense,
        category: category || expense.category,
        price: price ? Number(price) : expense.price,
    };
    expenses[expenseIndex] = newExpense;
    writedData(__dirname + '/expenses.json', expenses);
    res.status(200).send("Expense updated successfully");
});




app.delete("/expenses", async (req,res)=>{
    const expenses = await returnParsedData(__dirname + '/expenses.json');
    if (!req.headers.secret || req.headers.secret !== "random123") {
        return res.status(403).json({error: "Forbidden, invalid secret header"});
    }
    const expenseId = req.body.id;
    if (!expenseId) {
        return res.status(400).json({error: "Expense id is required"});
    }
    const expenseIndex = expenses.findIndex(expense => expense.id === Number(expenseId));
    if (expenseIndex !== -1) {
        const deletedExpense = expenses.splice(expenseIndex, 1);
       writedData(__dirname + '/expenses.json', expenses);
        return res.status(200).json({message: "Expense deleted successfully", deletedExpense});
    } else {
        return res.status(404).json({error: `Expense with id ${expenseId} not found`});
    }
});




app.listen(3000,()=>{
    console.log("Server started on http://localhost:3000");
});
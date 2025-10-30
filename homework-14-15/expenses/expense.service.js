const { returnParsedData, writedData,validatePrice } = require("../utils.js");
const path = require('path');


exports.getExpenses = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const take = parseInt(req.query.take) || 10;
        
        const expenses = await returnParsedData(path.join(__dirname, '..', 'expenses.json'));
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

};

exports.createExpense = async (req,res)=>{
    const {price,category} = req.body;
    const expenses = await returnParsedData(path.join(__dirname, '..', 'expenses.json'));
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
    writedData(path.join(__dirname, '..', 'expenses.json'), expenses);
    res.status(201).send("Product added successfully");
};

exports.updateExpenses = async (req,res)=>{

        const {id,category,price} = req.body;
     if (!id) {
        return res.status(400).json({ error: "input id, category and price fields to update" });
    }

    if (!category && !price) {
        return res.status(400).json({error: "no fields to update"});
    }

    if (price && !validatePrice(price)) {
        return res.status(400).json({error: "Invalid price field"});
    }

    const expenses = await returnParsedData(path.join(__dirname, '..', 'expenses.json'));
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
    writedData(path.join(__dirname, '..', 'expenses.json'), expenses);
    res.status(200).send("Expense updated successfully");
};

exports.deleteExpenses = async (req,res)=>{
    const expenses = await returnParsedData(path.join(__dirname, '..', 'expenses.json'));
    
    const expenseId = req.body?.id;
    if (!expenseId) {
        return res.status(400).json({error: "Expense id is required"});
    }
    const expenseIndex = expenses.findIndex(expense => expense.id === Number(expenseId));
    if (expenseIndex !== -1) {
        const deletedExpense = expenses.splice(expenseIndex, 1);
       writedData(path.join(__dirname, '..', 'expenses.json'), expenses);
        return res.status(200).json({message: "Expense deleted successfully", deletedExpense});
    } else {
        return res.status(404).json({error: `Expense with id ${expenseId} not found`});
    }
};

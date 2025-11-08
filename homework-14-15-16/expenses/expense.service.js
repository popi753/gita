const { returnParsedData, writedData,validatePrice } = require("../utils.js");
const path = require('path');
const expenseModel = require("./expense.model.js")

// 4) დაამატეთ ახალი ენდფოინტთი /expenses/top-5 რომელიც დაგიბრუნებთ 5 ყველაზე ძვირ ხარჯს
exports.getTopExpenses = async (req,res)=>{
   try {
        const expenses = await expenseModel.find({}).sort({price: -1});
        res.status(200).json({data: expenses.slice(0,5)});
   } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update expense" });
   }
};

// 5) დაამატეთ ფილტრის ფუნციონალი მაგალითად თუ დავწერ ხარჯების წამოღებისას /expenses?category=shopping,gym,food&amountFrom=200&amountTo=500 უნდა დააბრუნოს ყველა ის ხარჯიz რომელიც არის 200დან 500ლარამდე პლუს რომელთა კატეგორია არის შოპინგი, ვარჯიში და საკვები
exports.getExpenses = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const reqTake = parseInt(req.query.take) || 10 
        const take = reqTake > 10 ? 10 : reqTake;

        const category = (req.query.category || "").split(",") || [];
        const from = req.query.amountFrom ? Number(req.query.amountFrom) : 0; 
        const to = req.query.amountTo ? Number(req.query.amountTo) : Infinity;

        const query = {};

        if (category.length) {
            query.category = { $in: category };
        };

        const priceFilter = {};
        if (!Number.isNaN(from)) {
                priceFilter.$gte = from
             };

        if (!Number.isNaN(to)) {
                priceFilter.$lte = to
             };

        if (Object.keys(priceFilter).length) {
                query.price = priceFilter
             };

        const total = await expenseModel.countDocuments(query);

        const expenses = await expenseModel.find(query)
                                           .skip((page - 1) * take)
                                           .limit(take);

        const totalPages = Math.ceil(total / take);

        return res.status(200).json({
            meta: {
                page,
                perPage: take,
                total,
                totalPages
            },
            data: expenses
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch expenses" });
    };

};

exports.createExpense = async (req,res)=>{
    try {
        const {price,category} = req.body;
        const expense = {
            category,
            price : Number(price),
        };
        console.log(expense);
        const newExpense = await expenseModel.create(expense);
        res.status(201).json({ success: true, data: newExpense});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update expense" });
    }
    };

exports.updateExpenses = async (req,res)=>{
    try {
        const { id, category, price } = req.body;

        const updatedExpense = await expenseModel.findByIdAndUpdate(
            id,
            { category, price}
        );

        if (!updatedExpense) {
            return res.status(404).json({ error: `Expense with id ${id} not found` });
        }

        res.status(200).json({ success: true, data: updatedExpense });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update expense" });
    }
};

exports.deleteExpenses = async (req,res)=>{
    try {
        const deletedExpense = await expenseModel.findByIdAndDelete(req.body.id);
         if (!deletedExpense) {
            return res.status(404).json({ error: `Expense with id ${id} not found` });
        }

        res.status(200).json({ success: true, data: deletedExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete expense" });
    }

};

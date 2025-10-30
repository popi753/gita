const {Router} = require("express");
const expenseRouter = Router();
const deleteMiddleware = require("../middlewares/delete.middleware.js");
const createMiddleware = require("../middlewares/create.middleware.js");


const expenseService = require("./expense.service.js");

expenseRouter.get("/", expenseService.getExpenses);

expenseRouter.post("/", createMiddleware, expenseService.createExpense);

expenseRouter.put("/", expenseService.updateExpenses);

expenseRouter.delete("/", deleteMiddleware, expenseService.deleteExpenses);

module.exports = expenseRouter;
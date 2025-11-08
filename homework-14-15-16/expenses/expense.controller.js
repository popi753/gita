const {Router} = require("express");
const expenseRouter = Router();
const deleteMiddleware = require("../middlewares/delete.middleware.js");
const createMiddleware = require("../middlewares/create.middleware.js");
const updateMiddleware = require("../middlewares/update.middleware.js");

const checkIDMiddleware = require("../middlewares/checkID.middleware.js");



const expenseService = require("./expense.service.js");

expenseRouter.get("/top-5", expenseService.getTopExpenses);

expenseRouter.get("/", expenseService.getExpenses);

expenseRouter.post("/", createMiddleware, expenseService.createExpense);

expenseRouter.put("/", updateMiddleware, checkIDMiddleware, expenseService.updateExpenses);

expenseRouter.delete("/", deleteMiddleware,checkIDMiddleware, expenseService.deleteExpenses);

module.exports = expenseRouter;
const fs = require('fs/promises');
const chalk = require('chalk');

module.exports.returnExpense = async function (dirName) {
    const data = await fs.readFile(dirName, 'utf-8');
    const expenses = await JSON.parse(data);
    const expense = expenses.find((expense) => {
            return (expense.id === Number(expenseId));
    });

    return expense;

}

module.exports.returnParsedData = async function (dirName) {
    const data = await fs.readFile(dirName, 'utf-8');
    const expenses = await JSON.parse(data);
    return expenses;
}

module.exports.writedData = async function (dirName,data) {
    await fs.writeFile(dirName, JSON.stringify(data));
}

module.exports.validatePrice = function (price) {

    if (isNaN(Number(price)) || Number(price) < 0) {
        console.log(chalk.yellow('Price should be a number and greater than 0'));
        return false;
    }
    return true;
}


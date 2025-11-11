const {returnParsedData,writedData} = require("./utils")

module.exports.returnFilteredData = async function (dirName,category) {
    const expenses = await returnParsedData(dirName)
    const filteredExpenses = expenses.filter((expense) => {
            return expense.category === category;
    });

    return filteredExpenses;
}

module.exports.returnExpenseById = async function (dirName,id) {

    const expenses = await returnParsedData(dirName)
    const filteredExpenses = expenses.filter((expense) => {
            return (expense.id === Number(id));
    });

    return filteredExpenses;
}

module.exports.createExpense = async function (dirName,{category,price}) {
        const expenses = await returnParsedData(dirName)
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
        expenses.push(newExpense);
        writedData(dirName, expenses);
        return id;
}

module.exports.editExpense = async function (dirName,id,price,category) {
        const expenses = await returnParsedData(dirName)

        const changedExpenses = expenses.map((expense) => {
                if(expense.id === Number(id)){
                return{
                                id : Number(id),
                                price,
                                category
                        }
                };
                return expense;
        });

    await writedData(dirName, changedExpenses);
    return id;
}

module.exports.deleteExpense = async function (dirName,id) {
    const expenses = await returnParsedData(dirName);

    const filteredExpenses = expenses.filter((expense) => {
            return expense.id !== Number(id);
    });

    await writedData(dirName, filteredExpenses);

    return true;
}
#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { Command } from 'commander'
import chalk from 'chalk';
import fs from 'fs/promises'

import { returnParsedData, validatePrice } from './expense-helper.js';
import { availableMemory } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command()

program
    .name('Expense Cli')
    .description('Info about CLI')
    .version('1.0.0')

program
    .command('show')
    .description('Show all expenses')
    .option('-c --category <category>', 'Filter by category')
    .option('--asc', 'Sort by date ascending')
    .option('--desc', 'Sort by date descending')
    .option('-p --page <page>', 'Page number for pagination', '1')
    .action(async (options) => {
        if (options.asc && options.desc) {
            console.log(chalk.blue('Please provide only one sorting option: --asc or --desc'));
            return;
        }

        let expenses = await returnParsedData(__dirname + '/expense.json');

        if (options.category) {
            expenses = expenses.filter(expense => expense.category === options.category);
        }
        if (!expenses.length) {
            console.log(chalk.yellow('No expenses found with the given category.'));
            return;
        }

        if (options.asc) {
            expenses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (options.desc) {
            expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        if (options.page) {
            const perPage = 10;
            const availablePages = Math.ceil(expenses.length / perPage);
            if (availablePages < Number(options.page)) {
                console.log(chalk.yellow(`Pagination is available only for ${availablePages} expenses`));
                return;
            }else{
                console.log({
                    currentPage : Number(options.page),
                    maxPerPage : perPage,
                    availablePages,
                    expenses : expenses.slice((Number(options.page) - 1) * perPage, Number(options.page) * perPage),
                })
                return;
            }
        }

        console.log(expenses);
});

program
    .command('getById')
    .description('Get expense by id')
    .argument('<expenseId>')
    .action(async (expenseId) => {
        try {
            const expenses = await returnParsedData(__dirname + '/expense.json');
            const expense = expenses.find(expense => expense.id === Number(expenseId));
            if (expense) {
                console.log(expense)
            }else{
                console.log(chalk.red(`Expense with id ${expenseId} not found`))
            }    
        } catch (error) {
            console.log(chalk.red('Error getting expense:', error));
        }
        
});

program
    .command('search')
    .description('Search expenses by date')
    .option('-p --page <page>', 'Page number for pagination', '1')
    .argument('<expenseDate>')
    .action(async (expenseDate, options) => {
        try {
             const expenses = await returnParsedData(__dirname + '/expense.json');
             const filteredExpenses = expenses.filter(expense => {
             return expense.createdAt.split('T')[0] === expenseDate;
            });
            if (filteredExpenses.length) {
                if (options.page) {
                    const perPage = 10;
                    const availablePages = Math.ceil(filteredExpenses.length / perPage);

                    if (availablePages < Number(options.page)) {
                        console.log(chalk.yellow(`Pagination is available only for ${availablePages} expenses`));
                        return;
                    }else{
                        console.log({
                            currentPage : Number(options.page),
                            maxPerPage : perPage,
                            availablePages,
                            expenses : filteredExpenses.slice((Number(options.page) - 1) * perPage, Number(options.page) * perPage),
                        })
                        return;
                    }
                }
                    console.log(filteredExpenses);
                }else{
                    console.log(chalk.yellow(`No expenses found for date ${expenseDate}`))
                }
        } catch (error) {
            console.log(chalk.red('Error searching expenses:', error));
        }
       
});

program
    .command('add')
    .description('Add new expense')
    .argument('<category>')
    .argument('<price>')
    .action(async (category, price) => {
        try {
            if (!validatePrice(price)) {
                return;
            }
            const expenses = await returnParsedData(__dirname + '/expense.json');
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
            await fs.writeFile('expense.json', JSON.stringify(expenses));
            console.log(chalk.green("expense added successfuly") + "\n", newExpense);
        
        } catch (error) {
            console.log(chalk.red('Error adding expense:', error));            
        }
        });

program
    .command('delete')
    .description('Delete expense by id')
    .argument('<expenseId>')
    .action(async (expenseId) => {
        try {
            const expenses = await returnParsedData(__dirname + '/expense.json');
            const expenseIndex = expenses.findIndex(expense => expense.id === Number(expenseId));
            if (expenseIndex !== -1) {
                const deletedExpense = expenses.splice(expenseIndex, 1);
                await fs.writeFile('expense.json', JSON.stringify(expenses));
                console.log(chalk.green("expense deleted successfuly") + "\n", deletedExpense);
            } else {
                console.log(chalk.yellow(`Expense with id ${expenseId} not found`));
            }
        } catch (error) {
            console.log(chalk.red('Error deleting expense:', error));
        }
});


program
    .command('update')
    .description('Update expense by id')
    .argument('<expenseId>')
    .option('-c --category <category>')
    .option('-p --price <price>')
    .action(async (expenseId, options) => {
        try {
            if (!options.hasOwnProperty("category") && !options.hasOwnProperty("price")) {
                console.log(chalk.yellow(`Please provide at least one field to update (-c <category> or -p <price>).`));
                return;
            }
            if (options.hasOwnProperty("price") && !validatePrice(options.price)) {
                return;
            }
            const expenses = await returnParsedData(__dirname + '/expense.json');
            const expenseIndex = expenses.findIndex(expense => expense.id === Number(expenseId));

            if (expenseIndex === -1) {
                console.log(chalk.yellow(`Expense with id ${expenseId} not found`));
                return;
            }
            const expense = expenses[expenseIndex];
            const newExpense = {
                ...expense,
                category: options.category || expense.category,
                price: options.price ? Number(options.price) : expense.price,
            };
            expenses[expenseIndex] = newExpense;
            await fs.writeFile('expense.json', JSON.stringify(expenses));
            console.log(chalk.green("expense updated successfuly") + "\n", newExpense);
        } catch (error) {
            console.log(chalk.red('Error updating expense:', error));
        }
        
    });



program.parse();




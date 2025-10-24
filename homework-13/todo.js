#!/usr/bin/env node
import { Command } from 'commander'
import fs from 'fs/promises'

// 1) დაწერეთ todo-cli ხელსაწყო ქომანდერის გამოყენებით რომელსაც ექნება შემდეგი ფუნცქიონალი: 
// todo-cli show => დააბრუნებს ყველა თუდუს ობიექტს
// todo-cli add todoName => დაგიბრუნებთ ახალ შექმნილ თუდუს
// todo-cli delete todoId => დაგიბრუნებთ წაშლილ თუდუს
// todo-cli todoId --name todoName => დაგიბრუნებთ განახლებულ თუდუს.
// თუდუს ობიექტს უნდა გამოიყურებოდეს: {id: 1, title: "ReadBook", isDone: false}
// შეგიძლიათ დაამატოთ სხვადასხვა ფროფერთიები, გაითვალისიწნეთ განახლება უნდა მოხდეს option მეთოდით.


const program = new Command()

program
    .name('Todo Cli')
    .description('Info about CLI')
    .version('1.0.0')

program
    .command('show')
    .action(async () => {
        const data = await fs.readFile('todo.json', 'utf-8');
        const todos = await JSON.parse(data);

        console.log(todos)
})

program
    .command('add')
    .argument('<todoName>')
    .argument('<isDone>')
    .action(async (todoName, isDone) => {
        const data = await fs.readFile('todo.json', 'utf-8');
        const todos = await JSON.parse(data);
        let id = Math.floor(Math.random() * 1000);
        while (todos.find(todo => todo.id === id)) {
            id++;
        };
        const newTodo = {
            id: id,
            title: todoName,
            isDone: isDone === 'true' ? true : false
        };
        todos.push(newTodo);
        await fs.writeFile('todo.json', JSON.stringify(todos));
        console.log(newTodo);
});

program
    .command('delete')
    .argument('<todoId>')
    .action(async (todoId) => {
        const data = await fs.readFile('todo.json', 'utf-8');
        const todos = await JSON.parse(data);
        const todoIndex = todos.findIndex(todo => todo.id === Number(todoId));
        if (todoIndex !== -1) {
            const deletedTodo = todos.splice(todoIndex, 1);
            await fs.writeFile('todo.json', JSON.stringify(todos));
            console.log(deletedTodo);
        } else {
            console.log(`Todo with id ${todoId} not found`);
        }
});





program
    .command('change')
    .argument('<todoId>')
    .option('-n --name <name>')
    .action(async (todoId, options) => {
        const data = await fs.readFile('todo.json', 'utf-8');
        const todos = await JSON.parse(data);
        const todoIndex = todos.findIndex(todo => todo.id === Number(todoId));

        const todo = todos.splice(todoIndex, 1)[0];

        if (todoIndex === -1) {
            console.log(`Todo with id ${todoId} not found`);
            return;
        }

        const newTodo = {
            ...todo,
            title: options.name || todo.title,
        };
        console.log(todos);
        todos.push(newTodo);
        await fs.writeFile('todo.json', JSON.stringify(todos));
        console.log(newTodo);
    });



program.parse();




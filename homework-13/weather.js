#!/usr/bin/env node
import { Command } from 'commander'
import chalk from 'chalk';
// 2) გააკეთეთ weather-cli ხელსაწყო რომელსაც ექნება შემდეგი ფუნქციონალი:
// weather-cli tbilisi => დაგიბრუნებთ თბილისში რა ამინდია იმას, თუ ისეთ ქალაქს ჩაწერთ რაც არ იძებნება დააბრუნეთ შესაბამისი ერორი. 
// ამინდის ინფორმაცია უნდა წამოიღოთ შემდეგი ეიპიაიდან: https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c
// cityName ის ნაცვლად უნდა გამოიყენოთ არგუმენტად მიღებული ქალაქის სახელი და გამოაჩინოთ შესაბამისი მონაცემები.



const program = new Command()

program
    .name('Weather Cli')
    .description('Info about CLI')
    .version('1.0.0')

program
    .option('-c --cityname <cityname>')
    .action(async (options) => {
        if (!options.hasOwnProperty("cityname") || !options.cityname) {
            console.error(chalk.red('Error:'), 'City name is required');
            return;
        };

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${options.cityname}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const weatherData = await response.json();
            console.log(chalk.green('City:'), weatherData["name"]+" ", chalk.green('Weather:'), weatherData["weather"][0]["description"]);
        } catch (error) {
            console.error(chalk.red('Error:'), 'something went wrong');
        }

       
    });



program.parse();

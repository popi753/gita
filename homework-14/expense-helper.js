import fs from 'fs/promises';
import chalk from 'chalk';

export async function returnParsedData(dirName) {
    const data = await fs.readFile(dirName, 'utf-8');
    const expenses = await JSON.parse(data);
    return expenses;
}

export function validatePrice(price) {
    if (Number(price) < 10) {
        console.log(chalk.yellow('Price should be at least 10'));
        return false;
    }
    return true;
}
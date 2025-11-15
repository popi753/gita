// გადავწეროთ მოცემული ფაილი typescript_ზე.
type rectangleType = {
    width: number;
    height: number;
}

function calculateRectangleArea(rectangle:rectangleType) : number {
  return rectangle.width * rectangle.height;
}

function calculateRectanglePerimeter(rectangle:rectangleType) : number {
  return 2 * (rectangle.width + rectangle.height);
}

type circleType = {
    radius: number;
}

function calculateCircleArea(circle:circleType) : number {
  return Math.PI * Math.pow(circle.radius, 2);
}

function calculateCirclePerimeter(circle:circleType) : number {
  return 2 * Math.PI * circle.radius;
}

// Independent Functions

function addNumbers(a:number, b:number) : number {
  return a + b;
}

function multiplyNumbers(a:number, b:number) : number {
  return a * b;
}

function capitalizeString(str:string) : string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function filterEvenNumbers(numbers:number[]) : number[] {
  return numbers.filter((num) => num % 2 === 0);
}

function findMax(numbers:number[]) : number {
  return Math.max(...numbers);
}

function isPalindrome(str:string) : boolean {
  const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const reversedStr = cleanStr.split("").reverse().join("");
  return cleanStr === reversedStr;
}

function calculateFactorial(n:number) : number {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * calculateFactorial(n - 1);
  }
}

// Test Cases

// სასურველია გავაკეთოთ Rectangle და Circle კლაზები და დავუმატოთ შესაბამისი მეთოდები.

const rectangle : rectangleType = { width: 5, height: 8 };
const circle : circleType = { radius: 3 };

const rectangleArea = calculateRectangleArea(rectangle);
const rectanglePerimeter = calculateRectanglePerimeter(rectangle);

const circleArea = calculateCircleArea(circle);
const circlePerimeter = calculateCirclePerimeter(circle);

console.log(
  `Rectangle Area: ${rectangleArea}, Perimeter: ${rectanglePerimeter}`
);
console.log(`Circle Area: ${circleArea}, Perimeter: ${circlePerimeter}`);

const sumResult = addNumbers(5, 3);
const multiplicationResult = multiplyNumbers(4, 7);
const capitalizedString = capitalizeString("javascript is fun");
const evenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(`Sum: ${sumResult}`);
console.log(`Multiplication: ${multiplicationResult}`);
console.log(`Capitalized String: ${capitalizedString}`);
console.log(`Even Numbers: ${evenNumbers}`);

const maxNumber = findMax([23, 56, 12, 89, 43]);
const isPalindromeResult = isPalindrome("A man, a plan, a canal, Panama");
const factorialResult = calculateFactorial(5);

console.log(`Max Number: ${maxNumber}`);
console.log(`Is Palindrome: ${isPalindromeResult}`);
console.log(`Factorial: ${factorialResult}`);

/* 

2. შევქმნათ კლასი BankAccount რომელსაც ექნება accountNumber,balance და transactionHistory ფროფერთები.
   კონსტრუქტორში უნდა ვიღებდეთ accountNumber და initialBalance მნიშვნელობებს.
   გარედან არუნდა იყოს შესაძლებელი accountNumber, balance და transactionHistory შეცვლა.
   კლასში უნდა გვქონდეს მეთოდები:
   getAccountInfo
   deposit - თანხის დამატება ანგარიშზე.
   withdraw - თანხის მოკლება ანგარიშიდან.
   transferFunds - გადარიცხვა სხვა BankAccount_ზე
   getTransactionHistory - აბრუნებს transactionHistory_ მასივს
   recordTransaction - transactionHistory_ში ამატებს ჩნაწერს ტრანსფერის შესახებ

   შევქმნათ მინიმუმ 2 BankAccount_ის ინსტანსი.
   გავაკეთოთ სხვადასხვა ოპერაციები.
   დავბეჯდოთ შექმნილი ექაუნთების transactionHistory.

*/
type transaction = {
  amount: number;
  type: "withdraw" | "deposit" | "transfer";
  date: Date;
  targetAccount?: string;
}

class BankAccount {
  protected accountNumber: string;
  protected balance: number;
  protected transactionHistory: transaction[];

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.transactionHistory = [];
  }

  getAccountInfo(): string {
    return `Account Number: ${this.accountNumber}, Balance: ${this.balance}`;
  }

  deposit(amount: number): void {
    this.balance += amount;
    this.recordTransaction({amount,type : "deposit",date : new Date()});
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
      this.recordTransaction({amount,type : "withdraw",date : new Date()});
    } else {
      console.log("Not enough balance");
    }
  }

  transferFunds(amount: number, targetAccount: string): void {
    if (amount <= this.balance) {
      this.balance -= amount;
      this.recordTransaction({amount,type : "transfer",date : new Date(),targetAccount});
    } else {
      console.log("Insufficient funds for transfer");
    }
  }

  getTransactionHistory(): transaction[] {
    return this.transactionHistory;
  }

  recordTransaction(transaction: transaction): void {
    this.transactionHistory.push(transaction);
  }
}

const account1 = new BankAccount("firstAcc", 1000);
account1.deposit(500);
account1.withdraw(200);
account1.transferFunds(300, "secondAcc");
console.log(account1.getAccountInfo());
console.log(account1.getTransactionHistory());


const account2 = new BankAccount("secondAcc", 500);
account2.deposit(5000);
account2.withdraw(1000);
account2.transferFunds(30000, "secondAcc");
account2.transferFunds(500, "secondAcc");
console.log(account2.getAccountInfo());
console.log(account2.getTransactionHistory());

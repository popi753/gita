// 1) წაშალეთ მასივის თითოეულ ელემენტს წაუშლის ბოლო სიმბოლოს მაგ: ["one","two","three"] => ["on","tw","thre"]

function deleteLastChar(arr) {
    if (!Array.isArray(arr)) {
            console.log("wrong input");
    };
    return arr.map(item => item.slice(0, -1));
}

// console.log(deleteLastChar(["one","two","three"]));


// 2) იპოვეთ მასივში 2 ყველაზე პატარა ელემენტის ჯამი, მაგ: [19,5,42,2,77] => 7 

function sumOfTwoSmallest(arr) {
    if (!Array.isArray(arr)) {
            console.log("wrong input");
    };
    let sortedArr = arr.sort((a, b) => a - b);
    return sortedArr[0] + sortedArr[1];
}

// console.log(sumOfTwoSmallest([19,5,42,2,77]));

// 3) დააჯგუფეთ მოცემული მასივი ვალუტის მიხედვით, გაითვალისწინეთ თითეუილ ვალუტის ქვეშ უნდა შეინახოთ ტრანსაქციის მნიშვნელობა. მაგ: 
// [
//   { amount: 10, currency: "USD" },
//   { amount: 20, currency: "EUR" },
//   { amount: 5,  currency: "USD" },
//   { amount: 50, currency: "EUR" }
// ]
// შედეგ: {
//   USD: [{ amount: 10 }, { amount: 5 }],
//   EUR: [{ amount: 20 }, { amount: 50 }]
// }

function groupByCurrency(arr) {
    if (!Array.isArray(arr)) {
        console.log("wrong input");
    };
    let result = {};
    arr.forEach(item => {
        if (!result[item.currency]) {
            result[item.currency] = [];
        }
        result[item.currency].push({ amount: item.amount });
    });
    return result;
}


// console.log(groupByCurrency([
//    { amount: 10, currency: "USD" },
//    { amount: 20, currency: "EUR" },
//    { amount: 5,  currency: "USD" },
//    { amount: 50, currency: "EUR" }
//  ]))



// 4) დაითვალეთ დადებითი რიცხვები და დააჯამეთ უარყოფითი რიცხვები პასუხი უნდა იყოს მასივი [10, -65]

function sumPositivesAndNegatives(arr) {
    if (!Array.isArray(arr)) {
        console.log("wrong input");
    };
    let positiveSum = 0;
    let negativeSum = 0;
    arr.forEach(item => {
        if (item > 0) {
            positiveSum += item;
        } else if (item < 0) {
            negativeSum += item;
        }});
    return [positiveSum, negativeSum];
};

// console.log(sumPositivesAndNegatives([10, -65, 10, -6510, -65,102,-5]));

// 5) გამოთვალეთ მასივის რიცხვების ჯამი ForEach ის გამოყენებით მაგ: [10, 12, 4, 2] => 28

function sumOfArray(arr) {
    if (!Array.isArray(arr)) {
        console.log("wrong input");
    };
    let sum = 0;
    arr.forEach(item => {
        sum += item;
    });
    return sum;
};

// console.log(sumOfArray([10, 12, 4, 2]));

// 6) დაამუშავეთ მასივი რომ დააბრუნოს სტინგი მხოლოდ იმ ელემენტებით რომლის სიგრძე არის 5-ზე მეტი და შეაწებეთ #-ით მაგ: ["cat","parrot","dog","elephant"] => "PARROT#ELEPHANT"

function filterAndTransform(arr) {
    if (!Array.isArray(arr)) {
        console.log("wrong input");
    };
    let result = arr.filter(item => item.length > 5).map(item => item.toUpperCase());
    return result.join("#");
};

// console.log(filterAndTransform(["cat","parrot","dog","elephant"]));

// 7) დააჯგუფეთ მასივი კლასის მიხედვით და გამოითვალეთ საშუალო ქულა, მაგ: 
// [
//   { name: "Ann",  cls: "A", grade: 90 },
//   { name: "Ben",  cls: "B", grade: 75 },
//   { name: "Cara", cls: "A", grade: 80 }
// ]
// შედეგი: {"A": 85, "B" 75}


function averageGradeByClass(arr) {
    if (!Array.isArray(arr)) {
        console.log("wrong input");
    };
    let classTotals = {};
    let classCounts = {};
    arr.forEach(item => {
        if (!classTotals[item.cls]) {
            classTotals[item.cls] = 0;
            classCounts[item.cls] = 0;
        }
        classTotals[item.cls] += item.grade;
        classCounts[item.cls]++;
    });
    let averages = {};
    for (let cls in classTotals) {
        averages[cls] = classTotals[cls] / classCounts[cls];
    };
    return averages;
};


// console.log(averageGradeByClass([
//     { name: "Ann",  cls: "A", grade: 90 },
//     { name: "Ben",  cls: "B", grade: 75 },
//     { name: "Cara", cls: "A", grade: 80 }
//   ]));


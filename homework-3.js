// 1) დაწერეთ ფუნცქცია რომელიც მიიღებს მასივს არგუმენტად და დააბრუნებს ამ მასივის საშუალო არითმეტიკულს.
function average(arr) {
    if(typeof arr !== "object"){
        return "wrong input";
    };
    let length = 0;
    const result = arr.reduce((total, item) =>{
        if (typeof item == "number") {
            length++;
            return total + item
        }}, 0);
    return result/length;
};

// console.log(average([1,2,3,4]));

// 2) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვის შებრუნებულ მასივს თითოეული წევრით. მაგ: 35231 → [1,3,2,5,3]. 0 => [0]

function reverseArr(number) {
    if (typeof number !== "number") {
        return "wrong input";
    };
    let string = number.toString();
    let arr = string.split("").reverse().map((item)=>{return parseInt(item)});
    return arr;
};

// console.log(reverseArr(35231));

// 3) დაწერეთ ფუნქცია რომელიც მიიღებს 2 მასივს არგუმენტად და დააბრუნებს მასივის მხოლოდ იმ წევრებს რომელსაც მეორე მასივი არ შეიცავს მაგ: a = [1, 2] და b = [1] დააბრუნეთ [2]. a = [1, 2, 2, 2, 3] და b = [2] დააბრუნეთ [1, 3].

function uniqueItems(arr1,arr2) {
    if(typeof arr1 !== "object" || typeof arr2 !== "object"){
            return "wromg input";
    };
    const result = arr1.filter(item=>{return !arr2.includes(item)});
    return result;
};

// console.log(uniqueItems([1, 2, 2, 2, 3],[2]));

// 4) დაწერეთ ფუნცქცია რომელსაც გადმოეცემა მასივი და იპოვე მასივში მეორე ყველაზე დიდი რიცხვი. მაგ: [10, 40, 20, 5, 30] => 30

function secondBiggestInt(arr) {
    if (typeof arr !== "object") {
        return "wrong input";
    };
    let biggestInt = Math.max(...arr);
    let result = 0;
    arr.map((item)=>{ if (item > result) {
            if (item === biggestInt) {
                return;
            };
            result = item;
    }});
    return result;
};

// console.log(secondBiggestInt([10, 405, 255, 5, 30]));


// 5) დაწერეთ ფუნცქია რომელიც მიიღებს სტირნგების მასივს და უნდა დააბრუნოტ მხოლოდ იმ სიტყვების მასივი რომლებიც არის პალინდორმი: 
// * პალინდორმი ეწოდება სიტყვას რომელიც შემობრუნების შემდეგ იგივე მნიშვნელობას ინარჩუნებს. 
// მაგ: ["mom", "car", "level", "dog"] => ["mom", "level"]

function palindroms(arr) {
    if (typeof arr !== "object") {
        return "wrong input";
    };
    const result = arr.filter((item)=>{return item === item.split("").reverse().join("")});
    return result;
};

// console.log(palindroms(["mom", "car", "level", "dog"]));


// 6)დაწერეთ ფუნცქია რომელიც მიიღებს რიცხვების მასივს და დააბრუნებთ რომელია ყველაზე ხშირად გამეორებადი რიცხვი მაგ: [4, 5, 6, 5, 4, 5] => 5

function mostFrequent(arr) {
    if (typeof arr !== "object") {
        return "wrong input";
    };
    let counts = {};
    let maxCount = 0;
    let mostFrequentNum;

    arr.forEach(num => {
        counts[num] = (counts[num] || 0) + 1;
        if (counts[num] > maxCount) {
            maxCount = counts[num];
            mostFrequentNum = num;
        }
    });

    console.log(counts)
    return mostFrequentNum;
};

// console.log(mostFrequent([4, 4, 4, 5, 5, 5, 5, 7]));
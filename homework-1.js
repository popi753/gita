// 1) დაწერეთ ფუნცქია რომელიც გადააკონვერტირებს ცელსიუს ფარენჰეიტში და დააბრუნებს პასუხს.
function converter(celsius) {
    if (typeof celsius !== "number") {
        return "wrong input";
    };
    let fahrenheit = celsius * 1.8 + 32;
    return fahrenheit;
};

// console.log(converter(35));

// 2) დაწერე თუნცქია რომელიც მიიღებს სტრინგს არგუმენტად და დააბრუნებს ამ სრინგის შებრუნებულს(reverse).

function reverseStr(string) {
    if (typeof string !== "string") {
        return "wrong input";
    };
    let arr = string.split("");
    arr = arr.reverse();
    return arr.join("");
};

// console.log(reverseStr("hello world"));

// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს წინადადებას და დათვლის რამდენი სიტყვაა შიგნით(ეს ლექციაზე არ გაგვიკეთებია მაგრამ შეგიძლია დასერჩოთ)
function countWords(sentence) {
    if (typeof sentence !== "string") {
        return "wrong input";
    };
    let arr = sentence.split(" ");
    return arr.length;
};

// console.log(countWords("hello world"));

// 4) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სიტყვას და დააბრუნებს რამდენი ხმოვანია ამ სიტყვაში

function countVowelsEng(word) {
    if (typeof word !== "string") {
        return "wrong input";
    };
    let count = 0;
    let vowels = "aeiouAEIOU";
    for (let char of word) {
        if (vowels.includes(char)) {
            count++;
        };
    };
    return count;
};

// console.log(countVowelsEng("hello world"));

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ ამ რიცხვის ფაქტორიალს

function factorial(int) {
    if (typeof int !== "number" || int < 0 || !Number.isInteger(int)) {
        return "wrong input";
    };
    let result = 1;
    for (let i = 1; i <= int; i++) {
        result *= i;
    };
    return result;
};

// console.log(factorial(4));

// 6) დაწერეთ ფუნცქია რომლეიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ 0 დან ამ რიცხვამდე მხოლოდ ლუწი რიცხვების ჯამს

function sumEvenNumbers(int) {
    if (typeof int !== "number" || int < 0) {
        return "wrong input";
    };
    let sum = 0;
    for (let i = 0; i <= int; i++) {
        if (i % 2 === 0) {
            sum += i;
        };
    };
    return sum;
};

// console.log(sumEvenNumbers(6));

// 7) დაწერეთ ფუნცქია რომელიც მიიღებს სტუდენტის ქულას არგუმენტად და დაგირბუნებთ სტუდენტის შეფასებას A,B,C,E,F

function gradeStudent(score) {
    if (typeof score !== "number" || score < 0 || score > 100) {
        return "wrong input";
    };
    let result;
    if (score >= 90) {
        result = "A";
    }
    else if (score >= 80) {
        result = "B";
    }
    else if (score >= 70) {
        result = "C";
    }
    else if (score >= 60) {
        result = "E";
    }
    else {
        result = "F";
    };

    return result;
};

// console.log(gradeStudent(85));

// 8) დაწერეთ ფუნცქია რომელიც მიიღებს პაროლს პარამეტრად თქვენი მიზანია შეამოწმოთ თუ არის 8 სიმბოლოზე მეტი შეიცავს რიცხვს და ერთი დიდ ასოს(capital letter)

function checkPass(pass) {
    if (typeof pass !== "string") {
        return "wrong input";
    };
    let hasNumber = /\d/;
    let hasCapital = /[A-Z]/;
    if (pass.length >= 8 && hasNumber.test(pass) && hasCapital.test(pass)) {
        return true;
    } else {
        return false;
    };

};

// console.log(checkPass("Password123"));
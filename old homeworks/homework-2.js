
// 1) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სტრინგს და დააბრუნებს ამ სტირნგის აბრივიატურას მაგალითად getAbbr("John Doe") => "J.D"
function getAbbr(string) {

    let arr = string.split(" ");
    if (typeof string !== "string" || arr.length !== 2) {
        return "wrong input";
    }
    let firstLetter = arr[0].charAt(0);
    let secondLetter = arr[1].charAt(0);

    return `${firstLetter}.${secondLetter}`;

};

// console.log(getAbbr("John Doe"));

// 2) დაწერეთ ფუნცქია რომელიც არგუმენტად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვების ჯამს მაგ: getSumOfDigit(123) => 6 ახსნა 1 + 2 + 3
function getSumOfDigit(int) {
    if (typeof int !== "number" || int < 0 || !Number.isInteger(int)) {
        return "wrong input";
    };
    let arr = int.toString().split("");
    let result = arr.reduce((sum, num) => sum + parseInt(num), 0);
    return result;
};

// console.log(getSumOfDigit(1234));

// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს სტრინგს და წაშლის ამ სტრინგიდან ყველა გამეორებად ასოს. მაგ: removeDuplicates("banana") => "ban"
function removeDuplicates(string) {
    if (typeof string !== "string") {
        return "wrong input";
    };
    let arr = string.split("");
    let result = arr.filter((char, index) => arr.indexOf(char) === index);
    return result.join("");
};

// console.log(removeDuplicates("banana"));

// 4) დაწერეთ ფუნქცია რომელიც წაშლის ყველა სფეისს სტრინგინდან მაგ: removeSpaces("1 2 aab") => "12aab" უნდა გამოიტენოთ for ლუპი
function removeSpaces(string) {
    if (typeof string !== "string") {
        return "wrong input";
    };
    let arr = string.split("");
    let newArr = []
    for (const item of arr) {
        if (item !== " ") {
            newArr.push(item);
        };
    };
    return newArr.join("");
};

// console.log(removeSpaces("1 2 aab"));

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს წინადადებას და შემოაბრუნებს თითოეულ სიტყვას მაგ: reverseEachWord("Hello World") =>  "olleH dlroW"
function reverseEachWord(sentence) {
    if (typeof sentence !== "string") {
        return "wrong input";
    };
    let arr = sentence.split(" ");
    let result = arr.map(word => word.split("").reverse().join(""));
    return result.join(" ");
};

// console.log(reverseEachWord("Hello World"));
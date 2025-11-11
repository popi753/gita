// 1) დაწერეთ ფუნცქია რომელსაც გადაეცემა 2 პარამეტრი, 1 - ობიექტი, 2- ფროფერთი რომელიც გინდათ რომ წაშალოს, ეს ფუნქცია დააბრუნებს ობიექტს რომელშიც წაშლილი იქნება ის ფროფერთი რასაც გადასცემთ.

function deleteProperty(obj,property) {
    if (typeof obj !== "object") {
        return "wrong input";
    };
    if (typeof property == "string") {
        delete obj[property];
    }else if(typeof property == "object"){
        delete obj[Object.keys(property)[0]]
    }
    return obj;
};


// console.log(deleteProperty({ name: "Ana", age: 25 }, "age"));


// 2) მოცემული გაქვთ მასივი  [
//   { name: "Ana", score: 50 },
//   { name: "Nika", score: 80 },
//   { name: "Luka", score: 70 }
// ] თქვენი მიზანია დაწეროთ ფუნცქია რომელიც არგუმენტად მიიღებს ამ მასივს და დააბრუნებს ლიდერბორდს ქულების მიხედვით. შედეგი: [
//   { name: 'Nika', score: 80, rank: 1 },
//   { name: 'Luka', score: 70, rank: 2 },
//   { name: 'Ana',  score: 50, rank: 3 }
// ]

function leaderboard(arr) {
    if (!Array.isArray(arr)) {
        return "wrong input";
    };
    let sortedArr = arr.sort((a, b) => b.score - a.score);
    return sortedArr;
}

// console.log(leaderboard([
//    { name: "Ana", score: 50 },
//    { name: "Nika", score: 80 },
//    { name: "Luka", score: 70 }
//  ]))

// 3) დაწერეთ ფუნცქია რომელიც დააბრუნებს მხოლოდ იმ ობიექტს რომლის სათაურიც ყველაზე გრძელია. მაგ: [
//   { title: "Up", year: 2009 }, { title: "The Lord of the Rings", year: 2001 }
// ] =>   { title: "The Lord of the Rings", year: 2001 }

function findLongestTitle(arr) {
    if (!Array.isArray(arr)) {
        return "wrong input";
    };
    let longestMovie = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].title.length > longestMovie.title.length) {
            longestMovie = arr[i];
        };
    };
    return longestMovie;
};

// console.log(findLongestTitle([
//    { title: "Up", year: 2009 }, { title: "The Lord of the Rings", year: 2001 }
//  ]))


// 4) დაწერეთ ფუნქცია რომელიც გამოითვლის საშუალო ასაკს თითოეულ დეპარტამენტის და დააბრუნებს შესაბამის ობიექტს. მაგ: [
//   { name: "Ana", dept: "HR", age: 25 },
//   { name: "Nika", dept: "IT", age: 30 },
//   { name: "Luka", dept: "IT", age: 22 }
// ]. => { HR: 25, IT: 26 }

function averageAge(arr) {
    if (!Array.isArray(arr)) {
        return "2rong input";
    };
    let ageSum = {};
    let count = {};
    for (const element of arr) {
        ageSum[element.dept] ? ageSum[element.dept] += element.age
        : ageSum[element.dept] = element.age;
        count[element.dept] ? count[element.dept] += 1 : count[element.dept] = 1;
    };
    const result = {};
    for (const key in ageSum) {
        result[key] = ageSum[key] / count[key];
    }

    return result;

}

// console.log(averageAge([
//    { name: "Ana", dept: "HR", age: 25 },
//    { name: "Nika", dept: "IT", age: 30 },
//    { name: "Luka", dept: "IT", age: 22 }
//  ]))


// 5) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს კომენტარების მასივს და დააბრუნებს სიტყვების რაოდენობას მაგ: [
//   { id:1, comment:"Hello world" }, 
//   { id:2, comment:"This is great!" },
//   { id:3, comment:"" }
// ] => 5


function countWords(arr){
    if (!Array.isArray(arr)) {
        return "wrong input";
    };
    let count = 0;
    arr.forEach(item => {
        console.log(item.comment.split(" "));
        count += item.comment.split(" ").map(item=>item.trim()).filter(item=>item).length;
    });
    return count;
};



// console.log(countWords([
//    { id:1, comment:"Hello world" }, 
//    { id:2, comment:"This is great!" },
//    { id:3, comment:"" }
//  ]));


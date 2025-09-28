// 1) რა თანმიმდევრობით დაილოგება შემდეგი ინსტრუქციები: 
// console.log("1");
// setTimeout(() => console.log("2"), 100);
// setTimeout(() => console.log("3"), 0);
// Promise.resolve().then(() => console.log("4"));
// console.log("5");

// 1,5,4,3,2

// 2) რა თანმიმდევრობით დაილოგება შემდეგი ინსტრუქციები: 
// console.log("1");
// setTimeout(() => console.log("2"), 0);
// Promise.resolve().then(() => {
//   console.log("3");
//   setTimeout(() => console.log("4"), 0);
// });
// console.log("5");

// 1,5,3,4,2

// 3) დაწერეთ სლიფ ფუნქცია რომელიც პარამეტრად მიიღებს მილიწამს და დაიძინებს, ანუ სისტემა გაჩერდება პარამეტრის მიხედვით. await sleep(1000) სადაც ამ ფუნცქიას გამოიყენებთ 1 წამი უნდა გაჩერდეს ხოლმე სისტემა, გაითვალისწინეთ await ით უნდა გააჩეროთ ანუ პრომისი უნდა დააბრუნოს ფუნქციამ


function sleep(number){
    if (typeof number !== 'number' || number < 0) {
        console.log('wrong input');
        return;
    };
    return new Promise((resolve) => {
        setTimeout(resolve, number);
    });
};

// sleep(7000).then(() => {
//     console.log('slept');
// })


// 4) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს რიცხვს 1-დან 20-მდე თქვენი მიზანია ფუნცქიის შიგნით ფუნქციამ ყოველ 1 წამში რენდომ რიცხვი დააგენერიროს მანამ სანამ რენდომ დაგენერირებული რიცხვი არ დამეთხვევა პარამეტს, როგორც კი ისინი ერთმანეთს დაემთხვევა გააჩერეთ რენდომ რიცხვის დალოგვა.

function randomMatch(number){
    if (typeof number !== 'number' || number < 1 || number > 20) {
        console.log('wrong input');
        return
    }
    const matchInterval = setInterval(() => {
        let random = Math.floor(Math.random() * 20) + 1;
        console.log(random);
        if(random === number){
            clearInterval(matchInterval);
            console.log('matched');
        }
    }, 1000);

};


//randomMatch(14);


// 5) დაწერეთ ფუნცქია რომელსაც გადაეცემა 2 პარამეტრი 1 - ნებისმიერი რიცხვი 2 - დროის ერთეული მილიწამებში, თქვენი მიზანია დალოგოთ რიცხვები ამ რიცხვიდან 0 მდე იმ დროის ინტერვალში რაც არის მეორე პარამეტრი და 0ზე გააჩეროთ.


function logNumbersToZero(number, interval) {
    if (typeof number !== 'number' || number < 0 || typeof interval !== 'number' || interval < 0) {
        console.log('wrong input');
        return;
    }
    const logInterval = setInterval(() => {
        console.log(number);
        number--;
        if (number === 0) {
            clearInterval(logInterval);
        }
    }, interval);
};


// logNumbersToZero(10, 1000);




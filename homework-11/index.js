// 4) შექმენით ფაილი random.txt შიგნით დაწერეთ რაიმე წინადადება.
//  თქვენი მიზანია დაითვალოთ რამდენი სიტყვა,
//  რამდენი ხმოვანი და რამდენი ასოა ამ ფაილში და ჩაწეროთ შედეგი result.json ში შემდეგი სახით  {word: 20, vowel: 64, chars: 152}


const fs = require('fs');


async function main() {
    const text = await fs.readFileSync("./homework-11/random.txt", "utf8");
    const result = {
        word: 0,
        vowel:0,
        chars:0
    };
    const length = text.length;                                              
    for (let index = 0; index < length; index++) {
        if (text[index] === " ") {
            result.word++;
        }else if ((text[index] === "." || text[index] === "," || text[index] === "!" || text[index] === "?") && text[index + 1] !== " ") {
            result.word++;
        }
        if ("aeiou".includes(text[index].toLowerCase())) {
            result.vowel++;
        }
        if (text[index].match(/[a-zA-Z]/g)) {
            result.chars++;
        }
        
    }
    console.log(result);
};



main();
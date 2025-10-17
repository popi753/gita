// 1) წინასწარ შექმენით შემდეგი ტიპის ფოლდერები: 
// /Task12
//    test/
//        main.txt
//     test2/
//         main.txt
//     main.js
//      second.txt
// და ჩაწერეთ შიგნით რენდომ ტექსტი თითოეულში თქვენი მიზანია დაწეროთ
//  ფუნცქია რომელიც წაიკითხავს რეკურსიულად ყველა .txt გაფარტოების ფაილს
//  და დაგილოგავთ სულ რამდენი სიტყვაა ყველა ფაილში ერთად, პლუს რამდენი, ხმოვანი.

const fs = require('fs/promises');
const path = require("path")

async function main() {
    const result = await checkFolder(__dirname);

    console.log("result : ",result);
};

main();


async function checkFolder(dirPath) {
    
    const result = {
        word  : 0,
        vowel : 0,
    };
    const dir = await fs.readdir(dirPath);
    for (let item of dir) {

        const fullpath = path.join(dirPath,item)

        const stat = await fs.stat(fullpath);

        if (path.extname(fullpath) === ".txt") {
            const temp = await count(fullpath)
            result.word = result.word + temp.word;
            result.vowel = result.vowel + temp.vowel;

        }else if (stat.isDirectory()){
            const temp = await checkFolder(path.join(__dirname,item))
            result.word = result.word + temp.word;
            result.vowel = result.vowel + temp.vowel;
        }
    }

    return result;
}


async function count(path) {
    const text = await fs.readFile(path, "utf8");
    const result = {
        word: 0,
        vowel:0,
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

        
    }
    return result;
};
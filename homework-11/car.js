// 3) შექმენით car.js და cars.json ფაილები.
//  როდესაც გამოიძახებთ ბრძანებას node car.js Ferrari 2020 red უნდა დაამატოთ ეს მანქანის ინფორმაცია cars.json ში.
//  გაითვალისწინეთ თითოეულ დამატებულ ობიექტს უნდა ჰქონდეს, carName, carColor, carReleaseDate.
//  5 ჯერ რო გავუშვა ეს ბრძანება 5 ახალი მანქანა უნდა იყოს დამატებული cars.json ში.
//  როდესაც გამოვიძახებ node car.js show 2020 უნდა გამოაჩინოს მხოლოდ 2020 წლის მანქანები,
//  როცა გამოვიძახებ node car.js show red უნდა გამოაჩინოს მხოლოდ წითელი ფერის მანქანები


const fs = require('fs');



async function main() {
    const[,,firstArg,secondArg,thirdArg] = process.argv;
    try {
        if (firstArg === "show") {
                 const cars = await fs.readFileSync("cars.json", "utf8")
                 const arr = JSON.parse(cars);
                 if (secondArg) {
                     const filtered = arr.filter(item => item.carReleaseDate === secondArg || item.carColor === secondArg);
                     console.log(filtered);
                 } else {
                     console.log(arr);
                 }
        }else{  
                const newCar = {carName : firstArg,
                                carReleaseDate: secondArg,
                                carColor:thirdArg}
                const cars = await fs.readFileSync("cars.json", "utf8")
                const arr = JSON.parse(cars);
                arr.push(newCar);
                await fs.writeFileSync("cars.json", JSON.stringify(arr));
                console.log("car added");
                return;
        }

    } catch (error) {
        console.error(error);
        return;   
    }
};

main();
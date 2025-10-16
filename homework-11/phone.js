// 2) შექმენით phone.js და contacts.json ფაილები,
//  თქვენი მიზანია შექმნათ phone cli თული რომელსაც ქნება
//  დამატება, წაშლა და ყველა კონტაქტის წაკითხვის ფუნცქიონალი.
//  node phone.js add 555151515 nika უნდა დაემატოს ეს ნომერი contacts.json ში.
//  გაითვალისწინეთ დაადოთ ვალიდაცია და თუ ნომერი არსობბს არ დაამატოს იგივე ნომერი.
//  წაშლითაც ნომერს გადასცემთ და ის ნომერი წაშლება contacts.json დან.
//  node phone.js delete 555151515. node phone.js show უნდა გაჩვენოთ ყველა კონტაქტი.

const fs = require('fs');



async function main() {
    const[,,method,number,name] = process.argv;
    try {
        
    
        if (method === "add") {
                const newPhone = {number,name}
                const contacts = await fs.readFileSync("contacts.json", "utf8")
                const arr = JSON.parse(contacts);
                if (arr.find(item=>item["number"] === number.toString())) {
                    console.log("person with this number already exists");
                    return;
                }else{
                    arr.push(newPhone);
                    await fs.writeFileSync("contacts.json", JSON.stringify(arr));
                };
                console.log("contact added");
                return;
        }else if(method === "delete"){
                const contacts = await fs.readFileSync("contacts.json", "utf8")
                const arr = JSON.parse(contacts);
                const index = arr.findIndex(item=> item.number === number);
                if (index === -1) {
                    console.log("contact does not exist")
                    return;
                }else{
                    arr.splice(index,1);
                };
                await fs.writeFileSync("contacts.json", JSON.stringify(arr));
                console.log("The contact is deleted")
                return;

        }else if (method === "show") {
                const contacts = await fs.readFileSync("contacts.json", "utf8")
                const arr = JSON.parse(contacts);
                console.log(arr);
                return;
        }else{
            throw "something went wrong";
        }

    } catch (error) {
        console.error(error);
        return;   
    }
};

main();
// 1) წამოიღეთ ინფომრაცია ამ API-დან  https://jsonplaceholder.typicode.com/users 
// და მირებული შედეგი ჩაწერეთ users.json ში ოღონდ იუზერებს უნდა ქონდეთ მხოლოდ id, name, username და email


const fs = require('fs');

async function main() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) {
            throw response || "something went wrong"
        };
        const result = await response.json()
        const userArr = result.map(user=>{
            return {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
            }
        })
        await fs.writeFileSync("./homework-11/users.json",JSON.stringify(userArr));
    } catch (error) {
        console.error(error)
    }
}


main();
// 1) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს ობიექტების მასივს, დაჯგუფეთ შეკვეთები date-ით და დაითვალეთ დღიური ჯამი.
// ინფუთი: [{date:'2025-01-01',amount:12.5},{date:'2025-01-01',amount:7.5},{date:'2025-01-02',amount:10}]
// აუთფუთი: {'2025-01-01':20,'2025-01-02':10}

const orders = [
    { date: '2025-01-01', amount: 12.5 },
    { date: '2025-01-01', amount: 7.5 },
    { date: '2025-01-02', amount: 10 }
];

function calculateDailyTotal(orders) {
    if (!Array.isArray(orders)) {
        return"wrong input";
    }
    const dailyTotals = {};

    orders.forEach(order => {
        const { date, amount } = order;
        if (dailyTotals[date]) {
            dailyTotals[date] += amount;
        } else {
            dailyTotals[date] = amount;
        }
    });

    return dailyTotals;
};


// console.log(calculateDailyTotal([
//     { date: '2025-01-01', amount: 12.5 },
//     { date: '2025-01-01', amount: 7.5 },
//     { date: '2025-01-02', amount: 10 }])
// );


// 2) პროდუქტები დაჯგუფეთ vendor-ით და იპოვეთ საშუალო price.
// ინფუთი: [{vendor:'A',price:10},{vendor:'A',price:20},{vendor:'B',price:15}]
// აუთფუთი: {A:15, B:15}

function sortByVendor(arr) {
    if (!Array.isArray(arr)) {
        return "wrong input";
    };

    const averages = {};

    arr.forEach(item => {
        const { vendor, price } = item;
        if (averages[vendor]) {
            averages[vendor].total += price;
            averages[vendor].count += 1;
        } else {
            averages[vendor] = { total: price, count: 1 };

        }
    });
    for (const key in averages) {
        averages[key] = averages[key].total / averages[key].count; 
    };

    return averages;
};

// console.log(sortByVendor([{vendor:'A',price:10},{vendor:'A',price:20},{vendor:'B',price:15}]))




// 3) დაწერეთ ფუნქცია, რომელიც მიიღებს სტრიქონების მასივს და დააბრუნებს ყველაზე გრძელ სტრიქონს. Input: ["apple", "banana", "kiwi"] Output: "banana"

function findLongestString(arr) {
    if (!Array.isArray(arr)) {
        return "wrong input";
    }
    let longest = arr[0];
    arr.forEach(item=>{
        if (item.length > longest.length) {
            longest = item;          
        };
    });

    return longest;
};

// console.log(findLongestString(["apple", "banana", "kiwi"]));

// 4) დაწერეთ ფუნქცია, რომელიც მიიღებს ობიექტს და დააბრუნებს მის მნიშვნელობების ჯამს. Input: {x:5, y:3} Output: 8

function returnSum(obj) {
    if (typeof obj !== "object") {
        return "wrong input";
    };

    let sum = 0;

    for (const key in obj) {
        if (typeof obj[key] === "number") {
            sum += obj[key];
        };
        
    };
    return sum;
};

// console.log(returnSum({x:5, y:3, z:98}))


// 5) დაწერეთ ფუნქცია, რომელიც მიიღებს ობიექტების მასივს (შეკვეთები), გაფილტრავს მხოლოდ active სტატუსის, გადაყვანს თითოეულს amount-ის გაორმაგებულ ობიექტად და შემდეგ დაითვლის ჯამს. Input: [{id:1, amount:10, status:"active"}, {id:2, amount:5, status:"inactive"}] Output: 20

function returnDoubleAmount (arr){
    if (!Array.isArray(arr)) {
        return "wrong input"
    };
    let sumAmount = 0;
    arr.forEach(item=>{
        if (item.status === "active") {
            sumAmount += item.amount*2;
        };
    });

    return sumAmount;
};

// console.log(returnDoubleAmount([{id:1, amount:10, status:"active"}, {id:2, amount:5, status:"active"},
//                                 {id:2, amount:5, status:"inactive"}]));



// 6) დაწერეთ კლასი UserManager მეთოდებით: create(user), read(id), update(id, data), delete(id).

class UserManager {
    #users = []

    create(user) {
        this.#users.push(user);
    };

    read(id) {
        return this.users.find(user => user.id === id);
    };

    update(id, data) {
        this.#users = this.#users.map(item=>{
            if (item.id === id) {
                return {...item, ...data};
            }else{
                return item;
            };
        }); 
    };

    delete(id) {
        this.#users = this.#users.filter(item=>item.id !== id);
    };
};


// 7) დაწერეთ ფუნცქია რომელიც წამოიღებს პროდუქტების ინფორმაციას შემდეგი ენდფოინთიდან https://dummyjson.com/products გაფილტრეთ 100 ლარზე ძვირი პროდუქტები და დალოგეთ მხოლოდ ამ პროდუქტის სახელები

async function getProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
            throw new Error("something went wrong");
        }
        const data = await response.json();
        const filteredProducts = data.products.filter(item => item.price > 100).map(item => item.title);
        console.log(filteredProducts);
    } catch (error) {
        console.error("Fetch failed:", error);
    }
    
};

// getProducts()

// 8) დაწერეთ ფუნქცია, რომელიც მიიღებს მომხმარებლებს, გაფილტრავს active-ებს და შეაეთებს სრულ სახელს. Input: [{first: "a", last: "b", active: true}, {first: "c", last: "d", active: false}] Output: [{full: "a b"}]


function returnActiveUsers(arr) {
    if (!Array.isArray(arr)) {
        return "wrong input";
    };

    const activeUsers = arr.filter(item => item.active === true).map(item => ({
        full: `${item.first} ${item.last}`
    }));

    return activeUsers;
};

// console.log(returnActiveUsers( [{first: "a", last: "b", active: true}, {first: "c", last: "d", active: false}]));
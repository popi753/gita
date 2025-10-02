// 1) დაწერეთ ფუნქცია რომელიც წამოიღებს დეითას ამ საიტიდან https://jsonplaceholde.typicode.com, url სპეციალურად არის არასწორი თქვენი მიზანია რომ როდესაც რექუსთი დაფეილდება გააკეთოთ რეთრაი 5 ჯერ. 

async function retryFetch(){
    let count = 0;
    while (count < 5) {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com");
            if (!response.ok) {
                throw new Error("something went wrong");
            };
           
            break;
        } catch (error) {
            count++;
            if (count === 5) {
                console.error("Max retries reached");
            };
        };
    };
};

// retryFetch();

// 2) დაწერეთ ფუნცქია რომელიც წამოიღებს მონაცემებს ამ ორი url-დან https://dummyjson.com/users და https://jsonplaceholder.typicode.com/users თქვენი მიზანია დალოგოთ მხოლოდ ის რომელიც მოასწრებს დარიზოლვებას.

async function fastestFetch() {
    try {
        const response = await Promise.race([
            fetch("https://dummyjson.com/users"),
            fetch("https://jsonplaceholder.typicode.com/users")
        ]);
        if (!response.ok) {
            throw new Error("something went wrong");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Fetch failed:", error);
    }
};

// console.log(fastestFetch());

// 3) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას https://dummyjson.com/products ამ url-დან, შემდეგ გაფილტავას და დალოგავს მხოლოდ იმ პროდუქტებს რომელთა ფასიც არის 10-ზე მეტი

async function fetchAndFilterProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
            throw new Error("something went wrong");
        }
        const data = await response.json();
        const filteredProducts = data.products.filter(product => product.price > 10);
        console.log(filteredProducts);
    } catch (error) {
        console.error("Fetch failed:", error);
    }
};

// fetchAndFilterProducts();

// 4) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას ამ url-დან https://dummyjson.com/users, გაფილტრავს მხოლოდ ისეთ იუზერებს რომელთა პროფესია არის web developer და დალოგავს მხოლოდ შემდეგ ფროფერთებს: სახელი, გვარი, მისამართი(ქალაქი), იმეილი და ტელეფონის ნომერი.


async function fetchAndFilterUsers() {
    try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
            throw new Error("something went wrong");
        }
        const data = await response.json();
        const filteredUsers = data.users.filter(user => user.company.title === "Web Developer");               
        const filteredUsersData = filteredUsers.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address.city,
            email: user.email,
            phone: user.phone
        }));
        console.log(filteredUsersData);
    } catch (error) {
        console.error("Fetch failed:", error);
    };
};

// fetchAndFilterUsers();

// 5) დაწერეთ ფუნქცია რომელიც წამოიღებს იმფორმაციას ერთდროულად შემდეგი  api-დან: https://dummyjson.com/recipes, https://dummyjson.com/comments, https://dummyjson.com/todos, https://dummyjson.com/quotes და ყველას დარიზოლვებულ და ჯეისონში გადმოტრანსფორმირებულ შედეგებს დალოგავთ. აუცილებელია რომ ყველა გაეშვას ერთდროულად

function fetchAll(){
    Promise.all([
        fetch("https://dummyjson.com/recipes").then(res => res.json()),
        fetch("https://dummyjson.com/comments").then(res => res.json()),
        fetch("https://dummyjson.com/todos").then(res => res.json()),
        fetch("https://dummyjson.com/quotes").then(res => res.json())
    ])
    .then(([recipes, comments, todos, quotes]) => {
        console.log({recipes, comments, todos, quotes});
    })
    .catch(error => {
        console.error("Fetch failed:", error);
    });

};

// fetchAll();
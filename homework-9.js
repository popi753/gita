// 1) Todo App კლასი
// მოთხოვნები: Todo (id, title, isDone, createdAt), TodoList კლასში მეთოდები: დაამატე, წაშალე(id), მონიშნე შესრულებული checkActiveTodo(id), დააბრუნე Todos(ფილტრი: all/active/done), getAllTodos({active: true}) => actives, getAllTodos({active: true}) => not active, getAllTodos() => all todos. 

class TodoApp {
    #todoArr = [];
    
    

    addTodo(id,title,isDone){
        const todo = {
        id : id,
        title : title,
        isDone : isDone,
        createdAt : new Date().toISOString(),
        };
        this.#todoArr.push(todo);
    };

    deleteTodo(id){
        this.#todoArr = this.#todoArr.filter(item=>item.id !== id);
        return this.#todoArr;
    };

    checkActiveTodo(id){
        this.#todoArr = this.#todoArr.map(item=> {
            if (item.id === id){
                return {...item, isDone: true};
            }else{
                return item;
            };
        });
    }

    getAllTodos(filter){
        if (!filter) {
            return this.#todoArr;
        };
        let result = this.#todoArr.filter(item=>item.isDone === filter)
        return result;
    };

};


// const app = new TodoApp()



// 2) Shoppinc Cart კლასი
// მეთოდები: addToCart(), removeFromCart(), calculateTotalPrice(), updateItem()


class shoppingCart {
    #cart = []

    addToCart(item){
        this.#cart.push(item);
    };

    removeFromCart(id){
        this.#cart = this.#cart.filter(item=>item.id !== id);
    };

    calculateTotalPrice(){
        let totalPrice = 0;
        for (let i = 0; i < this.#cart.length; i++) {
            totalPrice += this.#cart[i].price;
        };
        return totalPrice;
    };

    updateItem(id, newItem){
        this.#cart = this.#cart.map(item=>  {
            if (item.id === id){
                return {...item, ...newItem};
            }else{
                return item;
            };
        });
    };
};



// 3) Library კლასი რომელიც შეინახავს წიგნების მასივს.
// მეთოდები: addBook(), removeBook(), listBooks() ამას შეიძლება გადაეცეს სორტი მაგალითად წამოიღეთ წიგნები გამოშვების წლის მიხედვით.

class Library {
    #books = []

    addBook(book){
        this.#books.push(book);
    };

    removeBook(id){
        this.#books = this.#books.filter(item=>item.id !== id);
    };

    listBooks(sort){
        const result = this.#books.toSorted((a,b)=>{
          return a[sort] - b[sort];
        })
        return result;
    };
};



// 4) ContactManager კლასი 
// უნდა ჰქონდეს შემდეგი მეთოდები:
// addNewContact() // სახელი, ნომერი, იმეილი დაადეთ ვალიდაცია რომ 2 ერთი და იგივე იმეილის კონტაქტი ვერ უნდა შექმნათ, ვერც ორი ერთი 
// და იგივე ნომერი
// viewAllContacts(), updatePhone(), deleteContact()



class ContactManager {
    #contacts = [];
    
    addNewContact(name, phone, email) {
        const emailExists = this.#contacts.some(contact => contact.email === email);
        const numberExists = this.#contacts.some(contact => contact.phone === phone);

        if (emailExists) {
            return('Email already exists');
        };

        if (numberExists) {
            return('Phone number already exists');
        };

        const newContact = { name, phone, email };
        this.#contacts.push(newContact);
    };

    viewAllContacts() {
        return this.#contacts;
    };

    updatePhone(phone, newPhone) {
        this.#contacts = this.#contacts.map(item=>{
            if (item.phone === phone) {
                return {...item, ...newPhone};
            }else{
                return item;
            };
        });
    };

    deleteContact(name) {
        this.#contacts = this.#contacts.filter(contact => contact.name !== name);
    };
};
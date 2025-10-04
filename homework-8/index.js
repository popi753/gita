// 1) დაწერეთ ფუნცქია რომელიც დალოგავს მაუსის კოორდინატებს მხოლოდ მას შემდეგ რაც მაუსი გაჩერდება, გამოიყენეთ debaunce ტექნიკა. მინიშნება: window.addEventListener('mousemove',(e) => {
//     console.log(e.clientX, e.clientY)
// })

window.addEventListener('mousemove', debounce((e) => {
    console.log(e.clientX, e.clientY)
}));


function debounce(listener) {
    let timeoutId;
    return function(e) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            listener.apply(this, [e]);
        }, 1000);
    };
}



// 2) შექმენით html-ში ბათონი და ყოველ ბათონის ქლიქზე დაარექუესთეთ შემდეგი API-დან და მიღებული შედეგი გამოაჩნიეთ https://dummyjson.com/quotes ისევე როგორც რენდომ კატის ფაქტზე ვქენით.


const btn = document.getElementById('fetch-quote');
const quoteContainer = document.getElementById('quote');

btn.addEventListener('click', () => {
    fetch('https://dummyjson.com/quotes/random')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            quoteContainer.innerHTML = `
                <p>${data.quote}</p>
                <h3>${data.author}</h3>
            `;
        }).catch(err => {
            console.error(err);
            alert('something went wrong');
        });
});

// 3) დაწერეთ ფუნცქია რომელიც წამოიღებს იუზერების ინფორმაციას შემდეგი API-დან https://dummyjson.com/users თქვენი მიზანია გააკეთოთ ფეჯინეიშენი სულ არის 200-ზე მეტი იუზერი და დიფოტად მოდის 30. მინიშნება, თუ სრულ რაოდენობას გაყოფთ ლიმიტზე მიიღებთ ფეიჯების რაოდენობას, რაც შეეხება როგორ უნდა გამოთვალოთ skip ფროფერთი. skip = (page - 1) * limit) limit = 30

const usersContainer = document.getElementById('users');
const paginationContainer = document.getElementById('pagination');

window.addEventListener('load', () => {
 fetchUsers(1);   
});

function fetchUsers(page) {
    fetch('https://dummyjson.com/users?skip=' + ((page - 1) * 30))
        .then(res => res.json())
        .then(data => {
            data.users.map(element => {
                users.innerHTML += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.firstName}</td>
                        <td>${element.lastName}</td>
                        <td>${element.age}</td>
                        <td>${element.email}</td>
                    </tr>
                `;
            const totalPages = Math.ceil(data.total / 30);
            paginationContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                if (i === page) {
                    btn.disabled = true;
                }
                btn.addEventListener('click', () => {
                    usersContainer.innerHTML = '';
                    fetchUsers(i);
                });
                paginationContainer.appendChild(btn);
            }

        })
    })
        .catch(err => {
            console.error(err);
            alert('something went wrong');
        });

}


// 4) შექმენით ინფუთი სადაც იუზერი მხოლოდ რიცხვებს შეიყვანს, რიცხვის შეყვანის შემდეგ უნდა დაარექუესთოთ შემდეგ ეიპიაიზე https://myfakeapi.com/api/cars/10 10-ის ნაცვლად ჩაწერეთ იუზერის შეყვანილი ინფომრაცია, ეს ეიპიაი დაგიბრუნებთ მანქანის ინფორმაციას და გამოაჩინეტ ეს ინფორმაცია დომში. ასევე თუ არასწორი აიდი დაწერა მაგალითად 9999 ბექენდი დაგირტყავთ ერორს და გაჰენდლეთ ერორი და უთხარით იუზერს რომ სწორი აიდი შეიყვანოს, მაგალითად alert ის გამოყენებით.

const form = document.getElementById('car-form');
const carInfo = document.getElementById('car-info');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target.elements.carId.value);
    if (e.target.elements.carId.value === '' || isNaN(e.target.elements.carId.value)) {
        alert('Please enter a valid car ID');
        return;
    }
     fetch('https://myfakeapi.com/api/cars/' + e.target.elements.carId.value)
        .then(res => res.json())
        .then(data => {
            carInfo.innerHTML = `
                <p>car:${data.Car.car}</p>
                <p>model:${data.Car.car_model}</p>
                <p>color:${data.Car.car_color}</p>
                <p>year:${data.Car.car_model_year}</p>
                <p>price:${data.Car.price}</p>

            `;
        })
        .catch(err => {
            console.error(err);
            alert('Please enter a valid car ID');
        });
})
// თქვენი დავალება შემდეგია
// 1) შექმენით პროდუქტების ქრადი ექსპრესის ტაიპსკრიპტსის და მონგუსის გამოყენებით.
// 2) პროდუქტს უნდა ჰქონდეს, სახელი, აღწერა, ფასი, ფოტო (ფოტოზე შეგიძლიათ ლინკი გამოიყენოთ რაიმე პროდუქტის), კატეგორია.
// 3) გამოიყენეთ Joi ვალიდაციებისთვის
// 4) გააკეთეთ მიდლვიარი რომელიც წაშლის დროს შეამოწმებს ჰედერებში თუ მოუყვება როლი ადმინი მხოლოდ მაშინ წაშალოს პროდუქტი,
//  იგივე ქენით განახლებაზეც.
// 5) გააკეთეთ ზუსტად ისეთი ფოლდერების სტრუქტურა როგორც დღეს ვქენი ლექციაზე.
//  სორსში უნდა გქონდეთ validations, config, models, routes, servises, middlewares და index.ts 

import express, {Request,Response } from "express"
import connectToDB from "./db.config";

import productRouter from "./product/product.controller";

const app = express();

app.use(express.json());

app.get("/", (req : Request, res:Response) => {
    res.send("Hello World");
})
app.use("/products", productRouter);

connectToDB().then(()=>{
        app.listen(3000,()=>{
        console.log("Server started on http://localhost:3000");
    });
}).catch(()=>{console.log("something went wrong")})


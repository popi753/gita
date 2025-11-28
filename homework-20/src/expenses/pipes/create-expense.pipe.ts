import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


// 3) ხარჯებზე გააკეთეთ კატეგორიების ვალიდაცია, გქონდეთ რამე knowCategories 
// და როგორც ლექციაზე ვქენით ან დასერჩეთ როგორ უნდა გააეკთოთ ინამ ველიუების ვალიდაცია class-validator ის გამოყენებით

@Injectable()
export class CreateExpensePipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException("No data submitted");
        }
        const errors : Record <string,string> = {};

        if(!value.productName || typeof value["productName"] !== "string"){
            errors.productName = "please provide valid product name"
        }

        const supportedCategories = ["entertainment", "shopping", "gym"];
        if(!value.category || !supportedCategories.includes(value.category.toLowerCase())){
            errors.category = "unsupported category"
        }

        if (!value.price || isNaN(value.price)) {
            errors.price = "please provide valid price"
        } 
        if (!value.quantity || isNaN(value.quantity)) {
            errors.quantity = "please provide valid quantity"
        }
        
        if (Object.keys(errors).length) {
            throw new BadRequestException(errors)
        }

        const newValue = {
            productName: value.productName,
            category: value.category,
            price: Number(value.price),
            quantity: Number(value.quantity),
        }

        return newValue;
    }
}
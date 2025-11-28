import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ExpenseQueryPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const errors : Record <string,string> = {};
        
        const supportedCategories = ["entertainment", "shopping", "gym"];
        if ("category" in value && !supportedCategories.includes(value.category)) {
            errors.category = "unsupported category"
        }

        if ("page" in value && !isNaN(value.page)) {
            errors.page = "enter valid number"
        }

        if ("take" in value && !isNaN(value.take)) {
            errors.take = "enter valid number"
        }

        if ("priceFrom" in value && !isNaN(value.priceFrom)) {
            errors.priceFrom = "enter valid number"
        }

        if ("priceTo" in value && !isNaN(value.priceTo)) {
            errors.priceTo = "enter valid number"
        }

        

        if (Object.keys(errors).length) {
            throw new BadRequestException(errors)
        }

        const newQuery = {
            category: value.category?.toLowerCase(),
            page: Number(value.page) || 1,
            take: Number(value.take) || 30,
            priceFrom: Number(value.priceFrom) || 0,
            priceTo: Number(value.priceTo) || Infinity,
        }

        return newQuery;
    }
}
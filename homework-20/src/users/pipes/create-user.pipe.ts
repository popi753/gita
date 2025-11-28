import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { first } from "rxjs";


@Injectable()
export class CreateUserPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException("No data submitted");
        }
        const errors : Record <string,string> = {};
            if (value.firstName || typeof value.firstName !== "string") {
                errors.firstName = "please provide valid firstName"
            }
            if (!value.lastName || typeof value.lastName !== "string") {
                errors.lastName = "please provide valid lastName"
            }
            if (!value.email || typeof value.email !== "string" || !value.email.includes("@")) {
                errors.email = "please provide valid email"
            }
            if (!value.phoneNumber || typeof value.phoneNumber !== "number") {
                errors.phoneNumber = "please provide valid Phone Number"
            }
            const genderArr = ["male", "female"]
            if (!genderArr.includes(value.gender?.toLocaleLowerCase())) {
                errors.gender = "please provide valid Gender"
            }
            if (Object.keys(errors).length) {
                throw new BadRequestException(errors);
            }

        const newValue = {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            phoneNumber: value.phoneNumber,
            gender: value.gender,
        }

        return newValue;
    }
}
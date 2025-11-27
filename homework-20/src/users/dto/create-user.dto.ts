
export enum Gender {
    Male = "male",
    Female = "female",
}

export class CreateUserDto {
    firstName:string
    lastName:string
    email:string
    phoneNumber:number
    gender: Gender
}
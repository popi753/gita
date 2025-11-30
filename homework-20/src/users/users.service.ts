import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";


@Injectable()
export class UserService {

    private users = [
        {id:1,firstName: "nika",lastName: "mgaloblishvili", email:"test@gmail.com", phoneNumber:"+995555980126", gender:"male"},
        {id:2,firstName:"ana",lastName:"beridze",email:"ana.b@gmail.com",phoneNumber:"+995551234567",gender:"female"},
        {id:3,firstName:"giorgi",lastName:"kapanadze",email:"giorgi.k@yahoo.com",phoneNumber:"+995552345678",gender:"male"},
        {id:4,firstName:"mariam",lastName:"gelashvili",email:"mariam.g@outlook.com",phoneNumber:"+995553456789",gender:"female"},
        {id:5,firstName:"davit",lastName:"lomidze",email:"davit.l@gmail.com",phoneNumber:"+995554567890",gender:"male"},
        {id:6,firstName:"nino",lastName:"chkheidze",email:"nino.ch@mail.com",phoneNumber:"+995555678901",gender:"female"},
        {id:7,firstName:"levan",lastName:"janelidze",email:"levan.j@gmail.com",phoneNumber:"+995556789012",gender:"male"},
        {id:8,firstName:"tamar",lastName:"kiknadze",email:"tamar.k@yahoo.com",phoneNumber:"+995557890123",gender:"female"},
        {id:9,firstName:"irakli",lastName:"maisuradze",email:"irakli.m@gmail.com",phoneNumber:"+995558901234",gender:"male"},
        {id:10,firstName:"salome",lastName:"nikoladze",email:"salome.n@outlook.com",phoneNumber:"+995559012345",gender:"female"},
        {id:11,firstName:"luka",lastName:"orjonikidze",email:"luka.o@gmail.com",phoneNumber:"+995550123456",gender:"male"},
        {id:12,firstName:"ketevan",lastName:"pirtskhalava",email:"ketevan.p@mail.com",phoneNumber:"+995551234560",gender:"female"},
        {id:13,firstName:"sandro",lastName:"qavtaradze",email:"sandro.q@gmail.com",phoneNumber:"+995552345601",gender:"male"},
        {id:14,firstName:"natia",lastName:"ramishvili",email:"natia.r@yahoo.com",phoneNumber:"+995553456012",gender:"female"},
        {id:15,firstName:"tornike",lastName:"sarishvili",email:"tornike.s@gmail.com",phoneNumber:"+995554560123",gender:"male"},
        {id:16,firstName:"elene",lastName:"tabidze",email:"elene.t@outlook.com",phoneNumber:"+995555601234",gender:"female"},
        {id:17,firstName:"beka",lastName:"urushadze",email:"beka.u@gmail.com",phoneNumber:"+995556012345",gender:"male"},
        {id:18,firstName:"mari",lastName:"vashakidze",email:"mari.v@mail.com",phoneNumber:"+995557012345",gender:"female"},
        {id:19,firstName:"giga",lastName:"zaalishvili",email:"giga.z@gmail.com",phoneNumber:"+995558012345",gender:"male"},
        {id:20,firstName:"sopho",lastName:"abashidze",email:"sopho.a@yahoo.com",phoneNumber:"+995559123456",gender:"female"},
        {id:21,firstName:"rati",lastName:"basilashvili",email:"rati.b@gmail.com",phoneNumber:"+995550234567",gender:"male"},
        {id:22,firstName:"tea",lastName:"chikovani",email:"tea.c@outlook.com",phoneNumber:"+995551345678",gender:"female"},
        {id:23,firstName:"vakhtang",lastName:"dolidze",email:"vakhtang.d@gmail.com",phoneNumber:"+995552456789",gender:"male"},
        {id:24,firstName:"maka",lastName:"eliava",email:"maka.e@mail.com",phoneNumber:"+995553567890",gender:"female"},
        {id:25,firstName:"zurab",lastName:"firtskhalava",email:"zurab.f@gmail.com",phoneNumber:"+995554678901",gender:"male"},
        {id:26,firstName:"lela",lastName:"gogiberidze",email:"lela.g@yahoo.com",phoneNumber:"+995555789012",gender:"female"},
        {id:27,firstName:"mamuka",lastName:"khatiashvili",email:"mamuka.k@gmail.com",phoneNumber:"+995556890123",gender:"male"},
        {id:28,firstName:"ia",lastName:"iashvili",email:"ia.i@outlook.com",phoneNumber:"+995557901234",gender:"female"},
        {id:29,firstName:"nikoloz",lastName:"jokhadze",email:"nikoloz.j@gmail.com",phoneNumber:"+995558012346",gender:"male"},
        {id:30,firstName:"khatuna",lastName:"kvaratskhelia",email:"khatuna.k@mail.com",phoneNumber:"+995559123457",gender:"female"},
        {id:31,firstName:"revaz",lastName:"lortkipanidze",email:"revaz.l@gmail.com",phoneNumber:"+995550234568",gender:"male"},
        {id:32,firstName:"manana",lastName:"mdivani",email:"manana.m@yahoo.com",phoneNumber:"+995551345679",gender:"female"},
        {id:33,firstName:"archil",lastName:"nadibaidze",email:"archil.n@gmail.com",phoneNumber:"+995552456780",gender:"male"},
        {id:34,firstName:"nana",lastName:"oniani",email:"nana.o@outlook.com",phoneNumber:"+995553567891",gender:"female"},
        {id:35,firstName:"paata",lastName:"papava",email:"paata.p@gmail.com",phoneNumber:"+995554678902",gender:"male"},
        {id:36,firstName:"rusudan",lastName:"qipiani",email:"rusudan.q@mail.com",phoneNumber:"+995555789013",gender:"female"},
        {id:37,firstName:"shota",lastName:"rustaveli",email:"shota.r@gmail.com",phoneNumber:"+995556890124",gender:"male"},
        {id:38,firstName:"tinatin",lastName:"sanikidze",email:"tinatin.s@yahoo.com",phoneNumber:"+995557901235",gender:"female"},
        {id:39,firstName:"otar",lastName:"taktakishvili",email:"otar.t@gmail.com",phoneNumber:"+995558012347",gender:"male"},
        {id:40,firstName:"ekaterine",lastName:"ugrekhelidze",email:"ekaterine.u@outlook.com",phoneNumber:"+995559123458",gender:"female"},
        {id:41,firstName:"konstantine",lastName:"vasadze",email:"konstantine.v@gmail.com",phoneNumber:"+995550234569",gender:"male"},
        {id:42,firstName:"dali",lastName:"zedginidze",email:"dali.z@mail.com",phoneNumber:"+995551345680",gender:"female"},
        {id:43,firstName:"avtandil",lastName:"akhvlediani",email:"avtandil.a@gmail.com",phoneNumber:"+995552456781",gender:"male"},
        {id:44,firstName:"medea",lastName:"benashvili",email:"medea.b@yahoo.com",phoneNumber:"+995553567892",gender:"female"},
        {id:45,firstName:"guram",lastName:"chubinidze",email:"guram.c@gmail.com",phoneNumber:"+995554678903",gender:"male"},
        {id:46,firstName:"nestan",lastName:"dumbadze",email:"nestan.d@outlook.com",phoneNumber:"+995555789014",gender:"female"},
        {id:47,firstName:"tengiz",lastName:"esiava",email:"tengiz.e@gmail.com",phoneNumber:"+995556890125",gender:"male"},
        {id:48,firstName:"tsira",lastName:"gabashvili",email:"tsira.g@mail.com",phoneNumber:"+995557901236",gender:"female"},
        {id:49,firstName:"merab",lastName:"kostava",email:"merab.k@gmail.com",phoneNumber:"+995558012348",gender:"male"},
        {id:50,firstName:"nato",lastName:"liluashvili",email:"nato.l@yahoo.com",phoneNumber:"+995559123459",gender:"female"}
    ];

// 2) დაამატეთ ორივე რესურსზე ფეჯინეიშენი, page = 1, take.= 30,
//  არაფერს თუ არ გადასცემთ დიფოლატად პირველი 30 ჩანაწერი უნდა წამოიღოს

// 4) იუზერების გეთის დროს გაჰენდლეთ ფილტრები მაგალითად /users?gender=m უნდა დააბრუნოს ყველა მმამრობითი სქესის იუზერი,
//  /users?gender=m&email=test
// უნდა დააბრუნოს ყველა მმარრობითი სქესის იუზერი და დამატებით ყველა ის იუზერი რომლის იმეილიც იწყება test ით.

    getAllUsers({page,take,gender,emailStartsWith}:QueryParamsDto){
        try {
                const start = (page-1)*take
                const end = page*take
        
                let filteredUsers = this.users;

                if (gender) {
                    filteredUsers = filteredUsers.filter(e=>{
                        return (e.gender === gender)
                    })
                }

                if (emailStartsWith) {
                    filteredUsers = filteredUsers.filter(e=>{
                        return e.email.startsWith(emailStartsWith)
                    })
                }

                const paginatedExpenses = filteredUsers.slice(start, end);

                return {
                    page,
                    take,
                    total: filteredUsers.length,
                    data:  paginatedExpenses
                }
                
        
            } catch (error) {
                throw new InternalServerErrorException(error);
            };
    }



    createUser({firstName,lastName,email,phoneNumber,gender}:CreateUserDto){
        try {

            let id = Math.ceil(Math.random()*100);
            while(this.users.find(e=>e.id===id)){
                id++
            }
            const newUser = {
                id,
                firstName,
                lastName,
                email,
                phoneNumber,
                gender
            }

            this.users.push(newUser);

            return {success:true,newUser}

        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    getUserById(id:number){
        const user = this.users.find(e=>e.id===id);
        if (!user) {
            throw new NotFoundException("user not found");
        }
        return user;
    }

    deleteUserById(id:number){
        const userIndex = this.users.findIndex(e=>e.id===id);
        if (userIndex === -1) {
            throw new NotFoundException("user not found");
        }

        const user = this.users[userIndex];
        this.users.splice(userIndex,1);
        return {success:true,user};
    }

    updateUserById(id:number, updateUserDto:UpdateUserDto){
        // if (!updateUserDto.firstName && !updateUserDto.lastName && !updateUserDto.email && !updateUserDto.phoneNumber && !updateUserDto.gender) {
        //     throw new HttpException("please provide valid data", HttpStatus.BAD_REQUEST)
        // }
        // const errors : Record <string,string> = {};  
        // if (updateUserDto.firstName && typeof updateUserDto.firstName !== "string") {
        //     errors.firstName = "please provide valid firstName"
        // }
        // if (updateUserDto.lastName && typeof updateUserDto.lastName !== "string") {
        //     errors.lastName = "please provide valid lastName"
        // }
        // if (updateUserDto.email && !updateUserDto.email?.includes("@")) {
        //     errors.email = "please provide valid email"
        // }
        // if (updateUserDto.phoneNumber && typeof updateUserDto.phoneNumber !== "number") {
        //     errors.phoneNumber = "please provide valid Phone Number"
        // }
        // const genderArr = ["male", "female"]
        // if (updateUserDto.gender && !genderArr.includes(updateUserDto.gender?.toLocaleLowerCase())) {
        //     errors.gender = "please provide valid Gender"
        // }
        // if (Object.keys(errors).length) {
        //     throw new HttpException(errors, HttpStatus.BAD_REQUEST);
        // }

        const userIndex = this.users.findIndex(e=>e.id===id);
        if (userIndex === -1) {
            throw new NotFoundException("user not found");
        }
        const updatedUser = {...this.users[userIndex], ...updateUserDto};
        this.users[userIndex] = updatedUser;
        return {success:true,updatedUser};
    }
}

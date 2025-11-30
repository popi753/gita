import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";


@Injectable()
export class UserService {

    private users = [
        {id:1,firstName:"nika",lastName:"mgaloblishvili",email:"test@gmail.com",phoneNumber:"+995555980126",gender:"male",subscriptionStartDate:"2024-01-15T00:00:00.000Z",subscriptionEndDate:"2024-02-15T00:00:00.000Z"},
    {id:2,firstName:"ana",lastName:"beridze",email:"ana.b@gmail.com",phoneNumber:"+995551234567",gender:"female",subscriptionStartDate:"2024-02-01T00:00:00.000Z",subscriptionEndDate:"2026-03-01T00:00:00.000Z"},
    {id:3,firstName:"giorgi",lastName:"kapanadze",email:"giorgi.k@yahoo.com",phoneNumber:"+995552345678",gender:"male",subscriptionStartDate:"2024-01-20T00:00:00.000Z",subscriptionEndDate:"2024-02-20T00:00:00.000Z"},
    {id:4,firstName:"mariam",lastName:"gelashvili",email:"mariam.g@outlook.com",phoneNumber:"+995553456789",gender:"female",subscriptionStartDate:"2024-03-01T00:00:00.000Z",subscriptionEndDate:"2024-04-01T00:00:00.000Z"},
    {id:5,firstName:"davit",lastName:"lomidze",email:"davit.l@gmail.com",phoneNumber:"+995554567890",gender:"male",subscriptionStartDate:"2024-01-10T00:00:00.000Z",subscriptionEndDate:"2024-02-10T00:00:00.000Z"},
    {id:6,firstName:"nino",lastName:"chkheidze",email:"nino.ch@mail.com",phoneNumber:"+995555678901",gender:"female",subscriptionStartDate:"2024-02-15T00:00:00.000Z",subscriptionEndDate:"2024-03-15T00:00:00.000Z"},
    {id:7,firstName:"levan",lastName:"janelidze",email:"levan.j@gmail.com",phoneNumber:"+995556789012",gender:"male",subscriptionStartDate:"2024-01-25T00:00:00.000Z",subscriptionEndDate:"2024-02-25T00:00:00.000Z"},
    {id:8,firstName:"tamar",lastName:"kiknadze",email:"tamar.k@yahoo.com",phoneNumber:"+995557890123",gender:"female",subscriptionStartDate:"2024-03-10T00:00:00.000Z",subscriptionEndDate:"2024-04-10T00:00:00.000Z"},
    {id:9,firstName:"irakli",lastName:"maisuradze",email:"irakli.m@gmail.com",phoneNumber:"+995558901234",gender:"male",subscriptionStartDate:"2024-01-05T00:00:00.000Z",subscriptionEndDate:"2024-02-05T00:00:00.000Z"},
    {id:10,firstName:"salome",lastName:"nikoladze",email:"salome.n@outlook.com",phoneNumber:"+995559012345",gender:"female",subscriptionStartDate:"2024-02-20T00:00:00.000Z",subscriptionEndDate:"2024-03-20T00:00:00.000Z"},
    {id:11,firstName:"luka",lastName:"orjonikidze",email:"luka.o@gmail.com",phoneNumber:"+995550123456",gender:"male",subscriptionStartDate:"2024-01-30T00:00:00.000Z",subscriptionEndDate:"2024-02-29T00:00:00.000Z"},
    {id:12,firstName:"ketevan",lastName:"pirtskhalava",email:"ketevan.p@mail.com",phoneNumber:"+995551234560",gender:"female",subscriptionStartDate:"2024-03-05T00:00:00.000Z",subscriptionEndDate:"2024-04-05T00:00:00.000Z"},
    {id:13,firstName:"sandro",lastName:"qavtaradze",email:"sandro.q@gmail.com",phoneNumber:"+995552345601",gender:"male",subscriptionStartDate:"2024-01-12T00:00:00.000Z",subscriptionEndDate:"2024-02-12T00:00:00.000Z"},
    {id:14,firstName:"natia",lastName:"ramishvili",email:"natia.r@yahoo.com",phoneNumber:"+995553456012",gender:"female",subscriptionStartDate:"2024-02-25T00:00:00.000Z",subscriptionEndDate:"2024-03-25T00:00:00.000Z"},
    {id:15,firstName:"tornike",lastName:"sarishvili",email:"tornike.s@gmail.com",phoneNumber:"+995554560123",gender:"male",subscriptionStartDate:"2024-01-18T00:00:00.000Z",subscriptionEndDate:"2024-02-18T00:00:00.000Z"},
    {id:16,firstName:"elene",lastName:"tabidze",email:"elene.t@outlook.com",phoneNumber:"+995555601234",gender:"female",subscriptionStartDate:"2024-03-12T00:00:00.000Z",subscriptionEndDate:"2024-04-12T00:00:00.000Z"},
    {id:17,firstName:"beka",lastName:"urushadze",email:"beka.u@gmail.com",phoneNumber:"+995556012345",gender:"male",subscriptionStartDate:"2024-01-08T00:00:00.000Z",subscriptionEndDate:"2024-02-08T00:00:00.000Z"},
    {id:18,firstName:"mari",lastName:"vashakidze",email:"mari.v@mail.com",phoneNumber:"+995557012345",gender:"female",subscriptionStartDate:"2024-02-28T00:00:00.000Z",subscriptionEndDate:"2024-03-28T00:00:00.000Z"},
    {id:19,firstName:"giga",lastName:"zaalishvili",email:"giga.z@gmail.com",phoneNumber:"+995558012345",gender:"male",subscriptionStartDate:"2024-01-22T00:00:00.000Z",subscriptionEndDate:"2024-02-22T00:00:00.000Z"},
    {id:20,firstName:"sopho",lastName:"abashidze",email:"sopho.a@yahoo.com",phoneNumber:"+995559123456",gender:"female",subscriptionStartDate:"2024-03-15T00:00:00.000Z",subscriptionEndDate:"2024-04-15T00:00:00.000Z"},
    {id:21,firstName:"rati",lastName:"basilashvili",email:"rati.b@gmail.com",phoneNumber:"+995550234567",gender:"male",subscriptionStartDate:"2024-01-14T00:00:00.000Z",subscriptionEndDate:"2024-02-14T00:00:00.000Z"},
    {id:22,firstName:"tea",lastName:"chikovani",email:"tea.c@outlook.com",phoneNumber:"+995551345678",gender:"female",subscriptionStartDate:"2024-02-10T00:00:00.000Z",subscriptionEndDate:"2024-03-10T00:00:00.000Z"},
    {id:23,firstName:"vakhtang",lastName:"dolidze",email:"vakhtang.d@gmail.com",phoneNumber:"+995552456789",gender:"male",subscriptionStartDate:"2024-01-28T00:00:00.000Z",subscriptionEndDate:"2024-02-28T00:00:00.000Z"},
    {id:24,firstName:"maka",lastName:"eliava",email:"maka.e@mail.com",phoneNumber:"+995553567890",gender:"female",subscriptionStartDate:"2024-03-18T00:00:00.000Z",subscriptionEndDate:"2024-04-18T00:00:00.000Z"},
    {id:25,firstName:"zurab",lastName:"firtskhalava",email:"zurab.f@gmail.com",phoneNumber:"+995554678901",gender:"male",subscriptionStartDate:"2024-01-06T00:00:00.000Z",subscriptionEndDate:"2024-02-06T00:00:00.000Z"},
    {id:26,firstName:"lela",lastName:"gogiberidze",email:"lela.g@yahoo.com",phoneNumber:"+995555789012",gender:"female",subscriptionStartDate:"2024-02-12T00:00:00.000Z",subscriptionEndDate:"2024-03-12T00:00:00.000Z"},
    {id:27,firstName:"mamuka",lastName:"khatiashvili",email:"mamuka.k@gmail.com",phoneNumber:"+995556890123",gender:"male",subscriptionStartDate:"2024-01-24T00:00:00.000Z",subscriptionEndDate:"2024-02-24T00:00:00.000Z"},
    {id:28,firstName:"ia",lastName:"iashvili",email:"ia.i@outlook.com",phoneNumber:"+995557901234",gender:"female",subscriptionStartDate:"2024-03-20T00:00:00.000Z",subscriptionEndDate:"2024-04-20T00:00:00.000Z"},
    {id:29,firstName:"nikoloz",lastName:"jokhadze",email:"nikoloz.j@gmail.com",phoneNumber:"+995558012346",gender:"male",subscriptionStartDate:"2024-01-16T00:00:00.000Z",subscriptionEndDate:"2024-02-16T00:00:00.000Z"},
    {id:30,firstName:"khatuna",lastName:"kvaratskhelia",email:"khatuna.k@mail.com",phoneNumber:"+995559123457",gender:"female",subscriptionStartDate:"2024-02-18T00:00:00.000Z",subscriptionEndDate:"2024-03-18T00:00:00.000Z"},
    {id:31,firstName:"revaz",lastName:"lortkipanidze",email:"revaz.l@gmail.com",phoneNumber:"+995550234568",gender:"male",subscriptionStartDate:"2024-01-26T00:00:00.000Z",subscriptionEndDate:"2024-02-26T00:00:00.000Z"},
    {id:32,firstName:"manana",lastName:"mdivani",email:"manana.m@yahoo.com",phoneNumber:"+995551345679",gender:"female",subscriptionStartDate:"2024-03-22T00:00:00.000Z",subscriptionEndDate:"2024-04-22T00:00:00.000Z"},
    {id:33,firstName:"archil",lastName:"nadibaidze",email:"archil.n@gmail.com",phoneNumber:"+995552456780",gender:"male",subscriptionStartDate:"2024-01-11T00:00:00.000Z",subscriptionEndDate:"2024-02-11T00:00:00.000Z"},
    {id:34,firstName:"nana",lastName:"oniani",email:"nana.o@outlook.com",phoneNumber:"+995553567891",gender:"female",subscriptionStartDate:"2024-02-22T00:00:00.000Z",subscriptionEndDate:"2024-03-22T00:00:00.000Z"},
    {id:35,firstName:"paata",lastName:"papava",email:"paata.p@gmail.com",phoneNumber:"+995554678902",gender:"male",subscriptionStartDate:"2024-01-19T00:00:00.000Z",subscriptionEndDate:"2024-02-19T00:00:00.000Z"},
    {id:36,firstName:"rusudan",lastName:"qipiani",email:"rusudan.q@mail.com",phoneNumber:"+995555789013",gender:"female",subscriptionStartDate:"2024-03-25T00:00:00.000Z",subscriptionEndDate:"2024-04-25T00:00:00.000Z"},
    {id:37,firstName:"shota",lastName:"rustaveli",email:"shota.r@gmail.com",phoneNumber:"+995556890124",gender:"male",subscriptionStartDate:"2024-01-13T00:00:00.000Z",subscriptionEndDate:"2024-02-13T00:00:00.000Z"},
    {id:38,firstName:"tinatin",lastName:"sanikidze",email:"tinatin.s@yahoo.com",phoneNumber:"+995557901235",gender:"female",subscriptionStartDate:"2024-02-08T00:00:00.000Z",subscriptionEndDate:"2024-03-08T00:00:00.000Z"},
    {id:39,firstName:"otar",lastName:"taktakishvili",email:"otar.t@gmail.com",phoneNumber:"+995558012347",gender:"male",subscriptionStartDate:"2024-01-27T00:00:00.000Z",subscriptionEndDate:"2024-02-27T00:00:00.000Z"},
    {id:40,firstName:"ekaterine",lastName:"ugrekhelidze",email:"ekaterine.u@outlook.com",phoneNumber:"+995559123458",gender:"female",subscriptionStartDate:"2024-03-28T00:00:00.000Z",subscriptionEndDate:"2024-04-28T00:00:00.000Z"},
    {id:41,firstName:"konstantine",lastName:"vasadze",email:"konstantine.v@gmail.com",phoneNumber:"+995550234569",gender:"male",subscriptionStartDate:"2024-01-09T00:00:00.000Z",subscriptionEndDate:"2024-02-09T00:00:00.000Z"},
    {id:42,firstName:"dali",lastName:"zedginidze",email:"dali.z@mail.com",phoneNumber:"+995551345680",gender:"female",subscriptionStartDate:"2024-02-14T00:00:00.000Z",subscriptionEndDate:"2024-03-14T00:00:00.000Z"},
    {id:43,firstName:"avtandil",lastName:"akhvlediani",email:"avtandil.a@gmail.com",phoneNumber:"+995552456781",gender:"male",subscriptionStartDate:"2024-01-21T00:00:00.000Z",subscriptionEndDate:"2024-02-21T00:00:00.000Z"},
    {id:44,firstName:"medea",lastName:"benashvili",email:"medea.b@yahoo.com",phoneNumber:"+995553567892",gender:"female",subscriptionStartDate:"2024-03-08T00:00:00.000Z",subscriptionEndDate:"2024-04-08T00:00:00.000Z"},
    {id:45,firstName:"guram",lastName:"chubinidze",email:"guram.c@gmail.com",phoneNumber:"+995554678903",gender:"male",subscriptionStartDate:"2024-01-17T00:00:00.000Z",subscriptionEndDate:"2024-02-17T00:00:00.000Z"},
    {id:46,firstName:"nestan",lastName:"dumbadze",email:"nestan.d@outlook.com",phoneNumber:"+995555789014",gender:"female",subscriptionStartDate:"2024-02-16T00:00:00.000Z",subscriptionEndDate:"2024-03-16T00:00:00.000Z"},
    {id:47,firstName:"tengiz",lastName:"esiava",email:"tengiz.e@gmail.com",phoneNumber:"+995556890125",gender:"male",subscriptionStartDate:"2024-01-23T00:00:00.000Z",subscriptionEndDate:"2024-02-23T00:00:00.000Z"},
    {id:48,firstName:"tsira",lastName:"gabashvili",email:"tsira.g@mail.com",phoneNumber:"+995557901236",gender:"female",subscriptionStartDate:"2024-03-14T00:00:00.000Z",subscriptionEndDate:"2024-04-14T00:00:00.000Z"},
    {id:49,firstName:"merab",lastName:"kostava",email:"merab.k@gmail.com",phoneNumber:"+995558012348",gender:"male",subscriptionStartDate:"2024-01-07T00:00:00.000Z",subscriptionEndDate:"2024-02-07T00:00:00.000Z"},
    {id:50,firstName:"nato",lastName:"liluashvili",email:"nato.l@yahoo.com",phoneNumber:"+995559123459",gender:"female",subscriptionStartDate:"2024-02-24T00:00:00.000Z",subscriptionEndDate:"2024-03-24T00:00:00.000Z"}
    ];

// 2) იუზერების შექმნის დროს გადააკეთებთ ლოგიკას რო ყოველი ახალი იუზერის დამატებისას სისტემამ ავტომატურად მიანიჭოს subscriptionStartDate  და subscriptionEndDate, 1 თვე უნდა იყოს ყოველთვის საბსქრიფშენის ვადა.

// 4) იუზერების კონტროლერს დაამატეთ ახალი ენდფოინთი /upgrade-subscription და აქ თუ დაარექუსთებს იუზერი შეამოწმეთ რამდენად ვალიდური იუზერია და თუ ყველაფერი რიგზეა საბსქრიფშენის subscriptionEndDate გაუხანგრძლივეთ კიდევ ერთი თვით.

    upgradeSubscription(userId:number){

        const userIndex = this.users.findIndex(e=>e.id === userId);
        if (userIndex === -1) {
            throw new NotFoundException("user not found");
        }
        const endDate = new Date(this.users[userIndex].subscriptionEndDate);
        if (new Date() > endDate) {
            const subscriptionStartDate = new Date()
            this.users[userIndex].subscriptionStartDate = subscriptionStartDate.toISOString();

            const subscriptionEndDate = new Date(subscriptionStartDate) 
            subscriptionEndDate.setMonth( subscriptionStartDate.getMonth() + 1);
            this.users[userIndex].subscriptionEndDate = subscriptionEndDate.toISOString();             
        }else{
            const newEndDate = new Date(endDate); 
            newEndDate.setMonth(endDate.getMonth() + 1);
            this.users[userIndex].subscriptionEndDate = newEndDate.toISOString();
        }

        
        return "subscription updated"
    }

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

            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setMonth( startDate.getMonth() + 1);

            const newUser = {
                id,
                firstName,
                lastName,
                email,
                phoneNumber,
                gender,
                subscriptionStartDate : startDate.toISOString(),
                subscriptionEndDate : endDate.toISOString()
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

    checkSubscription(email:string){
        const user = this.users.find(e=>e.email === email);

        if (!user) {
            return false;
        }

        if (new Date(user.subscriptionEndDate) > new Date()) {
            return true;
        }else{
            return false;
        }
    }
}

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../users/users.service";


// 3) ყველა პროდუქტის გამოძახებისას დაადეთ გარდი და შეამოწმეთ თუ მოყვება იმეილი და ამ იმეილით ნაპოვნ იუზერს აქვს აქტიური საბსქრიფშენი დააბრუნოს ფასდაკებული პროდუქტები თუ არადა და დააბრუნოს ჩვეულებრივი პროდუქტები.
// * გაითვალისწინეთ თუ იმეილი არ გადაეცი ჰედერში პროდუქტების წამოღების დროს ერორი არ უნდა დაარტყას და ყველა პროდუქტი უნდა დააბრუნოს.


@Injectable()
export class SubscriptionGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        if (!req.headers["email"]) {
            req["subscription"] = false;
        }else {
            const hasSubscription = this.userService.checkSubscription(req.headers["email"]);
            req["subscription"] = hasSubscription;
        }

        return true;
    }


}
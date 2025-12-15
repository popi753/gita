import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { Observable } from "rxjs/internal/Observable";
import { Role } from "../users/schemas/user.schema";


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {      
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('No authorization header provided');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token is not provided');
        }

        try {
            const payload = this.jwtService.verify(token);
            if (!(Object.values(Role).includes(payload.role))) {
                throw new UnauthorizedException('Invalid role');
            }
            req.role = payload.role;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }



    }
}

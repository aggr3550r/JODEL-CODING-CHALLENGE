import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { User } from "../schemas/user.schema";
import { UsersService } from "../users.service";


declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor (private usersService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction){
        const {userID}  = req.session || {};

        if (userID) {
            const user = await this.usersService.findOne(userID);
            req.currentUser = user;
        }

        next();
    }
}
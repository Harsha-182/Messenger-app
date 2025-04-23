import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            auth?: JwtPayload;
        }
    }
}
import { User } from "../entity/User"

export class SyncUserController {

    private userRepository = AppDataSource.getRepository(User)

    async save(request: Request, response: Response, next: NextFunction) {
        const { email, name, picture, sub, nickname } = request.body;
        if (!sub || !email) {
            return response.status(400).json({ message: "Missing user info" });
        }

        let user = await this.userRepository.findOneBy({ sub });
        if (!user) {
            user = this.userRepository.create({
            sub,
            email,
            name,
            nickname,
            picture,
            });
            await this.userRepository.save(user);
        }

        return response.status(200).json({ ...user });
    }
}
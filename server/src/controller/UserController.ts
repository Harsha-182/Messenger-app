import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include the 'auth' property
declare global {
    namespace Express {
        interface Request {
            auth?: JwtPayload;
        }
    }
}
import { User } from "../entity/User"
import { stat } from "fs";

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        if (!request.auth) {
            return { status: 401, message: "Unauthorized" };
        }
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            response.status(404).json({ message: "User not found" })
        }

        await this.userRepository.remove(userToRemove)

       return response.status(200).json({ message: "User deleted successfully" })
    }

    async search(req:Request, res: Response){
        const query = req.query.query as string;
        
        if(query && query.trim() !== ""){
            const users = await this.userRepository.createQueryBuilder('user')
            .where('LOWER(user.name) LIKE :name', { name: `${query.toLowerCase()}%` })
            .orderBy('user.name', 'ASC')
            .getMany();
        
            return res.status(200).json(users);
        }

        const allUsers = await this.userRepository.find();
        return res.status(200).json(allUsers);
    }

}
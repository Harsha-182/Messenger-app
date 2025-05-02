import { AppDataSource } from "../data-source";
import { Messages } from "../entity/Messages";
import {NextFunction, Request, Response} from "express"

export class MessageController {
    private messageRepository  = AppDataSource.getRepository(Messages)

    async all(request: Request, response: Response, next: NextFunction) {
        const senderId = parseInt(request.query.senderId as string)
        const receiverId = parseInt(request.query.recieverId as string)
        
        if(!senderId || !receiverId) {
            return { error: "Sender ID and Receiver ID are required." }
        }

        try {
            const messages = await this.messageRepository.find({
                where: [
                    { sender_id: senderId, receiver_id: receiverId },
                    { sender_id: receiverId, receiver_id: senderId }
                ],
                relations: ["sender", "receiver"],
                // order: {
                //     created_at: "ASC"
                // }
            });
            const safeMessages = messages.map(msg => ({
                id: msg.id,
                content: msg.content,
                // created_at: msg.created_at,
                sender: {
                  id: msg.sender.id,
                  name: msg.sender.name,
                },
                receiver: {
                  id: msg.receiver.id,
                  name: msg.receiver.name,
                },
              }));
              
            return safeMessages
              
        } catch(error) {
            console.error("Error fetching messages:", error);
            response.status(500).json({ error: "Internal server error" });
        }
    }

}
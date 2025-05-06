import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Notification } from "../entity/Notification";

export class NotificationController {
    private notificationRepository  = AppDataSource.getRepository(Notification)

    async addNotification(req: Request, res: Response, next: NextFunction) {
        const { sender_id, receiver_id } = req.body;
        if (!sender_id || !receiver_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await this.notificationRepository.save({
            sender_id,
            receiver_id,
            isRead: false,
          });
          
        return res.status(201).json({ success: true });
    }

    async markAsRead(req: Request, res: Response, next: NextFunction) {
        const { otherUser, currentUser } = req.body;

        if (!otherUser || !currentUser) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const updateResult = await this.notificationRepository.update(
                { sender_id: otherUser, receiver_id: currentUser, isRead: false },
                { isRead: true }
            );

            if (updateResult.affected === 0) {
                return res.status(404).json({ message: "No unread notifications found" });
            }

            return res.status(200).json({ success: true});
        } catch (error) {
            return res.status(500).json({ message: "An error occurred while updating notifications", error: error.message });
        }
    }

    async getNotification(req: Request, res: Response, next: NextFunction){
        const receiverId  = req.query.id;

        try{
            if(!receiverId){
                return res.status(400).json({message: "Missing required fields"});
            }
            const result = await this.notificationRepository
                .createQueryBuilder("notification")
                .select("notification.sender_id", "senderId")
                .addSelect("COUNT(*)", "unreadCount")
                .where("notification.receiver_id = :receiverId", { receiverId })
                .andWhere("notification.isRead = false")
                .groupBy("notification.sender_id")
                .getRawMany();

            return result.map(row => ({
                senderId: parseInt(row.senderId),
                unreadCount: parseInt(row.unreadCount)
            }));
        } catch(error) {
            res.status(400).json({message: error})
        }
    }
}
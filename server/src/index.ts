import * as dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata"
import * as express from "express"
import * as bodyParser from "body-parser"
import * as http from "http"
import { Request, Response } from "express"
import { Server } from "socket.io"
const cors = require("cors");

import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import { Messages } from "./entity/Messages"
import { checkJwt } from './middleware/auth';

AppDataSource.initialize().then(async () => {

    const app = express()
    const server = http.createServer(app)
    
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"]
        }
    })

    app.use(cors());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // register express routes from defined application routes
    Routes.forEach(route => {
        const middlewares = route.middlewares || [];

        (app as any)[route.method](
            route.route, 
            ...middlewares,
            (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // Socket.IO connection
    io.on("connection", socket => {
        console.log("New client connected:", socket.id);
      
        socket.on("sendMessage", async ({ content, senderId, receiverId }) => {
          try {
            const userRepo = AppDataSource.getRepository("User");
            const messageRepo = AppDataSource.getRepository("Messages");
      
            const sender = await userRepo.findOneBy({ id: senderId });
            const receiver = await userRepo.findOneBy({ id: receiverId });
      
            if (!sender || !receiver) {
              console.error("Sender or receiver not found. Aborting message creation.");
              socket.emit("errorMessage", "Sender or receiver not found.");
              return;
            }
      
            const message = messageRepo.create({
              content,
              sender,
              receiver
            });
      
            const savedMessage = await messageRepo.save(message);
      
            io.emit("newMessage", savedMessage);
          } catch (err) {
            console.error("Error in sendMessage:", err);
            socket.emit("errorMessage", "Server error while sending message.");
          }
        });
      
        socket.on("disconnect", () => {
          console.log("Client disconnected:", socket.id);
        });
    });
      
    server.listen(process.env.PORT)

    // insert new users for test
    // Create users
    // const user1 = new User()
    // user1.name = "testuser1"
    // user1.email = "test1@example.com"
    // user1.nickname = "test"
    // user1.sub = "skdbvjkdfvhuv"
    // user1.picture = "https://example.com/image.jpg"
    // await AppDataSource.manager.save(user1)

    // const user2 = new User()
    // user2.name = "testuser2"
    // user2.email = "test2@example.com"
    // user2.nickname = "test"
    // user2.sub = "jkfvbjbdfvbdf"
    // user2.picture = "https://example.com/image.jpg"
    // await AppDataSource.manager.save(user2)

    // // Create a message from alice to bob
    // const message = new Messages()
    // message.content = "Hello test2!, How are u"
    // message.sender = user1
    // message.receiver = user2
    // await AppDataSource.manager.save(message);

    // console.log("Seed data inserted successfully")

    console.log(`Server is running on port ${process.env.PORT}`)

}).catch(error => console.log(error));

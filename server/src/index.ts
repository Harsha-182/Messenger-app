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

AppDataSource.initialize().then(async () => {

    const app = express()
    const server = http.createServer(app)
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    })
    app.use(cors());

    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
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
      
    // start express server
    server.listen(4000)

    // insert new users for test
    // Create users
    const user1 = new User()
    user1.username = "test1"
    user1.email = "test1@example.com"
    user1.password = "password1"
    user1.age = 25
    await AppDataSource.manager.save(user1)

    const user2 = new User()
    user2.username = "test2"
    user2.email = "test2@example.com"
    user2.password = "password2"
    user2.age = 30
    await AppDataSource.manager.save(user2)

    // Create a message from alice to bob
    const message = new Messages()
    message.content = "Hello test2!, How are u"
    message.sender = user1
    message.receiver = user2
    await AppDataSource.manager.save(message);

    console.log("Seed data inserted successfully")

    console.log("Express server has started on port 4000. Open http://localhost:4000/users to see results")

}).catch(error => console.log(error));

import "reflect-metadata"
import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import { Messages } from "./entity/Messages"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
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

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

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
    await AppDataSource.manager.save(message)

    console.log("Seed data inserted successfully ✅")

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error));

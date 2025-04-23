import { UserController } from "./controller/UserController"
import { MessageController }  from "./controller/MessageController"
import { checkJwt } from './middleware/auth';
import { SyncUserController } from "./controller/SyncUserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middlewares: [checkJwt]
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "get",
    route: "/messages",
    controller: MessageController,
    action: "all"
},{
    method: "post",
    route: "/syncuser",
    controller: SyncUserController,
    action: "save",
    // middlewares: [checkJwt]
}
]
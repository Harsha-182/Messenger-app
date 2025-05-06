import { UserController } from "./controller/UserController"
import { MessageController }  from "./controller/MessageController"
import { checkJwt } from './middleware/auth';
import { SyncUserController } from "./controller/SyncUserController";
import { NotificationController } from "./controller/NotificationController";

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
},{
    method: 'get',
    route: '/search',
    controller: UserController,
    action: 'search',
},
{
    method: 'post',
    route: '/notifications',
    controller: NotificationController,
    action: 'addNotification',
},
{
    method: 'post',
    route: '/notifications/mark-as-read',
    controller: NotificationController,
    action: 'markAsRead'
},
{
    method: "get",
    route: "/notification",
    controller: NotificationController,
    action: 'getNotification',
},
]
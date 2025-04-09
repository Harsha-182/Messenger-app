import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Messages } from "./entity/Messages"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Cel182@wtc",
    database: "Messenger",
    synchronize: false,
    logging: false,
    entities: [User, Messages],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
})

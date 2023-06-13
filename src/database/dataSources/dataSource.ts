import { DataSource } from "typeorm";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "a",
    database: "BancoUsuarios",
    entities: ['src/database/Entities/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
})

PostgresDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
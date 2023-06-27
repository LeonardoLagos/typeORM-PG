import { DataSource } from "typeorm";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "a",
    database: "BancoUsuarios",
    entities: ['src/Database/entities/*.ts'],
    migrations: ['src/Database/migrations/*.ts'],
})

PostgresDataSource.initialize()
    .then(() => {
        // console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        // console.error("Error during Data Source initialization", err)
    })
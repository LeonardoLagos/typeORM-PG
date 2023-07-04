import { DataSource } from "typeorm";

export const dataSourceTest = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "a",
    database: "BancoUsuariosTest",
    entities: ['src/Database/entities/*.ts'],
    migrations: ['src/Database/migrations/*.ts'],
})

dataSourceTest.initialize()
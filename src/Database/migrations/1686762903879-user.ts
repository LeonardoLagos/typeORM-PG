import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1686762903879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usuarios",
                columns: [
                    {
                        name: "id",
                        type: "serial4",
                        isPrimary: true
                    },
                    {
                        name: "login",
                        type: "varchar"
                    },
                    {
                        name: "senha",
                        type: "varchar"
                    },
                    {
                        name: "cod_cidade",
                        type: "int"
                    },
                    {
                        name: "nivel_acesso",
                        type: "int"
                    },
                    {
                        name: "status",
                        type: "int"
                    }
                ],
                foreignKeys: [
                    {

                        name: "fk_users_cidade",
                        columnNames: ["cod_cidade"],
                        referencedTableName: "cidades",
                        referencedColumnNames: ["id"]
                    },
                    {

                        name: "fk_users_niveis_acesso",
                        columnNames: ["nivel_acesso"],
                        referencedTableName: "niveis_acesso",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )

        queryRunner.query(
            `insert into usuarios(login, senha, cod_cidade, nivel_acesso, status) values ('ADMTeste', 'a', 1,1,1)`,
        )

        queryRunner.query(
            `insert into usuarios(login, senha, cod_cidade, nivel_acesso, status) values ('UsuariosTeste1', 'a', 1,2,1)`,
        )

        queryRunner.query(
            `insert into usuarios(login, senha, cod_cidade, nivel_acesso, status) values ('UsuariosTeste2', 'a', 1,2,1)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuarios")
    }
}
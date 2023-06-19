import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1686762903879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
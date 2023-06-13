import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1686601720440 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "firstname",
                        type: "varchar"
                    },
                    {
                        name: "lastname",
                        type: "varchar"
                    },
                    {
                        name: "isactive",
                        type: "boolean"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
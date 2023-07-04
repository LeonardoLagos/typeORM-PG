import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCidades1686754189320 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: "cidades",
            columns: [
                {
                    name: "id",
                    type: "serial4",
                    isPrimary: true
                },
                {
                    name: "descricao",
                    type: "varchar"
                },
                {
                    name: "uf",
                    type: "varchar"
                }
            ]
        }))

        await queryRunner.query(
            `insert into cidades(descricao, UF) values ('CUIABA', 'MT')`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cidades")

    }

}

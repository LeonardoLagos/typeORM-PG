import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateNiveisAcesso1686601720440 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(new Table({
            name: "niveis_acesso",
            columns: [
                {
                    name: "id",
                    type: "serial4",
                    isPrimary: true
                },
                {
                    name: "descricao",
                    type: "varchar"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("niveis_acesso")
    }

}

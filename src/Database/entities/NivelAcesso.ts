import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("niveis_acesso")
export class NivelAcesso {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descricao: string
}
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("cidades")
export class Cidades{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    descricao: string

    @Column()
    uf: string
}
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("usuarios")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @Column()
    senha: string

    @Column()
    cidade: string

    @Column()
    nivel_acesso: number

    @Column()
    status: number
}
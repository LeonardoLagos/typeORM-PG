import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Cidades } from "./Cidades"
import { NivelAcesso } from "./NivelAcesso"

@Entity("usuarios")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @Column()
    senha: string

    @Column()
    cod_cidade: number

    @ManyToOne(() => Cidades)
    @JoinColumn({name: "cod_cidade"})
    cidade: Cidades

    @Column()
    nivel_acesso: number

    @ManyToOne(() => NivelAcesso)
    @JoinColumn({name: "nivel_acesso"})
    nivelAcessoObj: NivelAcesso

    @Column()
    status: number
}
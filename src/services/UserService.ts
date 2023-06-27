import { Repository } from "typeorm";
import {PostgresDataSource as db} from "../Database/dataSources/dataSource"
import {User} from "../Database/entities/User"
import jwt from 'jsonwebtoken'

type UsuarioRequest = {
    login: string;
    senha: string;
    cod_cidade: string;
    nivel_acesso: number;
}

type LoginRequest = {
    login: string;
    senha: string;
}

export class UserService {
    repo: Repository<User>
    constructor(
        repository = db.getRepository(User)
    ){
        this.repo = repository
    }

    createUser = async ({login, senha, cod_cidade, nivel_acesso}: UsuarioRequest): Promise<User | Error> => {
        if((await this.repo.findOne({where: { login: login, cod_cidade: Number.parseInt(cod_cidade)}}))){
            return new Error("Login já existente!")
        }
        
        const category = this.repo.create({
            login: login,
            senha: senha,
            cod_cidade: Number.parseInt(cod_cidade),
            nivel_acesso: nivel_acesso,
            status: 1
        })

        await this.repo.save(category)

        return category
    }

    deleteUser = async (id: string): Promise<User | Error> => {        
        const itemDb = await this.repo.findOne({where: {id: Number.parseInt(id)}})
        if(!itemDb){
            return new Error("Usuário inexistente!")
        }

        this.repo.delete(itemDb)
        return itemDb;
    }

    getAllUsers = async (): Promise<User[] | Error> => {
        const categories = await this.repo.find({
            relations: ["cidade", "nivelAcessoObj"]
        });

        return categories;
    }

    updateUser = async ({login, senha, cod_cidade, nivel_acesso}: UsuarioRequest) =>{
        const category = await this.repo.findOne({where: {login:login, senha: senha}});

        if(!category){
            return new Error("Usuário Inexistente!")
        }

        category.login = login ? login : category.login
        category.senha = senha ? senha : category.senha
        category.cod_cidade = Number.parseInt(cod_cidade) ? Number.parseInt(cod_cidade) : category.cod_cidade
        category.nivel_acesso = nivel_acesso ? nivel_acesso : category.nivel_acesso

        await this.repo.save(category)

        return category;
    }

    validateUser = async ({login, senha}:LoginRequest) => {
        const category = await this.repo.findOne({where: {login: login, senha: senha}})
        if(category){
            const token = jwt.sign({ login: login, senha: senha }, process.env.JWT_SECRET, {
                expiresIn: 3600

              });
              return token;
        }else{
            return new Error("Usuario e/ou senha incorretos!");
        }
    }
}

import { User } from "../Entities/User";
import { PostgresDataSource } from "../dataSources/dataSource";
require("dotenv-safe").config();
import jwt from 'jsonwebtoken'
type UsuarioValidateRequest = {
    login: string;
    senha: string;
}

export class ValidateUserService{
    async execute({login, senha}: UsuarioValidateRequest){
        const repo = PostgresDataSource.getRepository(User)

        const category = await repo.findOne({where: {login: login, senha: senha}})
        if(category){
            const token = jwt.sign({ login: login, senha: senha }, process.env.JWT_SECRET, {
                expiresIn: 300

              });
              return token;
        }else{
            return new Error("Usuario e/ou senha incorretos!");
        }
    }
}
import { User } from "../Entities/User";
import { PostgresDataSource } from "../dataSources/dataSource";

type UsuarioValidateRequest = {
    login: string;
    senha: string;
}

export class ValidateUserService{
    async execute({login, senha}: UsuarioValidateRequest){
        const repo = PostgresDataSource.getRepository(User)

        const category = await repo.findOne({where: [{login: login}, {senha: senha}]})
        if(category){
            return category;
        }else{
            return new Error("Usuario e/ou senha incorretos!");
        }

    }
}
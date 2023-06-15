import { User } from "../Entities/User";
import { PostgresDataSource } from "../dataSources/dataSource";

type UsuarioUpdateRequest = {
    id:string;
    login: string;
    senha: string;
    cod_cidade: string;
    nivel_acesso: number;
}

export class UpdateUserService{
    async execute({id, login, senha, cod_cidade, nivel_acesso}: UsuarioUpdateRequest){
        const repo = PostgresDataSource.getRepository(User)

        const category = await repo.findOne({where: {id: Number.parseInt(id)}});

        if(!category){
            return new Error("Usuário Inexistente!")
        }

        category.login = login ? login : category.login
        category.senha = senha ? senha : category.senha
        category.cod_cidade = Number.parseInt(cod_cidade) ? Number.parseInt(cod_cidade) : category.cod_cidade
        category.nivel_acesso = nivel_acesso ? nivel_acesso : category.nivel_acesso

        await repo.save(category)

        return category;
    }
}
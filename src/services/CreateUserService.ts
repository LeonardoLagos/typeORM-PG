import {PostgresDataSource as db} from "../dataSources/dataSource"
import {User} from "../Entities/User"

type UsuarioRequest = {
    login: string;
    senha: string;
    cod_cidade: string;
    nivel_acesso: number;
}

export class CreateUserService {
    async execute({login, senha, cod_cidade, nivel_acesso}: UsuarioRequest): Promise<User | Error> {
        const repo = db.getRepository(User)
        
        if((await repo.findOne({where: { login: login, cod_cidade: Number.parseInt(cod_cidade)}}))){
            return new Error("Login já existente!")
        }
        
        const category = repo.create({
            login: login,
            senha: senha,
            cod_cidade: Number.parseInt(cod_cidade),
            nivel_acesso: nivel_acesso,
            status: 1
        })

        await repo.save(category)

        return category
    }
}

import {PostgresDataSource as db} from "../dataSources/dataSource"
import {User} from "../Entities/User"

type UsuarioRequest = {
    login: string;
    senha: string;
    cidade: string;
    nivel_acesso: number;
}

export class CreateUserService {
    async execute({login, senha, cidade, nivel_acesso}: UsuarioRequest): Promise<User | Error> {
        const repo = db.getRepository(User)
        
        if((await repo.findOne({where: [ { login: login }, { cidade: cidade} ]}))){
            return new Error("Login já existente!")
        }
        
        const category = repo.create({
            login: login,
            senha: senha,
            cidade: cidade,
            nivel_acesso: nivel_acesso,
            status: 1
        })

        await repo.save(category)

        return category
    }
}

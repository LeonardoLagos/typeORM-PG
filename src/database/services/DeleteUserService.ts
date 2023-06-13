import { PostgresDataSource as db } from "../dataSources/dataSource";
import {User} from "../Entities/User"

export class DeleteUserService{
    async execute(id: string): Promise<User | Error>{
        const repo = db.getRepository(User)
        
        const itemDb = await repo.findOne({where: {id: Number.parseInt(id)}})
        if(!itemDb){
            return new Error("Usuário inexistente!")
        }

        repo.delete(itemDb)
        return itemDb;
    }
}
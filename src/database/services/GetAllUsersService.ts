import {PostgresDataSource as db} from "../dataSources/dataSource"
import {User} from "../Entities/User"

export class GetAllUsersService {
    async execute(): Promise<User[] | Error> {
        const repo = db.getRepository(User)

        const categories = await repo.find({
            relations: ["cidade", "nivelAcessoObj"]
        });

        return categories;
    }
}
import { Request, Response } from "express";
import { GetAllUsersService } from "../services/GetAllUsersService";

export class GetAllUserController {
    async handle(request: Request, response: Response){
        const {login, senha, cidade, nivel_acesso} = request.body;

        const service = new GetAllUsersService();

        const result = await service.execute()

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json(result);
    }
}
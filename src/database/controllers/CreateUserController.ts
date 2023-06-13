import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
    async handle(request: Request, response: Response){
        const {login, senha, cidade, nivel_acesso} = request.body;

        const service = new CreateUserService();

        const result = await service.execute({login, senha, cidade, nivel_acesso})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(201).json(result);
    }
}
import { Request, Response } from "express";
import { ValidateUserService } from "../services/ValidateUserService";

export class ValidateUserController{
    async handle(request:Request, response:Response){
        const service = new ValidateUserService()
        const {login, senha} = request.body;
        const result = await service.execute({login, senha})

        if(result instanceof Error){
            return response.status(401).json(result.message)
        }

        return response.status(200).json(result)
    }
}
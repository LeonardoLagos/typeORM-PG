import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

export class UpdateUserController{
    async handle(request:Request, response:Response){

        const service = new UpdateUserService();

        const { id } = request.params;
        const {login, senha, cod_cidade, nivel_acesso} = request.body;
        const result = await service.execute({id, login, senha, cod_cidade, nivel_acesso})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json(result);
    }
}
import {  FindOneOptions, Repository, QueryRunner, DataSource, Migration, FindManyOptions, DeepPartial, FindOptionsWhere, ObjectId, SaveOptions } from "typeorm";
import { User } from "../../Database/entities/User";
import { UserService } from "../UserService";
import { Request } from "express";
import { dataSourceTest as db} from "../../Database/dataSources/dataSourceTest";

var repo:Repository<User>
var mockRepository:Partial<Repository<User>> 
var mockUserService:UserService
var database:DataSource
var migrations:Migration[]

describe('UserService', () => {
    beforeAll(async () =>{
        database = await db.initialize()
        repo = await db.getRepository(User)
        mockRepository = {
            findOne: jest.fn((op:FindOneOptions) => repo.findOne(op)),
            find: jest.fn((op:FindManyOptions) => repo.find(op)),
            delete: jest.fn((criteria: string | string[] | number | number[] | Date 
            | Date[] | ObjectId | ObjectId[] 
            | FindOptionsWhere<User>) => repo.delete(criteria)),
            save: jest.fn((entity: User[], options: SaveOptions & {
                reload: false;
            }) => repo.save(entity, options))
        }

        mockUserService = new UserService(mockRepository as Repository<User>)
        migrations = await database.runMigrations({
            transaction: 'all'
        })
    })

    afterAll(async() => {
        for(const migration of migrations){
            await database.undoLastMigration()
        }
        await database.destroy()
    })

    const mockRequest = ({
        body:{
            login: 'adm2',
            senha: '1',
            cod_cidade: 1,
            nivel_acesso: 1,
            status:1
        },params: {
            id:"4"
        }
    } as unknown) as Request

    test('Deve criar um usuário no banco de dados', async () => {
        await mockUserService.createUser({
            login: mockRequest.body.login, 
            senha: mockRequest.body.senha, 
            cod_cidade: mockRequest.body.cod_cidade,
            nivel_acesso: mockRequest.body.nivel_acesso})
        
        expect(mockRepository.findOne).toBeCalledWith({
            where: {login: mockRequest.body.login,
            cod_cidade: mockRequest.body.cod_cidade}})

        let obj = {
            login: mockRequest.body.login, 
            senha: mockRequest.body.senha, 
            cod_cidade: mockRequest.body.cod_cidade,
            nivel_acesso: mockRequest.body.nivel_acesso,
            status: mockRequest.body.status,
            id: 4}

        expect(mockRepository.save).toBeCalledWith(obj)
        expect(obj)
    });
    
    test('Deve atualizar um usuário do banco de dados', async () => {
        await mockUserService.updateUser({
            login: mockRequest.body.login, 
            senha: mockRequest.body.senha, 
            cod_cidade: mockRequest.body.cod_cidade,
            nivel_acesso: 2})

        expect(mockRepository.findOne).toBeCalledWith({
            where: {login: mockRequest.body.login,
            senha: mockRequest.body.senha}})

        let objDb = {
            login: mockRequest.body.login, 
            senha: mockRequest.body.senha, 
            cod_cidade: mockRequest.body.cod_cidade,
            nivel_acesso: 2,
            id: 4,
            status: 1
        }

        expect(mockRepository.save).toBeCalledWith(objDb)
        expect(objDb)
    })

    test('Deve retornar todos os usuários do banco de dados', async () => {
        let result = await repo.find({relations: ["cidade", "nivelAcessoObj"]})
        
        await mockUserService.getAllUsers()

        expect(mockRepository.find).toBeCalledWith({relations: ["cidade", "nivelAcessoObj"]})
        expect(result)
    })

    test('Deve deletar um usuário do banco de dados', async () => {

        let user = await repo.findOne({where: {id: Number.parseInt(mockRequest.params.id)}});

        await mockUserService.deleteUser(mockRequest.params.id)

        expect(mockRepository.findOne).toBeCalledWith({where: {
            id: parseInt(mockRequest.params.id)
        }})

        expect(mockRepository.delete).toBeCalledWith(user)
        
        expect(user)
    })
    // test('Deve deletar um usuário do banco de dados', async () => {
    //     let response = await mockUserService.deleteUser(mockRequest.params.id)

    //     expect(mockRepository.delete).toBeCalled()
    //     expect(response).toMatchObject({message: "Usuário deletado"})
    // });
})
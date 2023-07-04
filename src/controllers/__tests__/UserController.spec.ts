import { UserService } from "../../services/UserService"
import {dataSourceTest as db} from "../../Database/dataSources/dataSourceTest"
import { User } from "../../Database/entities/User"
import { UserController } from "../UserController"
import { Request } from 'express'
import { makeMockResponse } from "../../__mocks__/mockResponse.mock";
import { DataSource, Migration } from "typeorm"
var mockUserService: UserService
var userController:UserController
var database:DataSource
var migrations:Migration[]

describe('UserController', () => {
    beforeAll(async () => {
        database = await db.initialize()
        let repo = await database.getRepository(User)
        migrations = await database.runMigrations({
            transaction: 'all'
        })
        
        let userService = new UserService(repo)
        mockUserService = {
            createUser: jest.fn(userService.createUser),
            deleteUser: jest.fn(userService.deleteUser),
            getAllUsers: jest.fn(userService.getAllUsers),
            updateUser: jest.fn(userService.updateUser),
            validateUser: jest.fn(userService.validateUser),
            repo: repo
        }
        userController = new UserController(mockUserService)
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
            cod_cidade: '1',
            nivel_acesso: 1
        },params: {
            id:"4"
        }
    } as unknown) as Request

    test('Deve criar um novo usuário', async () =>{
        const mockResponse = makeMockResponse()

        await userController.createUser(mockRequest, mockResponse)
 
        expect(mockUserService.createUser).toBeCalledWith({
            login: mockRequest.body.login, 
            senha: mockRequest.body.senha, 
            cod_cidade: mockRequest.body.cod_cidade,
            nivel_acesso: mockRequest.body.nivel_acesso})

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: "Usuario criado"})
        console.log(mockResponse.state.json)
    })

    test('Deve atualizar um usuário', async () => {
        const mockResponse = makeMockResponse()

        await userController.updateUser(mockRequest, mockResponse)

        expect(mockUserService.updateUser).toBeCalledWith({
            login: mockRequest.body.login, 
            senha: mockRequest.body.senha, 
            cod_cidade: mockRequest.body.cod_cidade,
            nivel_acesso: mockRequest.body.nivel_acesso})

        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message:"Usuário atualizado" })
        console.log(mockResponse.state.json)
    })

    test('Deve retornar todos os Usuários', async () => {
        let serviceResponse = await mockUserService.getAllUsers()
        const mockResponse = makeMockResponse()

        await userController.getAllUsers(mockRequest, mockResponse)

        expect(mockUserService.getAllUsers).toBeCalled()
        
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toStrictEqual(serviceResponse)
        console.log(mockResponse.state.json)
    })

    test('Deve deletar um usuário', async () => {
        const mockResponse = makeMockResponse()

        await userController.deleteUser(mockRequest, mockResponse)

        expect(mockUserService.deleteUser).toBeCalledWith(mockRequest.params.id)

        expect(mockResponse.state.status).toBe(204)
        expect(mockResponse.state.json).toMatchObject({ message:"Usuario deleteado" })
        console.log(mockResponse.state.json)
    })
})
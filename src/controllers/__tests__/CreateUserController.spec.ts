import { UserService } from "../../services/UserService"
import {PostgresDataSource as db} from "../../Database/dataSources/dataSource"
import { User } from "../../Database/entities/User"
import { UserController } from "../UserController"
import { Request } from 'express'
import { makeMockResponse } from "../../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: UserService = {
        createUser: jest.fn(),
        deleteUser: jest.fn(),
        getAllUsers: jest.fn(),
        updateUser: jest.fn(),
        validateUser: jest.fn(),
        repo: db.getRepository(User)
    }

    const userController = new UserController(mockUserService)

    it('Deve criar um novo usuário', async () =>{
        const mockRequest = {
            body:{
                login: 'adm1',
                senha: '1',
                cod_cidade: '1',
                nivel_acesso: '1'
            }
        } as Request

        let serviceResponse = await mockUserService.createUser({login: mockRequest.body.login, 
        senha: mockRequest.body.senha, cod_cidade: mockRequest.body.cod_cidade,
        nivel_acesso: mockRequest.body.nivel_acesso})

        const mockResponse = makeMockResponse()
        await userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)

        expect(mockUserService.createUser).toBeCalledWith({login: mockRequest.body.login, 
            senha: mockRequest.body.senha, cod_cidade: mockRequest.body.cod_cidade,
            nivel_acesso: mockRequest.body.nivel_acesso})
        expect(mockResponse.state.json).toBe(serviceResponse)
    })

    it('Deve deletar um usuário', async () => {
        const mockRequest = {
        } as Request
        mockRequest.params = {
            id:"1"
        }
        let serviceResponse = await mockUserService.deleteUser('1')

        const mockResponse = makeMockResponse()
        await userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(204)

        expect(mockUserService.deleteUser).toBeCalledWith('1')
        expect(mockResponse.state.json).toBe(serviceResponse)
    })

    it('Deve retornar todos os Usuários', async () => {
        const mockRequest = {
        } as Request
        
        let serviceResponse = await mockUserService.getAllUsers()

        const mockResponse = makeMockResponse()
        await userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)

        expect(mockUserService.getAllUsers).toBeCalled()
        expect(mockResponse.state.json).toBe(serviceResponse)
    })
})
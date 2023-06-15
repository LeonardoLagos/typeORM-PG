import {Router} from "express"
import { CreateUserController } from "../controllers/CreateUserController";
import { GetAllUserController } from "../controllers/GetAllUsersController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { ValidateUserController } from "../controllers/ValidateUserController";

const routes = Router();
routes.post("/usuario", new CreateUserController().handle)
routes.get("/usuario", new GetAllUserController().handle)
routes.delete("/usuario/:id", new DeleteUserController().handle)
routes.put("/usuario/:id", new UpdateUserController().handle)
routes.post("/validacao", new ValidateUserController().handle)
export {routes}
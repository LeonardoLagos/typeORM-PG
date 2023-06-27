import {Router, request} from "express"
import { UserController } from "./controllers/UserController";
import { verifyAuth } from "./midlleware/verifyAuth";

const routes = Router();
routes.post("/usuario",  new UserController().createUser)
routes.get("/usuario",  new UserController().getAllUsers)
routes.delete("/usuario/:id",  new UserController().deleteUser)
routes.put("/usuario/:id",  new UserController().updateUser)
routes.post("/validacao", new UserController().validateUser)
export {routes}
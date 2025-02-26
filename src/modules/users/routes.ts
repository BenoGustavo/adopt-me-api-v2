import { MakeUserService } from "@/modules/users";
import { FastifyInstance } from "fastify";
import { UserController } from "./controllers/UserController";

export async function registerUserRoutes(app: FastifyInstance) {
    const userService = MakeUserService();
    const userController = new UserController(userService);
    
    app.post("/users", (req, res) => userController.register(req, res));
    app.post("/users/login", (req, res) => userController.login(req, res));
}

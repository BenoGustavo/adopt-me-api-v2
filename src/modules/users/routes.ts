import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";
import { UserRepository } from "./repositories/UserRepository";
import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

export async function registerUserRoutes(app: FastifyInstance) {
    const prisma = new PrismaClient();
    const userController = new UserController(new UserService(new UserRepository(prisma)));
    
    app.post("/users", (req, res) => userController.register(req, res));
    app.post("/users/login", (req, res) => userController.login(req, res));
}

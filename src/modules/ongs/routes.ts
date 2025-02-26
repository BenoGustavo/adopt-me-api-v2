import { FastifyInstance } from "fastify";
import { OngController } from "./controllers/OngController";
import { OngService } from "./services/OngService";
import { OngRepository } from "./repositories/OngRepository";
import { PrismaClient } from "@prisma/client";


export async function registerOngRoutes(app: FastifyInstance){
        const prisma = new PrismaClient();
        const ongController = new OngController(new OngService(new OngRepository(prisma)));

        app.post("/ongs", (req, res) => ongController.register(req, res));
        app.post("/ongs/login", (req, res) => ongController.login(req, res));
}
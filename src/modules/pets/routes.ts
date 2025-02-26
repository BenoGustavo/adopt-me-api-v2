import { FastifyInstance,FastifyReply,FastifyRequest } from "fastify";
import { PetController } from "./controllers/PetController";
import { PetService } from "./services/PetService";
import { PetRepository } from "./repositories/PetRepository";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "@/middleware/auth";
import { OngRepository } from "@/modules/ongs";
import { UserRepository } from "../users";

export async function registerPetRoutes(app: FastifyInstance){
    const prisma = new PrismaClient();
    const petController = new PetController(new PetService(new PetRepository(prisma), new OngRepository(prisma), new UserRepository(prisma)));
    
    app.post("/pets", { preHandler: authMiddleware }, (req, res) => petController.create(req, res));
    
    app.get("/pets/:city/filters", 
        { preHandler: authMiddleware },
        (req: any, res: FastifyReply) => petController.findPets(req, res));
    
    app.get("/pets/:id", (
        req: FastifyRequest<{ Params: { id: string } }>,
        res) => petController.findPetById(req, res));

    
    app.put("/pets/:id/adopt", { preHandler: authMiddleware },(req: any, res) => petController.adoptPet(req, res));
    
    app.get("/pets/adopted", { preHandler: authMiddleware }, (req: any, res) => petController.getAdoptedPets(req, res));

    app.delete("/pets/:id", { preHandler: authMiddleware },(req: any, res) => petController.deletePet(req, res));
}
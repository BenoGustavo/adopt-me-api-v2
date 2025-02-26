import { authMiddleware } from "@/middleware/auth";
import { MakePetService } from "@/modules/pets";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PetController } from "@/modules/pets";

export async function registerPetRoutes(app: FastifyInstance){
    const petService = MakePetService();
    const petController = new PetController(petService);
    
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
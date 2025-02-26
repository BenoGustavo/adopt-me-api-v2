import { FastifyInstance } from "fastify";
import { registerUserRoutes } from "@/modules/users";
import { registerPetRoutes } from "@/modules/pets";
import { registerOngRoutes } from "@/modules/ongs";

export async function registerRoutes(app: FastifyInstance) {
    registerUserRoutes(app);
    registerPetRoutes(app);
    registerOngRoutes(app);
}

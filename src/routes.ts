import { registerOngRoutes } from "@/modules/ongs";
import { registerPetRoutes } from "@/modules/pets";
import { registerUserRoutes } from "@/modules/users";
import { FastifyInstance } from "fastify";

export async function registerRoutes(app: FastifyInstance) {
	registerUserRoutes(app);
	registerPetRoutes(app);
	registerOngRoutes(app);
}

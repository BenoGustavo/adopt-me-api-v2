import { MakeOngService } from "@/modules/ongs";
import { FastifyInstance } from "fastify";
import { OngController } from "./controllers/OngController";

export async function registerOngRoutes(app: FastifyInstance){
        const ongService = MakeOngService(); 
        const ongController = new OngController(ongService);

        app.post("/ongs", (req, res) => ongController.register(req, res));
        app.post("/ongs/login", (req, res) => ongController.login(req, res));
}
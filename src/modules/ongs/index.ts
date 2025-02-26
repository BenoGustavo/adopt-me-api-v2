import { OngRepository } from "./repositories/OngRepository";
import { OngController } from "./controllers/OngController";
import { OngService } from "./services/OngService";
import { registerOngRoutes } from "./routes";
import { CreateOngDTO } from "./dtos/OngDTO";

export {
    OngRepository,
    OngController,
    OngService,
    registerOngRoutes,
    CreateOngDTO
}
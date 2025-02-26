import { OngRepository } from "./repositories/prisma/OngRepository";
import { OngController } from "./controllers/OngController";
import { OngService } from "./services/OngService";
import { registerOngRoutes } from "./routes";
import { CreateOngDTO } from "./dtos/OngDTO";
import { CreateOngDtoType } from "./dtos/OngDTO";
import { IOngRepository } from "./repositories/interface/IOngRepository";
import { MakeOngService } from "./services/factories/MakeOngService";

export {
    OngRepository,
    OngController,
    OngService,
    registerOngRoutes,
    CreateOngDTO,
    MakeOngService
}

export type {
    CreateOngDtoType,
    IOngRepository
}
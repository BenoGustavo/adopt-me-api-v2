import { PetSize, PetType } from "@prisma/client";
import { PetController } from "./controllers/PetController";
import { CreatePetDTO, CreatePetDTOType } from "./dtos/PetDTO";
import { PetRepository } from "./repositories/prisma/PetRepository";
import { IPetRepository } from "./repositories/interfaces/IPetRepository";
import { registerPetRoutes } from "./routes";
import { PetService } from "./services/PetService";
import { MakePetService } from "./services/factories/MakePetService";

export {
    PetController,
    CreatePetDTO,
    PetRepository,
    registerPetRoutes,
    PetService,
    PetSize,
    PetType,
    MakePetService
}

export type {
    IPetRepository,
    CreatePetDTOType
}
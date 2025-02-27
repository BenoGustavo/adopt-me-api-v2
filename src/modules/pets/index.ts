import { PetSize, PetType } from "@prisma/client";
import { PetController } from "./controllers/PetController";
import { CreatePetDTO, CreatePetDTOType } from "./dtos/PetDTO";
import { IPetRepository } from "./repositories/interfaces/IPetRepository";
import { PetRepository } from "./repositories/prisma/PetRepository";
import { registerPetRoutes } from "./routes";
import { PetService } from "./services/PetService";
import { MakePetService } from "./services/factories/MakePetService";

export {
	CreatePetDTO,
	MakePetService,
	PetController,
	PetRepository,
	PetService,
	PetSize,
	PetType,
	registerPetRoutes,
};

export type { CreatePetDTOType, IPetRepository };

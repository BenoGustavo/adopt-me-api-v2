import { OngController } from "./controllers/OngController";
import { CreateOngDTO, CreateOngDtoType } from "./dtos/OngDTO";
import { IOngRepository } from "./repositories/interface/IOngRepository";
import { OngRepository } from "./repositories/prisma/OngRepository";
import { registerOngRoutes } from "./routes";
import { MakeOngService } from "./services/factories/MakeOngService";
import { OngService } from "./services/OngService";

export {
	CreateOngDTO,
	MakeOngService,
	OngController,
	OngRepository,
	OngService,
	registerOngRoutes,
};

export type { CreateOngDtoType, IOngRepository };

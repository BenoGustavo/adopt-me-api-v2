import { UserController } from "./controllers/UserController";
import { CreateUserDTO, CreateUserDtoType } from "./dtos/UserDTO";
import { IUserRepository } from "./repositories/interfaces/IUserRepository";
import { UserRepository } from "./repositories/prisma/UserRepository";
import { registerUserRoutes } from "./routes";
import { UserService } from "./services/UserService";
import { MakeUserService } from "./services/factories/MakeUserService";

export {
	CreateUserDTO,
	MakeUserService,
	registerUserRoutes,
	UserController,
	UserRepository,
	UserService,
};

export type { CreateUserDtoType, IUserRepository };

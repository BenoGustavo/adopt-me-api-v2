import { UserController } from "./controllers/UserController";
import { CreateUserDTO, CreateUserDtoType } from "./dtos/UserDTO";
import { UserRepository } from "./repositories/prisma/UserRepository";
import { IUserRepository } from "./repositories/interfaces/IUserRepository";
import { registerUserRoutes } from "./routes";
import { UserService } from "./services/UserService";
import { MakeUserService } from "./services/factories/MakeUserService";


export {
    UserController,
    CreateUserDTO,
    UserRepository,
    registerUserRoutes,
    UserService,
    MakeUserService
}

export type {
    IUserRepository,
    CreateUserDtoType
}
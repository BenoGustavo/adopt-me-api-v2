import { PrismaClient } from "@prisma/client";
import { UserRepository } from "@/modules/users"
import { UserService } from "@/modules/users";

export function MakeUserService() {
    // Return a new instance of UserService
    return new UserService(new UserRepository(new PrismaClient()));
}
import { UserRepository, UserService } from "@/modules/users";
import { PrismaClient } from "@prisma/client";

export function MakeUserService() {
	// Return a new instance of UserService
	return new UserService(new UserRepository(new PrismaClient()));
}

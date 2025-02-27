import { OngRepository } from "@/modules/ongs";
import { PetRepository, PetService } from "@/modules/pets";
import { UserRepository } from "@/modules/users";
import { PrismaClient } from "@prisma/client";

export function MakePetService() {
	const prisma = new PrismaClient();

	return new PetService(
		new PetRepository(prisma),
		new OngRepository(prisma),
		new UserRepository(prisma),
	);
}

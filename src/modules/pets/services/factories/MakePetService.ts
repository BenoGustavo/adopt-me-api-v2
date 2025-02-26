import { PrismaClient } from "@prisma/client"
import { PetService } from "@/modules/pets"
import { PetRepository } from "@/modules/pets"
import { OngRepository } from "@/modules/ongs"
import { UserRepository } from "@/modules/users"

export function MakePetService() {
    const prisma = new PrismaClient()

    return new PetService(
        new PetRepository(prisma),
        new OngRepository(prisma),
        new UserRepository(prisma))
}
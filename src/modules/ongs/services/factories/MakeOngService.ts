import { OngService } from "../OngService"
import { OngRepository } from "@/modules/ongs/repositories/prisma/OngRepository";
import { PrismaClient } from "@prisma/client";

export function MakeOngService() {
    const prisma = new PrismaClient();
    return new OngService(new OngRepository(prisma));
}
import { OngRepository } from "@/modules/ongs/repositories/prisma/OngRepository";
import { PrismaClient } from "@prisma/client";
import { OngService } from "../OngService";

export function MakeOngService() {
	const prisma = new PrismaClient();
	return new OngService(new OngRepository(prisma));
}

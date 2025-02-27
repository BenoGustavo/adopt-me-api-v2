import { Address, ONG } from "@prisma/client";
import { CreateOngDtoType } from "../../dtos/OngDTO";

export interface IOngRepository {
	create(
		data: CreateOngDtoType,
	): Promise<{
		id: string;
		name: string;
		email: string;
		whatsapp: string;
		address: Address;
	}>;
	findByEmail(
		email: string,
	): Promise<{
		id: string;
		name: string;
		email: string;
		whatsapp: string;
		pets: any;
		password: string;
	} | null>;
	findById(id: string): Promise<ONG | null>;
}

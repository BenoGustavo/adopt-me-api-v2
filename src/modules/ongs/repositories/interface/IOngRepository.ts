import { CreateOngDtoType } from "../../dtos/OngDTO";
import { ONG, Address } from "@prisma/client";

export interface IOngRepository {
    create(data: CreateOngDtoType): Promise<{ id: string; name: string; email: string; whatsapp: string; address: Address }>;
    findByEmail(email: string): Promise<{ id: string; name: string; email: string; whatsapp: string; pets: any; password: string } | null>;
    findById(id: string): Promise<ONG | null>;
  }
import { PrismaClient } from "@prisma/client";
import type { Address, ONG } from "@prisma/client";
import { CreateOngDtoType } from "../dtos/OngDTO";
import { log } from "console";

export class OngRepository {
    constructor(private prisma: PrismaClient) {}
  
    async create(data: CreateOngDtoType) {
      // Creates the address
      const ongAddress: Omit<Address, "id"> = {
        street: data.address.street,
        number: data.address.number,
        city: data.address.city,
        state: data.address.state,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const createdAddress = await this.prisma.address.create({
        data: ongAddress,
      });
  
      // Creates the ONG
      const newOng : Omit<ONG,"id"> = {
        name: data.name,
        email: data.email,
        password: data.password,
        whatsapp: data.whatsapp,
        addressId: createdAddress.id,
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      const newOngEntity = await this.prisma.oNG.create({
        data: newOng,
        select: {
          id: true,
          name: true,
          email: true,
          whatsapp: true,
          // Exclude the password field
        },
      });

      return {
        ...newOngEntity,
        address: createdAddress,
      };
    }
  
    async findByEmail(email: string) {
      const ongFound = await this.prisma.oNG.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          whatsapp: true,
          pets: true,
          password: true,
        },
      })
      
      return ongFound;
    }

    async findById(id: string) {
      return this.prisma.oNG.findUnique({
        where: { id },
      });
    }
  }
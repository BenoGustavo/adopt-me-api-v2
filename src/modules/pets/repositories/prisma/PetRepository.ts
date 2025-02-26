import { ONG, Pet, PetSize, PetType, PrismaClient, User } from "@prisma/client";
import { CreatePetDTOType } from "@/modules/pets";
import { OngAddressError } from "@/errors/OngAddressError";
import { IPetRepository } from "../interfaces/IPetRepository";

export class PetRepository implements IPetRepository {
    constructor(private prisma: PrismaClient) {}
  
    async create(owner:ONG ,data: CreatePetDTOType) {
      const ongAddress = await this.prisma.address.findUnique({
        where: { id: owner.addressId }
      });

      if (!ongAddress) {
        throw new OngAddressError();
      }

      const newPet : Omit<Pet, "id"> = {
        city: ongAddress.city,
        ongId: owner.id,
        ...data,
        age: data.age,
        size: data.size,
        breed: data.breed,
        description: data.description ?? "",
        type: data.type,
        created_at: new Date(),
        updated_at: new Date(),
        is_adopted: false,
        userId: null,
      }

      return this.prisma.pet.create({ data : newPet });
    }
  
    async findPetById(id: string) {
      const pet = await this.prisma.pet.findUnique({
        where: { id },
      });
  
      if (pet) {
        const ong = await this.prisma.oNG.findUnique({
          where: { id: pet.ongId }
        });

        if (!ong) {
          return null;
        }

        const ongAddress = await this.prisma.address.findUnique({
          where: { id: ong.addressId}
        });

        return {
          ongResponsavel: {
            ...ong,
            password : undefined,
            address: ongAddress
          },
          ...pet,
          _links: {
            self: { href: `/pets/${pet.id}` },
            findWithFilters: { href: `/pets/${pet.city}/filters` },
          },
        };
      }
  
      return null;
    }

    async findWithFilters(
      city: string,
      size?: PetSize,
      age?: number,
      breed?: string,
      type?: PetType
    ) {
      const filters: any = {};
  
      filters.city = city;
      filters.is_adopted = false;
      if (size) filters.size = size;
      if (age) filters.age = age;
      if (breed) filters.breed = breed;
      if (type) filters.type = type;
  
      const pets = await this.prisma.pet.findMany({
        where: filters,
      });
  
      return pets.map((pet) => ({
        ...pet,
        _links: {
          self: { href: `/pets/${pet.id}` },
          findWithFilters: { href: `/pets/${pet.city}/filters` },
        },
      }));
    }
  
    async toggleAdoptionStatus(petId: string, idOfTheUserWhoAdopted: string) {
      return this.prisma.pet.update({
        where: { id: petId },
        data: {
          is_adopted: true,
          adopted_by: {
            connect: { id: idOfTheUserWhoAdopted }
          },
        },
      });
    }

    async getAdoptedPets(){
      return this.prisma.pet.findMany({
        where: { is_adopted: true }
      });
    }

    async deletePet(petId: string) {
      return this.prisma.pet.delete({
        where: { id: petId }
      });
    }
}

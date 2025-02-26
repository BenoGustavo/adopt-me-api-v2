import { ONG, Pet, PetSize, PetType } from "@prisma/client";
import { CreatePetDTO } from "@/modules/pets/";

type findPetByIdReturnType = Promise<{
    ongResponsavel: {
      id: string;
      name: string;
      email: string;
      whatsapp: string;
      address: any;
    };
    id: string;
    name: string;
    age: number;
    type: PetType;
    size: PetSize;
    breed: string;
    description: string | null;
    city: string;
    ongId: string;
    created_at: Date;
    updated_at: Date;
    is_adopted: boolean;
    userId: string | null;
    _links: {
      self: { href: string };
      findWithFilters: { href: string };
    };
  } | null>;

type findWithFiltersReturnType = Promise<Array<{
    id: string;
    name: string;
    age: number;
    type: PetType;
    size: PetSize;
    breed: string;
    description: string | null;
    city: string;
    ongId: string;
    created_at: Date;
    updated_at: Date;
    is_adopted: boolean;
    userId: string | null;
    _links: {
      self: { href: string };
      findWithFilters: { href: string };
    };
  }>>;

export interface IPetRepository {
    create(owner: ONG, data: CreatePetDTO): Promise<Pet>;
    findPetById(id: string): findPetByIdReturnType
    findWithFilters(
      city: string,
      size?: PetSize,
      age?: number,
      breed?: string,
      type?: PetType
    ): findWithFiltersReturnType;
    
    toggleAdoptionStatus(petId: string, idOfTheUserWhoAdopted: string): Promise<Pet>;
    getAdoptedPets(): Promise<Pet[]>;
    deletePet(petId: string): Promise<Pet>;
  }
import { OngRepository } from "@/modules/ongs";
import { CreatePetDTO } from "../dtos/PetDTO";
import { PetRepository } from "../repositories/PetRepository";
import { UnautorizedError } from "@/errors/UnautorizedError";
import { PetSize, PetType } from "@prisma/client";
import { UserRepository } from "@/modules/users";

export class PetService {
    constructor(
      private petRepository: PetRepository,
      private ongRepository : OngRepository,
      private userRepository : UserRepository,
    ) {}
  
    async create(ongId:string ,data: CreatePetDTO) {
      const ong = await this.ongRepository.findById(ongId);
      if (!ong) {
        throw new UnautorizedError("You don't have autorization to create a pet");
      }

      return this.petRepository.create(ong, data);
    }

    async findById(id: string) {
      return this.petRepository.findPetById(id);
    }

    async findPets(
      city: string,
      size?: PetSize,
      age?: number,
      breed?: string,
      type?: PetType
    ){
      return this.petRepository.findWithFilters(city, size, age, breed, type);
    }

    async adoptPet(petId: string, userId: string, ongId: string){
      const user = await this.userRepository.findById(userId);
      const ong = await this.ongRepository.findById(ongId);

      if(!user){
        throw new UnautorizedError("User not found");
      }

      if(!ong){
        throw new UnautorizedError("Ong not found");
      }

      return this.petRepository.toggleAdoptionStatus(petId, user.id);
    }

    async getAdoptedPets(ongId : string){
      const ong = await this.ongRepository.findById(ongId);
      
      if (!ong) {
        throw new UnautorizedError("You don't have autorization to acess this route!");
      }

      return this.petRepository.getAdoptedPets();
    }

    async deletePet(petId: string, ongId: string){
      const ong = await this.ongRepository.findById(ongId);

      if (!ong) {
        throw new UnautorizedError("You don't have autorization to delete this pet");
      }

      return this.petRepository.deletePet(petId);
    }
}
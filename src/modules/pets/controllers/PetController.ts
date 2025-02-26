import { PetSize, PetType } from "@prisma/client";
import { CreatePetDTO } from "../dtos/PetDTO";
import { PetService } from "../services/PetService";
import { FastifyReply, FastifyRequest } from "fastify";
import { Response } from "@/utils/Response";

export interface PetFilters {
    Params: {
      city: string;
    },
    Querystring : {
      size?: PetSize;
      age?: number;
      breed?: string;
      type?: PetType;
    }
}

export class PetController {
    constructor(private petService: PetService) {}
  
    async create(request: FastifyRequest, reply: FastifyReply) {
      const data = CreatePetDTO.parse(request.body);
      
      const ongId = request.user.id;
      const pet = await this.petService.create(ongId,data);

      const response = new Response(201 ,"Pet created successfully", pet);

      return reply.status(201).send(response);
    }

    async findPets(request: FastifyRequest<PetFilters>, reply: FastifyReply) {
      const { city } = request.params;
      const { size, age, breed, type } = request.query;

      const pets = await this.petService.findPets(city, size, age, breed, type);

      const response = new Response(200, "Pets found successfully", pets);

      return reply.status(200).send(response);
    }

    async findPetById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
      const { id } = request.params;
      const pet = await this.petService.findById(id);
  
      if (pet) {

        const response = new Response(200, "Pet found successfully", pet);
        return reply.status(200).send(response);
      } else {

        const response = new Response(404, "Pet not found", null, {
          error: "Pet not found",
        });
        return reply.status(404).send(response);
      }
    }

    async adoptPet(request: FastifyRequest<{ Params: { id: string }, Body: { requesterId: string} }>, reply: FastifyReply) {
      const petId = request.params.id;
      const whoWillAdoptId = request.body.requesterId;
      const ongId = request.user.id;

      const adoptedPet = await this.petService.adoptPet(petId, whoWillAdoptId, ongId);
      
      const response = new Response(200, "Pet adopted successfully", adoptedPet);

      return reply.status(200).send(response);
    }

    async getAdoptedPets(request: FastifyRequest, reply: FastifyReply) {
      const ongId = request.user.id;
      const adoptedPets = await this.petService.getAdoptedPets(ongId);
      
      const response = new Response(200, "Adopted pets found successfully", adoptedPets);

      return reply.status(200).send(response);
    }

    async deletePet(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
      const { id } = request.params;
      const ongId = request.user.id;
  
      await this.petService.deletePet(id, ongId);

      return reply.status(204).send();
    }
  }
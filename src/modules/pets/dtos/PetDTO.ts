import { PetSize, PetType } from "@prisma/client";
import { z } from "zod";

export const CreatePetDTO = z.object({
    name: z.string().min(3),
    age: z.number().min(0),
    type: z.nativeEnum(PetType), // Use nativeEnum to validate against PetType enum
    size: z.nativeEnum(PetSize), // Use nativeEnum to validate against PetSize enum
    breed: z.string(),
    description: z.string().optional(),
});

export type CreatePetDTOType = z.infer<typeof CreatePetDTO>;
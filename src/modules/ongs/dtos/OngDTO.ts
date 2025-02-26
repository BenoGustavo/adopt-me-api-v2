import { z } from "zod";

export const CreateOngDTO = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    address: z.object({
      street: z.string().min(3).toLowerCase().trim(),
      number: z.number().int(),
      city:   z.string().min(3).toLowerCase().trim(),
      state:  z.string().min(2).max(2),
    }),
    whatsapp: z.string().min(10),
});

export const LoginOngDTO = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type CreateOngDtoType = z.infer<typeof CreateOngDTO>;
export type LoginOngDTO = z.infer<typeof LoginOngDTO>;
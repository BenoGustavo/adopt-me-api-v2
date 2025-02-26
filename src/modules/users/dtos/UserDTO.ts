import { z } from "zod";

export const CreateUserDTO = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  city: z.string(),
});

export const LoginUserDTO = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDTO>;
export type LoginUserDtoType = z.infer<typeof LoginUserDTO>;
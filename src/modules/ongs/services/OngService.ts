import { env } from "@/env";
import { OngRepository } from "../repositories/OngRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateOngDtoType } from "../dtos/OngDTO";
import { PasswordDontMatchError } from "@/errors/PasswordDontMatchError";
import { UserInvalidCredentialsError } from "@/errors/UserInvalidCredentialsError";

export class OngService {
    constructor(private ongRepository: OngRepository) {}
  
    async create(data: CreateOngDtoType) {
      if (data.password !== data.confirmPassword) {
        throw new PasswordDontMatchError();
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      return this.ongRepository.create({ ...data, password: hashedPassword });
    }

    async authenticate(email: string, password: string) {
      const ong = await this.ongRepository.findByEmail(email);
      if (!ong || !(await bcrypt.compare(password, ong.password))) {
        throw new UserInvalidCredentialsError("Invalid credentials");
      }
      const token = jwt.sign({ id: ong.id }, env.JWT_SECRET!, { expiresIn: "1d" });
      return { ...ong, token, password: undefined };
    }
  }
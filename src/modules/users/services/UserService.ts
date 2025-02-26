import { UserInvalidCredentialsError } from "@/errors/UserInvalidCredentialsError";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { CreateUserDtoType } from "../dtos/UserDTO";
import { PasswordDontMatchError } from "@/errors/PasswordDontMatchError";


export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(userData:CreateUserDtoType ) {
    if (userData.password !== userData.confirmPassword) {
      throw new PasswordDontMatchError();
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return (await this.userRepository.create({ ...userData, password: hashedPassword }));
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UserInvalidCredentialsError("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id }, env.JWT_SECRET!, { expiresIn: "1d" });
    return { ...user, token, password: undefined };
  }
}
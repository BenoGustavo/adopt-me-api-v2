import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService";
import { LoginUserDTO, CreateUserDTO } from "../dtos/UserDTO";
import { Response } from "@/utils/Response";

export class UserController {
  constructor(private userService: UserService) {}

  async register(request: FastifyRequest, reply: FastifyReply) {
    const newUserInformation = CreateUserDTO.parse(request.body);

    const user = await this.userService.create(newUserInformation);

    const response = new Response(201, "User created successfully", user);

    return reply.status(201).send(response);
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const loginCredentials = LoginUserDTO.parse(request.body);
    const { email, password } = loginCredentials;

    const authData = await this.userService.authenticate(email, password);

    const response = new Response(200, "User logged in successfully", authData);
    
    return reply.status(200).send(response);
  }
}
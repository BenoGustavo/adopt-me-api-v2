import { Response } from "@/utils/Response";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateOngDTO, LoginOngDTO } from "../dtos/OngDTO";
import { OngService } from "../services/OngService";

export class OngController {
	constructor(private ongService: OngService) {}

	async register(request: FastifyRequest, reply: FastifyReply) {
		const ongRegistrationData = CreateOngDTO.parse(request.body);

		const ong = await this.ongService.create(ongRegistrationData);

		const response = new Response(201, "Ong created successfully", ong);

		return reply.status(201).send(response);
	}

	async login(request: FastifyRequest, reply: FastifyReply) {
		const { email, password } = LoginOngDTO.parse(request.body);

		const authData = await this.ongService.authenticate(email, password);

		const response = new Response(
			200,
			"Ong logged in successfully",
			authData,
		);

		return reply.status(200).send(response);
	}
}

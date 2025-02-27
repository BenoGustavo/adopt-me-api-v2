import { env } from "@/env";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
	interface FastifyRequest {
		user?: string | jwt.JwtPayload;
	}
}

import jwt from "jsonwebtoken";

export function authMiddleware(
	request: FastifyRequest,
	reply: FastifyReply,
	done: Function,
) {
	const authHeader = request.headers.authorization;
	if (!authHeader) {
		return reply.status(401).send({ error: "Token not provided" });
	}

	const [, token] = authHeader.split(" ");

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET!);
		request.user = decoded;
		done();
	} catch (error) {
		return reply.status(401).send({ error: "Invalid token" });
	}
}

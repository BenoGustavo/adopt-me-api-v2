import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "@/env";

declare module "fastify" {
  interface FastifyRequest {
    user?: any;
  }
}

import jwt from "jsonwebtoken";

export function authMiddleware(request: FastifyRequest, reply: FastifyReply, done: Function) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET!);
    request.user = decoded;
    done();
  } catch (err) {
    return reply.status(401).send({ error: "Invalid token" });
  }
}
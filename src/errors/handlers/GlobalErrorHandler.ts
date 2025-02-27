import { env } from "@/env";
import {
	InvalidEnvironmentVariablesError,
	OngAddressError,
	PasswordDontMatchError,
	UnautorizedError,
	UserAlreadyExistsError,
	UserInvalidCredentialsError,
	UserNotFoundError,
} from "@/errors";
import { Response } from "@/utils/Response";
import { FastifyReply, FastifyRequest } from "fastify";

function globalErrorHandler(
	error: Error,
	_: FastifyRequest,
	reply: FastifyReply,
) {
	if (error instanceof InvalidEnvironmentVariablesError) {
		const response = new Response(
			500,
			"Invalid environment variables",
			null,
			error.message,
		);
		reply.status(500).send(response);
	} else if (error instanceof OngAddressError) {
		const response = new Response(
			400,
			"Invalid ONG address",
			null,
			error.message,
		);
		reply.status(400).send(response);
	} else if (error instanceof PasswordDontMatchError) {
		const response = new Response(
			400,
			"Passwords do not match",
			null,
			error.message,
		);
		reply.status(400).send(response);
	} else if (error instanceof UnautorizedError) {
		const response = new Response(
			401,
			"Unauthorized access",
			null,
			error.message,
		);
		reply.status(401).send(response);
	} else if (error instanceof UserInvalidCredentialsError) {
		const response = new Response(
			401,
			"Invalid user credentials",
			null,
			error.message,
		);
		reply.status(401).send(response);
	} else if (error instanceof UserNotFoundError) {
		const response = new Response(
			404,
			"User not found",
			null,
			error.message,
		);
		reply.status(404).send(response);
	} else if (error instanceof UserAlreadyExistsError) {
		const response = new Response(
			409,
			"User email was already taken",
			null,
			error.message,
		);
		reply.status(409).send(response);
	} else {
		const errorResponse = {
			message: "Internal Server Error",
			error: env.NODE_ENV === "dev" ? error : error.message,
		};

		const response = new Response(
			500,
			"Internal Server Error",
			null,
			errorResponse,
		);
		reply.status(500).send(response);
	}
}

export { globalErrorHandler };

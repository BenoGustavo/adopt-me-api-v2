import { env } from "@/env";
import { Response } from "@/utils/Response";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";

function zodErrorHandler(error: Error, _: FastifyRequest, reply: FastifyReply) {
	if (env.NODE_ENV !== "prod") {
		console.error(error);
	} else {
		// TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
	}

	if (error instanceof ZodError) {
		const validationError = fromError(error);

		const response = new Response(
			400,
			"Field validation error!",
			null,
			validationError,
		);
		reply.status(400).send(response);
	}
}

export { zodErrorHandler };

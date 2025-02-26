import { env } from "@/env"
import { FastifyReply } from "fastify"
import { ZodError } from "zod"
import { fromError } from "zod-validation-error"
import { Response } from "@/utils/Response"


function zodErrorHandler(error: Error, _: any, reply: FastifyReply) {
    if (env.NODE_ENV !== 'prod') {
        console.error(error);
    } else {
        // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    if (error instanceof ZodError) {
        const validationError = fromError(error);

        const response = new Response(400, "Field validation error!", null, validationError);
        reply.status(400).send(response);
    }
}

export { zodErrorHandler };
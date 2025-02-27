import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import path from "path";
import YAML from "yamljs";

export function registerSwagger(app: FastifyInstance) {
	const swaggerDocument = YAML.load(
		path.join(__dirname, "../../swagger.yml"),
	);

	app.register(fastifySwagger, {
		openapi: swaggerDocument,
	});

	app.register(fastifySwaggerUi, {
		routePrefix: "/docs",
	});

	app.get("/swagger.json", async (request, reply) => {
		reply.send(swaggerDocument);
	});
}

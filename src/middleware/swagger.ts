import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider
  } from "fastify-type-provider-zod";
  import z from "zod";


export function registerSwagger(app: FastifyInstance){
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.register(fastifySwagger, {
        openapi: {
          info: {
            title: 'API de Exemplo',
            description: 'Documentação da API de exemplo utilizando Fastify',
            version: '1.0.0',
          },
        },
        // Importante adicionar para fazer o parse do schema
        transform: jsonSchemaTransform
    })

    app.register(fastifySwaggerUi, {
        routePrefix: '/docs'
    })

    // Definição de um endpoint de exemplo
    app.after(() => {
        app.withTypeProvider<ZodTypeProvider>().get('/hello', {
        schema: {
            response: {
            200: z.object({
                message: z.string(),
            }),
            },
        },
        }, async (request, reply) => {
            return reply.send({ message: 'Hello world!' })
        });
    })
}
import { FastifyInstance } from 'fastify';
import { HelloWorldController } from '../controllers/hello-world.controller';

export async function helloWorldRoutes(server: FastifyInstance): Promise<void> {
  const helloWorldController = new HelloWorldController();

  server.get('/hello', (request, reply) => helloWorldController.sayHello(request, reply));
}
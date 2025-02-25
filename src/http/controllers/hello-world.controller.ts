import { FastifyReply, FastifyRequest } from 'fastify';
import { makeHelloWorldService } from '@/services/factories/make-hello-world-service';
import { HelloWorldService } from '@/services/hello-world.service';

export class HelloWorldController {
  private service: HelloWorldService;

  constructor() {
    this.service = makeHelloWorldService();
  }

  public async sayHello(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const message = await this.service.sayHello();
    reply.send({ message });
  }
}
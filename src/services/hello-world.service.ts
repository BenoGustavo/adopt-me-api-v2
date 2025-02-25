import {HelloWorldRepository} from '@/repositories/interfaces/hello-world.repository';

export class HelloWorldService {
    private repository: HelloWorldRepository;

    constructor(repository: HelloWorldRepository) {
        this.repository = repository;
    }

    public async sayHello(): Promise<string> {
      return this.repository.findHelloWorld(); 
  }
}
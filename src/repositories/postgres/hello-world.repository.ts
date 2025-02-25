import {HelloWorldRepository as IHelloWorldRepository} from '../interfaces/hello-world.repository';

export class HelloWorldRepository implements IHelloWorldRepository {
    async findHelloWorld(): Promise<string> {
        throw new Error('Method not implemented.');
    }
}
import { HelloWorldService } from '@/services/hello-world.service';
import { SqliteHelloWorldRepository } from '@/repositories/in-memory/sqlite-hello-world.repository';

describe('HelloWorldService', () => {
    let service: HelloWorldService;
    let repository: SqliteHelloWorldRepository;

    beforeEach(() => {
        repository = new SqliteHelloWorldRepository();
        jest.spyOn(repository, 'findHelloWorld').mockResolvedValue('hello world!');
        service = new HelloWorldService(repository);
    });

    it('should return hello world message', async () => {
        const expectedMessage = 'hello world!';

        const result = await service.sayHello();

        expect(result).toBe(expectedMessage);
        expect(repository.findHelloWorld).toHaveBeenCalledTimes(1);
    });
});
export interface HelloWorldRepository {
    findHelloWorld(): Promise<string>;
}
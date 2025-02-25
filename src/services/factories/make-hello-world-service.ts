import { HelloWorldService } from "../hello-world.service";
import { SqliteHelloWorldRepository } from "@/repositories/in-memory/sqlite-hello-world.repository";

export function makeHelloWorldService(): HelloWorldService {
    const database = new SqliteHelloWorldRepository();
    const service = new HelloWorldService(database);

    return service;
}
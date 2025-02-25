import { HelloWorldRepository } from "../interfaces/hello-world.repository";
import { initDb } from "./database/init-sqlite";

export class SqliteHelloWorldRepository implements HelloWorldRepository {
    private db: any;
    public async findHelloWorld(): Promise<string> {
        this.db = await initDb();
        const result = await this.db.get('SELECT * FROM hello_world');
        return result.text;
    }
}
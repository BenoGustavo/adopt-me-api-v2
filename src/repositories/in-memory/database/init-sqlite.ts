import { openDb } from "./sqlite";

export async function initDb() {
  const db = await openDb();

  //DDL should go here
  await db.exec(`
    CREATE TABLE IF NOT EXISTS hello_world (
      text TEXT NOT NULL UNIQUE
    );

    INSERT INTO hello_world (text) VALUES ('hello world!')
    ON CONFLICT(text) DO NOTHING;
  `);

  return db;
}
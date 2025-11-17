// src/lib/mongo.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) {
  throw new Error("MONGODB_URI is not set in .env.local");
}
if (!dbName) {
  throw new Error("MONGODB_DB_NAME is not set in .env.local");
}

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Returns a singleton MongoDB database connection.
 */
export async function getDb(): Promise<Db> {
  if (db && client) return db;

  client = await MongoClient.connect(uri);
  db = client.db(dbName);
  return db;
}

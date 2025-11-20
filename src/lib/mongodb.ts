// src/lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

if (!dbName) {
  throw new Error("MONGODB_DB_NAME is not defined in environment variables");
}

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Get a cached MongoDB Db instance.
 * Reuses the same connection across calls (good for serverless/dev).
 */
export async function getDb(): Promise<Db> {
  if (db && client) {
    return db;
  }

  client = await MongoClient.connect(uri);
  db = client.db(dbName);
  return db;
}

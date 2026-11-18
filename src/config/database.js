import Database from "better-sqlite3";
import { readFileSync } from "node:fs";

const dbPath = process.env.DATABASE_PATH || "discover.db";
const db = new Database(dbPath);

// Enable foreign key constraints
db.pragma("foreign_keys = ON");

// Enable WAL mode for better read/write concurrency
db.pragma("journal_mode = WAL");

// Load and execute database schema
const schema = readFileSync(
  new URL("../db/schema.sql", import.meta.url),
  "utf-8",
);

db.exec(schema);

console.log("SQLite database connected successfully");

// Export database instance
export default db;

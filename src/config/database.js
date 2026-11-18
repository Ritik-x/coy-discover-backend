import Database from "better-sqlite3";
import { readFileSync } from "node:fs";

// Create database file in backend root
const db = new Database("discover.db");

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

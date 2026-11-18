import app from "./app.js";
import "./config/database.js";
import { seedIfEmpty } from "./db/seed.js";

seedIfEmpty();

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

server.on("error", (error) => {
  console.error("HTTP server error:", error);
});

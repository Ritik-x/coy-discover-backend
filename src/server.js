import app from "./app.js";
import "./config/database.js";

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("HTTP server error:", error);
});

import express from "express";
import cors from "cors";
import "dotenv/config";

import discoverRoutes from "./routes/discover.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Discover API is running",
  });
});

// Register API routes (both /api/... and /... for maximum flexibility)
app.use("/api", discoverRoutes);
app.use("/", discoverRoutes);

// Global error handler (must be after routes)
app.use(errorHandler);

export default app;

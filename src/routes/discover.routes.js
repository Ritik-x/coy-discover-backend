import express from "express";

import { fetchFeed } from "../controllers/feed.controller.js";
import {
  swipeProfile,
  resetSwipesController,
} from "../controllers/swipe.controller.js";
import { fetchMatches } from "../controllers/match.controller.js";

const router = express.Router();

router.get("/feed", fetchFeed);
router.post("/swipe", swipeProfile);
router.get("/matches", fetchMatches);
router.post("/reset", resetSwipesController);

export default router;

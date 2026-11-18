import { z } from "zod";
import { createSwipe, resetSwipes } from "../services/swipe.service.js";

const swipeSchema = z.object({
  profileId: z.number().int().positive(),
  action: z.enum(["like", "pass"]),
});

export const swipeProfile = (req, res, next) => {
  try {
    const validation = swipeSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid swipe request",
        errors: validation.error.issues,
      });
    }

    const { profileId, action } = validation.data;

    const result = createSwipe(profileId, action);

    return res.status(200).json({
      success: true,
      message: result.matched ? "It's a match!" : "Swipe recorded successfully",
      matched: result.matched,
      match: result.match,
    });
  } catch (error) {
    next(error);
  }
};

export const resetSwipesController = (req, res, next) => {
  try {
    const result = resetSwipes();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

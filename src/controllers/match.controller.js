import { getMatches } from "../services/match.service.js";

export const fetchMatches = (req, res, next) => {
  try {
    const matches = getMatches();

    return res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    next(error);
  }
};
